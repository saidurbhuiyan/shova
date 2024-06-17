<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            "Electronics" => [
                "Computers & Laptops",
                "Smartphones & Accessories",
                "Audio & Video",
            ],
            "Clothing & Accessories" => [
                "Men's Clothing",
                "Women's Clothing",
                "Accessories"
            ],
            "Home & Kitchen" => [
                "Furniture",
                "Kitchen Appliances",
                "Home Decor"
            ],
            "Books & Stationery" => [
                "Fiction",
                "Non-fiction",
                "Stationery"
            ],
            "Beauty & Personal Care" => [
                "Skincare",
                "Makeup",
                "Haircare"
            ],
            "Toys & Games" => [
                "Educational Toys",
                "Board Games",
                "Outdoor Toys"
            ],
            "Sports & Fitness" => [
                "Fitness Equipment",
                "Sportswear",
                "Outdoor Activities"
            ],
            "Health & Wellness" => [
                "Vitamins & Supplements",
                "Health Monitors",
                "Medical Supplies"
            ],
            "Automotive" => [
                "Car Accessories",
                "Motorcycle Parts",
                "Tools & Equipment"
            ],
            "Pet Supplies" => [
                "Dog Food",
                "Cat Toys",
                "Pet Grooming"
            ],
        ];

        collect($categories)
            ->each(fn ($subcategory, $category) => Category::firstOrCreate([
                'name' => $category,
                'slug' => str($category)->slug(),
            ])
                ->subCategories()
                ->createMany(
                collect($subcategory)->map(fn ($sub) => [
                    'name' => $sub,
                    'slug' => str($sub)->slug(),
                ])
            )
            );
    }
}
