<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ?string $slug = null): Response
    {
        $products = new Product();
        if ($slug){
            $products = $products->whereHas('category', static function ($query) use ($slug) {
                $query->where('slug', $slug);
            });
        }
        $products = $products->paginate(14);

        $products->transform(function ($product) {
            return (object) [
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
            ];
        });

        if (! $products) {
            abort(404);
        }

        return Inertia::render('Home/Category/Show', compact('products'));

    }
}
