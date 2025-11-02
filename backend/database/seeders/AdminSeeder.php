<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        Admin::create([
            'name' => 'Super Admin',
            'email' => 'jehovaly7@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'super_admin',
            'phone' => '+22968576110',
            'whatsapp' => '+22968576110',
            'is_active' => true
        ]);
    }
}
