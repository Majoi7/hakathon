<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ✅ CORRECTION : Utilisez Route:: directement au lieu de $this->routes()
        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));

        Route::prefix('api/admin')
            ->middleware('api')
            ->group(base_path('routes/admin.php'));

        // Configuration pour les reset passwords
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}
