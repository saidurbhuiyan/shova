<?php

namespace App\Http\Controllers;

use App\Models\Brand;
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
            $products = Product::search(trim($request->get('searchTerm')) ?? '')
                ->query(function ($query) use ($slug, $request) {

                    // Filter products by category
                    !empty($slug) && $query->whereHas('category', fn ($query) => $query->where('slug', $slug));

                    // Filter products by price range
                    $request->get('priceRangeFirst')
                    && $request->get('priceRangeLast')
                    && $query->whereBetween('price', [
                        $request->get('priceRangeFirst'),
                        $request->get('priceRangeLast')
                    ]);

                    // Filter products by rating
                    $request->get('onOffer') && $query->whereColumn('selling_price', '<', 'original_price');

                    return $query->with([
                        'image' => fn($query) => $query->select('product_id', 'image_path'),
                        'category'
                    ])->select('id', 'title', 'slug', 'category_id');
                });

            // Sorting products by price or id
        $request->get('sortOrder') ? $products->orderBy('selling_price', 'desc') : $products->orderBy('id', $request->get('sortOrder'));

        $products = $products->paginate(14);

        $products->getCollection()
            ->transform(function ($product) {
            return app(Product::class)->mappedProduct($product);
        });

        // Get all brands
        $brands = Brand::select('name', 'slug')
            ->where('is_visible', true)
            ->get();

        return Inertia::render('Home/Search/Show', compact('products', 'brands'));

    }
}
