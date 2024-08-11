<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\HashIdService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductViewController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $slug): Response
    {
        $product = Product::where('slug', $slug)->get()->first();
        if (!$product) {
            abort(404);
        }

        $product->load([
            'category',
            'subcategory',
            'brand',
            'images',
            'reviews',
            'variants.productAttributeValues'
        ]);
        

        $hasReview = auth()->user()
            ?->productReview()
            ->where('product_id', $product->id)
            ->exists();

       return Inertia::render('Home/Product/View', [
            'product' => app(Product::class)->mappedProduct($product),
            'hasReview' => $hasReview
        ]);
    }
}
