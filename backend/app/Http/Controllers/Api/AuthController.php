<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Mail\VerifyEmail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\VerifyEmailCode;
use Illuminate\Support\Carbon;
use App\Services\EmailVerifier;
use App\Models\EmailVerification;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\EmailVerificationCode;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use App\Notifications\VerifyEmail as NotificationsVerifyEmail;
use PHPUnit\TextUI\XmlConfiguration\Validator as XmlConfigurationValidator;

class AuthController extends Controller
{
    protected $emailVerifier;

    public function __construct(EmailVerifier $emailVerifier)
    {
        $this->emailVerifier = $emailVerifier;
    }

    // 🚀 Inscription
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:prof,apprenant',
        ]);

        // Vérifier Gmail
        if (!str_ends_with(strtolower($request->email), '@gmail.com')) {
            return response()->json(['message' => "Seules les adresses Gmail sont acceptées."], 422);
        }

        // Créer l’utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Générer code à 6 chiffres
        $code = rand(100000, 999999);

        EmailVerificationCode::create([
            'user_id' => $user->id,
            'code' => $code,
            'expires_at' => now()->addMinutes(10),
        ]);

        // Envoyer mail
        Mail::to($user->email)->send(new VerifyEmailCode($user, $code));

        return response()->json([
            'message' => 'Un code de confirmation a été envoyé à votre email.',
            'user_id' => $user->id
        ], 201);
    }


    // 🔑 Connexion
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Mot de passe incorrect'], 401);
        }

        if (!$user->email_verified_at) {
            return response()->json([
                'message' => 'Vous devez confirmer votre email avant de vous connecter.'
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => $user,
        ], 200);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // envoie le lien de reset (gère token + notification)
        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Lien de réinitialisation envoyé. Vérifiez votre boîte mail.']);
        }

        return response()->json(['message' => __($status)], 422);
    }

    // 2) réinitialisation du mot de passe
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed', // password_confirmation
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Mot de passe réinitialisé avec succès.']);
        }

        return response()->json(['message' => __($status)], 422);
    }

    // 🚪 Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    // 🧍 Profil
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // ✅ Vérification email via token
    public function verifyEmail(Request $request)
    {
        $token = $request->token;

        $verification = EmailVerificationCode::where('token', $token)->first();

        if (!$verification) {
            return response()->json(['message' => 'Token invalide ou expiré.'], 404);
        }

        $user = $verification->user;
        $user->email_verified_at = now();
        $user->save();

        // Supprimer le token après confirmation
        $verification->delete();

        return response()->json([
            'message' => 'Email confirmé avec succès ! Vous pouvez maintenant vous connecter.',
            'redirect' => '/email-verified'
        ]);
    }

    // 🔁 Renvoyer email de vérification

    public function resendVerificationEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé.'], 404);
        }

        if ($user->email_verified_at) {
            return response()->json(['message' => 'Email déjà vérifié.'], 400);
        }

        // Générer un code aléatoire à 6 chiffres
        $code = rand(100000, 999999);

        // Supprimer ancien code si existant
        EmailVerificationCode::where('user_id', $user->id)->delete();

        EmailVerificationCode::create([
            'user_id' => $user->id,
            'code' => $code,
            'expires_at' => now()->addMinutes(10), // optionnel : expiration 15 min
        ]);

        // Envoyer le mail
        Mail::to($user->email)->send(new VerifyEmailCode($user, $code));

        return response()->json(['message' => 'Code de vérification renvoyé avec succès.']);
    }
    public function verifyEmailCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable.'], 404);
        }

        $record = EmailVerificationCode::where('user_id', $user->id)
            ->where('code', $request->code)
            ->where('expires_at', '>', now())
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Code invalide ou expiré.'], 400);
        }

        // Marquer l’email comme vérifié
        $user->email_verified_at = now();
        $user->save();

        // Supprimer le token après vérification
        $record->delete();

        return response()->json(['message' => 'Email vérifié avec succès.']);
    }
}
