<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TeacherProfile extends Model
{
    use HasFactory;

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
        'profile_photo',
        'specialties',
        'levels_taught',
        'professional_bio',
        'hourly_rate',
        'availability',
        'withdrawal_method',
        'withdrawal_account',
        'diplomas',
        'verification_status',
        'verified_at',
        'rejection_reason',
        'profile_paused'
    ];

    protected $casts = [
        'specialties' => 'array',
        'levels_taught' => 'array',
        'availability' => 'array',
        'diplomas' => 'array',
        'birth_date' => 'date',
        'verified_at' => 'datetime',
        'hourly_rate' => 'decimal:2',
        'profile_paused' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes utiles
    public function scopePending($query)
    {
        return $query->where('verification_status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('verification_status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('verification_status', 'rejected');
    }

    public function getProfilePhotoUrlAttribute()
    {
        if (!$this->profile_photo) {
            return null;
        }

        return \Illuminate\Support\Facades\Storage::url($this->profile_photo);
    }

    public function isVerified()
    {
        return $this->verification_status === 'approved';
    }
}
