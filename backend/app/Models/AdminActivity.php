<?php

namespace App\Models;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // IMPORT AJOUTÉ

class AdminActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'action',
        'description',
        'ip_address',
        'user_agent',
        'metadata'
    ];

    protected $casts = [
        'metadata' => 'array'
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class); // UTILISATION DIRECTE
    }
}
