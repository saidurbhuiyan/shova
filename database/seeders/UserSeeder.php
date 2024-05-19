<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'phone_number' => '1234567890',
            'password' => Hash::make('1234'),
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'date_of_birth' => now()->subYears(20)->format('Y-m-d'),
        ])->assignRole('admin');
    }
}
