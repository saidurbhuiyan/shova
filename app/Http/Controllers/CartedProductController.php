<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartedProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartedProductController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CartedProductRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $products = Product::with([
            'category',
            'subcategory',
            'brand',
            'images' => function ($query) {
                $query->where('is_primary', true);
            },
            'reviews'
        ])->whereIn('id', $validated['product_ids'])
            ->get()
            ->map(fn($product) => (object)[
                'id' => $product->id,
                'name' => $product->name,
                'image' => $product->images->first()->image_url ?? null,
                'category' => $product->category->name,
                'category_slug' => $product->category->slug,
                'subcategory' => $product->subcategory->name ?? null,
                'brand' => $product->brand->name ?? null,
                'price' => $product->price,
                'sale_price' => $product->sale_price,
                'offer_percentage' => $product->offer_percentage,
                'rating' => round($product->reviews->avg('rating') ?? 0),
                'reviews' => $product->reviews->count() ?? 0,
            ]);

        return response()->json($products);
    }
}
