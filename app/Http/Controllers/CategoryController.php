<?php

namespace App\Http\Controllers;

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
        $products = $products->with(['image', 'category'])
            ->orderBy('id', 'desc')
            ->paginate(14);

        if (! $products) {
            abort(404);
        }

        $products->transform(function ($product) {
            return app(Product::class)->mappedProduct($product);
        });

        return Inertia::render('Home/Category/Show', compact('products'));

    }
}
