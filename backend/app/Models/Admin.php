<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory; // AJOUTEZ CETTE LIGNE

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guard = 'admin';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'permissions',
        'phone',
        'whatsapp',
        'is_active'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'permissions' => 'array',
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean'
    ];

    // Relations
    public function notifications()
    {
        return $this->morphMany(\Illuminate\Notifications\DatabaseNotification::class, 'notifiable');
    }

    public function activities()
    {
        return $this->hasMany(\App\Models\AdminActivity::class); // IMPORT CORRIGÉ
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeSuperAdmins($query)
    {
        return $query->where('role', 'super_admin');
    }

    // Méthodes utilitaires
    public function isSuperAdmin()
    {
        return $this->role === 'super_admin';
    }

    public function hasPermission($permission)
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        return in_array($permission, $this->permissions ?? []);
    }

    public function canManageUsers()
    {
        return $this->hasPermission('manage_users');
    }

    public function canManageTeachers()
    {
        return $this->hasPermission('manage_teachers');
    }

    public function canManageAdmins()
    {
        return $this->isSuperAdmin() || $this->hasPermission('manage_admins');
    }
}
