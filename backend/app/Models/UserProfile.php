<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id',
        'phone',
        'gender',
        'birth_date',
        'city',
        'school',
        'study_level',
        'field_of_study',
        'bio',
        'profile_photo'
    ];

    // ✅ AJOUTEZ CETTE LIGNE POUR INCLURE L'URL DANS LA RÉPONSE JSON
    protected $appends = ['profile_photo_url'];

    // ✅ AJOUTEZ CETTE MÉTHODE POUR GÉNÉRER L'URL
    public function getProfilePhotoUrlAttribute()
    {
        if (!$this->profile_photo) {
            return null;
        }

        return Storage::url($this->profile_photo);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
