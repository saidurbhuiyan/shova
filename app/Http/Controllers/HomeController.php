<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request) : Response
    {
        // Fetch all relevant products in one query
        $products = Product::with([
            'category',
            'subcategory',
            'brand',
            'images' => function ($query) {
                $query->where('is_primary', true);
            },
            'reviews'
        ])
            ->where('is_stocked', true)
            ->where('is_visible', true)
            ->where(function ($query) {
                $query->whereHas('category', function ($query) {
                    $query->where('name', 'Home & Kitchen')
                        ->orWhere('name', 'Clothing & Accessories');
                })
                    ->orWhereColumn('price', '>', 'sale_price');
            })
            ->latest()
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

        // Separate the products into different collections
        $offerProduct = $products
            ->filter(fn($product) => $product->price > $product->sale_price)
            ->take(3)
            ->values();

        $latestProduct = $products->take(10);

        $firstBannerProduct = $products
            ->filter(fn($product) => $product->category === 'Home & Kitchen')
            ->take(5)
            ->values();

        $secondBannerProduct = $products
            ->filter(fn($product) => $product->category === 'Clothing & Accessories')
            ->take(5)
            ->values();


        return Inertia::render('Home/Show', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'categories' => Category::latest()->limit(6)->get(),
            'offerProduct' => $offerProduct,
            'latestProduct' => $latestProduct,
            'firstBannerProduct' => $firstBannerProduct,
            'secondBannerProduct' => $secondBannerProduct,
        ]);

    }
}
