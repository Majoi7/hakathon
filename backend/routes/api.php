<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\EmailCheckController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    // Profil
    Route::get('/profile', [ProfileController::class, 'getProfile']);
    Route::put('/profile/personal', [ProfileController::class, 'updatePersonalInfo']);
    Route::post('/profile/photo', [ProfileController::class, 'updateProfilePhoto']);
    Route::put('/profile/password', [ProfileController::class, 'changePassword']);

    // Paramètres
    Route::put('/settings', [ProfileController::class, 'updateSettings']);
    Route::put('/settings/payment-preferences', [ProfileController::class, 'updatePaymentPreferences']);

    // Professeurs uniquement
    Route::middleware('check.role:prof')->group(function () {
        Route::put('/profile/teacher', [ProfileController::class, 'updateTeacherProfile']);
        Route::post('/profile/upload-diploma', [ProfileController::class, 'uploadDiploma']);
        Route::post('/profile/toggle-pause', [ProfileController::class, 'toggleProfilePause']);
    });

    // Désactivation compte
    Route::post('/account/deactivate', [ProfileController::class, 'deactivateAccount']);
});




Route::post('/verify-code', [AuthController::class, 'verifyCode']);

Route::post('/check-email', [EmailCheckController::class, 'check']);
Route::get('/verify-email', [AuthController::class, 'verifyEmail']);
// routes/api.php
Route::post('/resend-verification-email', [AuthController::class, 'resendVerificationEmail']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-email-code', [AuthController::class, 'verifyEmailCode']);
Route::post('/resend-code', [AuthController::class, 'resendVerificationCode']);

use App\Http\Controllers\Auth\PasswordResetLinkController;

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [\App\Http\Controllers\Auth\NewPasswordController::class, 'store']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
// routes/api.php - Ajoutez cette route
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'timestamp' => now(),
        'environment' => app()->environment()
    ]);
});
