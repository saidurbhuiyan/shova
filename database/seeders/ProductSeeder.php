<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $product = Product::factory(100)
            ->create();

        $variantType = collect(['color', 'size'])
            ->random(1)
            ->first();
        $variant = collect([
            'color' => ['red', 'blue', 'green', 'yellow'],
            'size' => ['small', 'medium', 'large'],
        ])
            ->only($variantType)
            ->flatten();

        $product->each(function ($product) use ($variant, $variantType) {
            $product->variants()->createMany(
                $variant->map(fn ($name) => [
                    'variant_type' => $variantType,
                    'name' => $name,
                    'quantity' => random_int(1, 100),
                ])
            );

            $product->images()->createMany(
                collect(Storage::disk('public')->files('images/products'))->filter(fn ($image) => pathinfo($image)['extension'] === 'png')
                    ->random(3)
                    ->map(fn ($image, $key) => [
                    'image_path' => $image,
                    'is_primary' => $key === 0,
                ])
            );

            $product->reviews()->createMany(
                collect(['good product', 'bad product', 'average product', 'excellent product', 'terrible product', 'awesome product'])->map(fn ($comment) => [
                    'comment' => $comment,
                    'rating' => random_int(1, 5),
                    'user_id' => User::all()->random()->id,
                ])
            );
        });
    }
}
