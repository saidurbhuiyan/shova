<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductReview;
use App\Models\ProductVariant;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use App\Models\ProductVariantAttribute;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Increase memory limit
        ini_set('memory_limit', '512M');

        // Variant attributes and their values
        $attributes = [
            'color' => ['Red', 'Blue', 'Green', 'Yellow'],
            'size'  => ['Small', 'Medium', 'Large'],
        ];

        // Seed attributes and their values
        $attributeIds = [];
        foreach ($attributes as $attribute => $values) {
            $attributeModel = ProductAttribute::create(['name' => $attribute]);
            $attributeValueIds = [];
            foreach ($values as $value) {
                $attributeValueIds[] = $attributeModel->values()->create(['value' => $value])->id;
            }
            $attributeIds[$attribute] = $attributeValueIds;
        }

        // Disable query log for performance
        DB::disableQueryLog();
        $chunks = 500;  // Reduce chunk size to manage SQLite variable limit
        $totalRecords = 20000;
        $iterations = $totalRecords / $chunks;

        // Get images and users only once to avoid repeated queries
        $images = collect(Storage::disk('public')->files('images/products'))
            ->filter(fn($image) => pathinfo($image, PATHINFO_EXTENSION) === 'png')
            ->values();
        $userIds = User::pluck('id')->all();

        // Disable event listeners for the models
        Product::flushEventListeners();
        ProductVariant::flushEventListeners();
        ProductImage::flushEventListeners();
        ProductReview::flushEventListeners();
        ProductVariantAttribute::flushEventListeners();

        DB::transaction(static function () use ($iterations, $chunks, $attributeIds, $images, $userIds) {
            $variantId = 1;
            for ($i = 0; $i < $iterations; $i++) {
                // Create products in bulk
                $products = Product::factory()->count($chunks)->create();

                $productVariants = [];
                $variantAttributes = [];
                $productImages = [];
                $productReviews = [];

                foreach ($products as $product) {

                    $usedImages = [];
                    // Create product variants
                    foreach ($attributeIds['color'] as $colorId) {
                        foreach ($attributeIds['size'] as $sizeId) {
                            $productVariants[] = [
                                'product_id'     => $product->id,
                                'quantity'       => random_int(1, 100),
                                'original_price' => random_int(1000, 2000),
                                'selling_price'  => random_int(500, 1500),
                                'sku'            => 'SKU-' . strtoupper(bin2hex(random_bytes(4))),
                                'is_visible'     => true,
                                'is_stocked'     => true,
                                'total_sales'    => 0,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];

                            // Assign image to color variant
                            $availableImages = $images->diff($usedImages);
                            if ($availableImages->isEmpty()) {
                                $availableImages = $images;
                            }
                            $selectedImage = $availableImages->random();
                            $usedImages[] = $selectedImage;

                            // Set primary image for the first variant
                            $productImages[] = [
                                'product_id' => $product->id,
                                'image_path' => $selectedImage,
                                'color_name' => ProductAttributeValue::find($colorId)->value,
                                'is_primary' => count($usedImages) === 1,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];

                            // Add attributes for the variant
                            $variantAttributes[] = [
                                'variant_id' => $variantId,
                                'attribute_value_id' => $colorId,
                                'image_path' => $selectedImage,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                            $variantAttributes[] = [
                                'variant_id' => $variantId,
                                'attribute_value_id' => $sizeId,
                                'image_path' => null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];

                            // Increment the persistent variantId
                            $variantId++;
                        }
                    }

                    // Generate random reviews
                    $reviewCount = random_int(0, 5);
                    if ($reviewCount > 0) {
                        foreach (range(1, $reviewCount) as $index) {
                            $productReviews[] = [
                                'product_id' => $product->id,
                                'comment'    => 'Sample review',
                                'rating'     => random_int(1, 5),
                                'user_id'    => $userIds[array_rand($userIds)],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                        }
                    }
                }

                // Bulk insert product variants and attributes
                foreach (array_chunk($productVariants, 250) as $chunk) {
                    ProductVariant::insert($chunk);
                }

                foreach (array_chunk($variantAttributes, 250) as $chunk) {
                    ProductVariantAttribute::insert($chunk);
                }

                // Bulk insert images and reviews
                foreach (array_chunk($productImages, 250) as $chunk) {
                    ProductImage::insert($chunk);
                }
                foreach (array_chunk($productReviews, 250) as $chunk) {
                    ProductReview::insert($chunk);
                }
            }
        });
    }
}
