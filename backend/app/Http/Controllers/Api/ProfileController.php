<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserSetting;
use Illuminate\Http\Request;
use App\Models\TeacherProfile;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash; // ← AJOUT IMPORT
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    private $cities = [
        'Cotonou',
        'Abomey-Calavi',
        'Porto-Novo',
        'Parakou',
        'Godomey',
        'Kandi',
        'Lokossa',
        'Ouidah',
        'Abomey',
        'Natitingou',
        'Djougou',
        'Bohicon',
        'Sèmè-Podji',
        'Save',
        'Malanville',
        'Pobé',
        'Kétou',
        'Cové',
        'Aplahoué',
        'Bembèrèkè'
    ];

    private $withdrawalMethods = ['momo', 'moov', 'celtis', 'visa', 'bank'];

    // 🎯 Récupérer le profil complet
    public function getProfile(Request $request)
    {
        try {
            $user = $request->user();

            // Chargez les relations avec gestion des null
            $user->load(['profile', 'teacherProfile', 'settings']);

            return response()->json([
                'user' => $user,
                'profile' => $user->profile ?? null,
                'teacher_profile' => $user->teacherProfile ?? null,
                'settings' => $user->settings ?? null,
                'cities' => $this->cities,
                'withdrawal_methods' => $this->withdrawalMethods
            ]);
        } catch (\Exception $e) {
            Log::error('Profile API Error: ' . $e->getMessage()); // ← CORRECTION : Log au lieu de log
            return response()->json([
                'message' => 'Erreur serveur',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    // 👤 Mettre à jour le profil personnel
    public function updatePersonalInfo(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20|regex:/^[0-9+\s]+$/',
            'gender' => 'nullable|in:male,female,other',
            'birth_date' => 'nullable|date|before:today',
            'city' => ['nullable', 'string', Rule::in($this->cities)],
            'school' => 'nullable|string|max:255',
            'study_level' => 'nullable|string|max:100',
            'field_of_study' => 'nullable|string|max:100',
            'bio' => 'nullable|string|max:500',
        ]);

        $user->update(['name' => $validated['name']]);

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => $user->fresh(['profile'])
        ]);
    }

    // 📸 Mettre à jour la photo de profil
    // 📸 Mettre à jour la photo de profil - VERSION CORRIGÉE
    public function updateProfilePhoto(Request $request)
    {
        try {
            Log::info('🔄 Début upload photo de profil');

            // Validation plus permissive
            $request->validate([
                'profile_photo' => 'required|file|image|mimes:jpeg,png,jpg,gif,webp|max:10240' // 10MB max
            ]);

            $user = $request->user();

            if (!$user) {
                return response()->json(['message' => 'Utilisateur non authentifié'], 401);
            }

            Log::info('👤 Utilisateur trouvé pour upload photo:', ['user_id' => $user->id]);

            // Vérifier si un fichier est bien présent
            if (!$request->hasFile('profile_photo')) {
                Log::error('❌ Aucun fichier dans la requête');
                return response()->json(['message' => 'Aucun fichier fourni'], 422);
            }

            $file = $request->file('profile_photo');

            Log::info('📁 Fichier reçu:', [
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime' => $file->getMimeType()
            ]);

            // Obtenir ou créer le profil
            $profile = $user->profile ?? UserProfile::create(['user_id' => $user->id]);

            // Supprimer l'ancienne photo si elle existe
            if ($profile->profile_photo && Storage::disk('public')->exists($profile->profile_photo)) {
                Storage::disk('public')->delete($profile->profile_photo);
                Log::info('🗑️ Ancienne photo supprimée:', ['path' => $profile->profile_photo]);
            }

            // Stocker la nouvelle photo avec un nom unique
            $path = $file->store('profile-photos', 'public');

            Log::info('✅ Photo stockée:', ['path' => $path]);

            // Mettre à jour le profil
            $profile->update(['profile_photo' => $path]);

            // Générer l'URL publique
            $photoUrl = Storage::url($path);

            Log::info('🎉 Photo mise à jour avec succès', ['url' => $photoUrl]);

            return response()->json([
                'message' => 'Photo de profil mise à jour avec succès',
                'profile_photo_url' => url(Storage::url($path)), // ← URL COMPLÈTE
                'profile_photo_path' => $path
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('❌ Erreur de validation upload photo:', $e->errors());
            return response()->json([
                'message' => 'Erreur de validation du fichier',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('❌ Erreur upload photo: ' . $e->getMessage());
            Log::error('📝 Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'message' => 'Erreur lors du téléchargement de la photo',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    // 📁 Uploader un diplôme
    public function uploadDiploma(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'prof') {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        $request->validate([
            'diploma_file' => 'required|file|max:10240|mimes:pdf,jpg,jpeg,png', // 10MB
            'diploma_name' => 'required|string|max:255'
        ]);

        $path = $request->file('diploma_file')->store('diplomas', 'public');

        // Récupérer les diplômes existants
        $teacherProfile = $user->teacherProfile;
        $diplomas = $teacherProfile ? ($teacherProfile->diplomas ?? []) : [];

        // Ajouter le nouveau diplôme
        $diplomas[] = [
            'name' => $request->diploma_name,
            'file' => $path,
            'uploaded_at' => now()->toISOString(),
            'verified' => false
        ];

        $user->teacherProfile()->updateOrCreate(
            ['user_id' => $user->id],
            ['diplomas' => $diplomas]
        );

        return response()->json([
            'message' => 'Diplôme uploadé avec succès',
            'diploma' => [
                'name' => $request->diploma_name,
                'file_url' => Storage::url($path)
            ]
        ]);
    }

    // 👨‍🏫 Mettre à jour le profil professeur
    public function updateTeacherProfile(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'prof') {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        $validated = $request->validate([
            'specialties' => 'required|array|min:1',
            'specialties.*' => 'string|max:100',
            'levels_taught' => 'required|array|min:1',
            'levels_taught.*' => 'string|in:Collège,Lycée,Universitaire,Adulte',
            'professional_bio' => 'required|string|min:50|max:1000',
            'hourly_rate' => 'required|numeric|min:1000|max:50000', // 1000 à 50,000 FCFA
            'availability' => 'nullable|array',
            'withdrawal_method' => ['required', Rule::in($this->withdrawalMethods)],
            'withdrawal_account' => 'required|string|max:255',
        ]);

        // Validation spécifique pour le compte de retrait
        if ($validated['withdrawal_method'] === 'momo') {
            $request->validate([
                'withdrawal_account' => 'regex:/^229[0-9]{8}$/'
            ], [
                'withdrawal_account.regex' => 'Le numéro MTN Mobile Money doit être un numéro béninois valide (229XXXXXXXX)'
            ]);
        } elseif ($validated['withdrawal_method'] === 'moov') {
            $request->validate([
                'withdrawal_account' => 'regex:/^229[0-9]{8}$/'
            ], [
                'withdrawal_account.regex' => 'Le numéro Moov Money doit être un numéro béninois valide (229XXXXXXXX)'
            ]);
        }

        $user->teacherProfile()->updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return response()->json([
            'message' => 'Profil professeur mis à jour',
            'teacher_profile' => $user->fresh(['teacherProfile'])->teacherProfile
        ]);
    }

    // ⚙️ Mettre à jour les paramètres de notification
    public function updateSettings(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'email_notifications' => 'boolean',
            'sms_notifications' => 'boolean',
            'whatsapp_notifications' => 'boolean',
            'notification_types' => 'nullable|array',
            'notification_types.new_courses' => 'boolean',
            'notification_types.new_messages' => 'boolean',
            'notification_types.booking_reminders' => 'boolean',
            'notification_types.payment_confirmation' => 'boolean',
            'notification_types.teacher_requests' => 'boolean', // Pour profs
            'notification_types.course_cancellations' => 'boolean', // Pour profs
            'low_balance_alert' => 'boolean',
            'low_balance_threshold' => 'numeric|min:0|max:100000', // Seuil en FCFA
            'language' => 'in:fr,en',
            'two_factor_auth' => 'boolean',
        ]);

        $user->settings()->updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return response()->json([
            'message' => 'Paramètres mis à jour',
            'settings' => $user->fresh(['settings'])->settings
        ]);
    }

    // 💰 Mettre à jour les préférences de paiement
    public function updatePaymentPreferences(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'preferred_payment_method' => 'required|in:momo,moov,celtis,visa',
            'auto_low_balance_alert' => 'boolean',
            'low_balance_threshold' => 'numeric|min:1000|max:50000' // 1000 à 50,000 FCFA
        ]);

        // Stocker dans les settings
        $user->settings()->updateOrCreate(
            ['user_id' => $user->id],
            ['payment_preferences' => $validated]
        );

        return response()->json([
            'message' => 'Préférences de paiement mises à jour',
            'payment_preferences' => $validated
        ]);
    }

    // 🔒 Changer le mot de passe
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Mot de passe actuel incorrect'], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json(['message' => 'Mot de passe changé avec succès']);
    }

    // ⏸️ Mettre en pause le profil (professeurs)
    public function toggleProfilePause(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'prof') {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        $teacherProfile = $user->teacherProfile;
        if (!$teacherProfile) {
            return response()->json(['message' => 'Profil professeur non trouvé'], 404);
        }

        $paused = !$teacherProfile->profile_paused;
        $teacherProfile->update(['profile_paused' => $paused]);

        return response()->json([
            'message' => $paused ? 'Profil mis en pause' : 'Profil activé',
            'profile_paused' => $paused
        ]);
    }

    // 🗑️ Désactiver le compte
    public function deactivateAccount(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
            'reason' => 'nullable|string|max:500'
        ]);

        $user = $request->user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Mot de passe incorrect'], 422);
        }

        // Marquer comme désactivé
        $user->update(['active' => false]);

        // TODO: Envoyer un email à l'admin avec la raison
        // TODO: Logger l'action

        return response()->json(['message' => 'Compte désactivé avec succès']);
    }
}
