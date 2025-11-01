<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();

        $existingUser = User::where('email', $user->getEmail())->first();

        if (!$existingUser) {
            $existingUser = User::create([
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'password' => bcrypt(Str::random(16)), // mot de passe aléatoire
                'email_verified_at' => now(),
                'role' => 'apprenant', // ou selon ton choix
            ]);
        }

        $token = $existingUser->createToken('auth_token')->plainTextToken;

        // Encode le user pour le passer en query string
        $userQuery = urlencode(json_encode($existingUser));

        return redirect("http://localhost:5173/google/callback?token={$token}&user={$userQuery}");
    }
}
