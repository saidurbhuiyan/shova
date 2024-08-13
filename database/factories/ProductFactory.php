<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Random\RandomException;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * @throws RandomException
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
            'sku' => 'prod-' . strtoupper(bin2hex(random_bytes(3))),
            'short_description' => fake()->text(),
            'description' => fake()->paragraph(10),
            'specification' => fake()->paragraph(10),
            'quantity' => fake()->numberBetween(1, 100),
            'original_price' => fake()->boolean() ? $price : fake()->numberBetween($price, $price * 2),
            'selling_price' => $price,
            'is_stocked' => fake()->boolean(),
            'is_visible' => fake()->boolean(),
        ];
    }
}
