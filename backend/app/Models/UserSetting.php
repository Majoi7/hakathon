<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    protected $fillable = [
        'user_id',
        'email_notifications',
        'sms_notifications',
        'whatsapp_notifications',
        'notification_types',
        'low_balance_alert',
        'language',
        'two_factor_auth'
    ];

    protected $casts = [
        'email_notifications' => 'boolean',
        'sms_notifications' => 'boolean',
        'whatsapp_notifications' => 'boolean',
        'notification_types' => 'array',
        'low_balance_alert' => 'boolean',
        'two_factor_auth' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
