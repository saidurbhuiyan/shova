<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect(config('options.user_roles'))
        ->each(fn ($role) => 
        !Role::where('name', 'user')->exists() 
        ? Role::create(['name' => $role]) : null
    );
    }
}
