<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect(['Apple', 'Samsung', 'Huawei', 'Xiaomi'])
            ->each(fn ($brand) => Brand::firstOrCreate(['name' => $brand]));
    }
}
