<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;

class EmailVerificationCode extends Model
{
    protected $fillable = ['user_id', 'code', 'expires_at'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
