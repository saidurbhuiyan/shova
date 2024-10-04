<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchProductController extends Controller
{

    /**
     * Handle the incoming request.
     * @param Request $request
     * @return JsonResponse|Response
     */
    public function __invoke(Request $request): JsonResponse | Response
    {
        $products = Product::search(trim($request->get('product')) ?? '');

        //order product by price
        if ($request->get('sortOrder')) {
            $products = $products->orderBy('selling_price', trim($request->get('sortOrder')));
        }

        if ($request->get('inStock')) {
            $products = $products->where('is_stocked', (bool)$request->get('inStock'));
        }

        $products = $products->query(function ($query) use ($request) {

            !empty($request->get('category')) && $query->whereHas('category', fn ($query) => $query->where('slug', $request->get('category')));

            // Filter products by rating
            $request->get('onOffer') === 'true' && $query->whereColumn('selling_price', '<', 'original_price');

                    return $query->with([
                        'category',
                        'subcategory',
                        'brand',
                        'images' => function ($query) {
                            $query->where('is_primary', true);
                        },
                        'reviews',
                    ]);

        });

        // return json response
        if ($request->get('format') === 'json') {
            $products = $products->take((int)($request->get('perPage') ?? 14))
                ->get();
            $products = $products->map(fn($product) => app(Product::class)->mappedProduct($product));

            return response()->json(data: $products);
        }

        // get products
        $products = $products->paginate((int)($request->get('perPage') ?? 14));

        // map products
        $products->getCollection()
            ->transform(function ($product) {
                return app(Product::class)->mappedProduct($product);
            });

        return Inertia::render('Home/Search/Show', compact('products'));
    }
}
