<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\TeacherVerificationController;

Route::prefix('admin')->group(function () {
    // Authentification admin
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Routes protégées - MIDDLEWARE SIMPLIFIÉ
    Route::middleware(['auth:sanctum'])->group(function () {
        // Dashboard et stats
        Route::get('dashboard', [AdminController::class, 'dashboard']);
        Route::get('stats', [AdminController::class, 'getStats']);

        // Gestion utilisateurs
        Route::prefix('users')->group(function () {
            Route::get('/', [UserManagementController::class, 'index']);
            Route::delete('/{user}', [UserManagementController::class, 'destroy']);
            Route::post('/{user}/ban', [UserManagementController::class, 'ban']);
            Route::post('/{user}/unban', [UserManagementController::class, 'unban']);
        });

        // Validation professeurs
        Route::prefix('teachers')->group(function () {
            Route::get('pending', [TeacherVerificationController::class, 'pending']);
            Route::post('{teacher}/verify', [TeacherVerificationController::class, 'verify']);
            Route::get('verified', [TeacherVerificationController::class, 'verified']);
        });

        // Gestion administrateurs
        Route::prefix('admins')->group(function () {
            Route::get('/', [AdminController::class, 'getAdmins']);
            Route::post('/', [AdminController::class, 'createAdmin']);
            Route::put('{admin}/status', [AdminController::class, 'toggleAdminStatus']);
            Route::delete('{admin}', [AdminController::class, 'deleteAdmin']);
        });

        // Activités
        Route::get('activities', [AdminController::class, 'getActivities']);
    });
});
