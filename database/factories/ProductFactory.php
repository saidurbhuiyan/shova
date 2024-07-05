<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->numberBetween(10, 1000);
        $category = Category::all()->random();
        $title = fake()->sentence();
        return [
            'user_id' => User::all()->random()->id,
            'category_id' => $category->id,
            'subcategory_id' => $category->subcategories->random()->id,
            'brand_id' => Brand::all()->random()->id,
            'title' => $title,
            'slug' => str_replace(' ', '-', $title),
            'description' => fake()->text(),
            'quantity' => fake()->numberBetween(1, 100),
            'price' => fake()->boolean() ? $price : fake()->numberBetween($price, $price * 2),
            'sale_price' => $price,
            'is_stocked' => fake()->boolean(),
            'is_visible' => fake()->boolean(),
        ];
    }
}
