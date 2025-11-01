<?php

namespace App\Models;


use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmailVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'token',
    ];

    // Relation vers l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
