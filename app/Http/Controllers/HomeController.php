<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Services\HashIdService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
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
        // Fetch all relevant products
        $latestProduct = Cache::remember('latest_products', 60, fn() => $this->getMappedProducts());

        $firstBannerProduct = Cache::remember('first_banner_products', 60, fn() => $this->getMappedProducts('Clothing & Accessories'));

        $secondBannerProduct = Cache::remember('second_banner_products', 60, fn() => $this->getMappedProducts('Home & Kitchen'));


        return Inertia::render('Home/Show', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'categories' => Category::latest()->limit(6)->get(),
            'latestProduct' => $latestProduct,
            'firstBannerProduct' => $firstBannerProduct,
            'secondBannerProduct' => $secondBannerProduct,
            'bannerProductCategoriesSlug' => [
                'firstBannerProduct' => 'clothing-accessories',
                'secondBannerProduct' => 'home-kitchen'
            ],
        ]);

    }

    /**
     * @param null $categoryName
     * @return Collection
     */
    protected function getMappedProducts($categoryName = null) : Collection
    {
        $products = Product::with([
            'category',
            'subcategory',
            'brand',
            'images' => function ($query) {
                $query->where('is_primary', true);
            },
            'reviews',
        ])
            ->where('is_stocked', true)
            ->where('is_visible', true);
        if ($categoryName) {
            $products->whereHas('category', function ($query) use ($categoryName) {
                $query->where('name', $categoryName);
            });
        }

        $products = $products->latest('id')
        ->limit(5)
        ->get();

        return $products
            ->map(fn($product) => app(Product::class)->mappedProduct($product));

    }
}
