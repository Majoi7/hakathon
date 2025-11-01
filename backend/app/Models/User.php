<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\UserProfile;
use App\Models\UserSetting;
use App\Models\TeacherProfile; // <- ajoute ceci
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Foundation\Auth\User as Authenticatable;

// AJOUTEZ CES IMPORTS
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasApiTokens, Notifiable;


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
    // Relation avec le profil utilisateur
    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    // Relation avec le profil professeur (si l'utilisateur est prof)
    public function teacherProfile()
    {
        return $this->hasOne(TeacherProfile::class);
    }

    // Relation avec les paramètres utilisateur
    public function settings()
    {
        return $this->hasOne(UserSetting::class);
    }

    /**
     * Méthodes utilitaires
     */
    public function isTeacher()
    {
        return $this->role === 'prof';
    }

    public function isStudent()
    {
        return $this->role === 'apprenant';
    }
}
