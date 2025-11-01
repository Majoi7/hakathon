<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;

class TeacherProfile extends Model
{
    protected $fillable = [
        'user_id',
        'diplomas',
        'specialties',
        'levels_taught',
        'professional_bio',
        'hourly_rate',
        'availability',
        'withdrawal_method',
        'withdrawal_account',
        'profile_paused'
    ];

    protected $casts = [
        'diplomas' => 'array',
        'specialties' => 'array',
        'levels_taught' => 'array',
        'availability' => 'array',
        'hourly_rate' => 'decimal:2',
        'profile_paused' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
