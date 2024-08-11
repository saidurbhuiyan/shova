<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\HashIdService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RelatedProductOnCategoryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $categorySlug, int $sellingPrice): JsonResponse
    {
            $expectedPrice = $sellingPrice + (($sellingPrice * 10) / 100);
            $products = Product::whereHas('category', static function ($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            });

            $products = $products->where('selling_price', '<=', $expectedPrice)
                ->orderBy('selling_price', 'desc')
                ->get()
                ->take(4)
            ->map(static function ($product) {
                return [
                    'hash_id' => app(HashIdService::class)->encode($product->id),
                    'title' => $product->title,
                    'slug' => $product->slug,
                    'selling_price' => $product->selling_price,
                    'category' => $product->category->name,
                    'image' => $product->images
                            ->filter(fn($image) => $image->is_primary === true)
                            ->first()->image_url ?? null,
                ];
            });

            return response()->json($products);
    }
}
