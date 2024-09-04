<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductSearchController extends Controller
{

    /**
     * Handle the incoming request.
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        if ($request->has('searchTerm')) {
            $products = Product::search(trim($request->get('searchTerm')) ?? '')
                ->orderBy('id', 'desc')
                ->query(function ($query) use ($request) {

                    !empty($request->get('category')) && $query->whereHas('category', fn ($query) => $query->where('slug', $request->get('category')));

                    return $query->with([
                        'image' => fn($query) => $query->select('product_id', 'image_path')
                    ])->select('id', 'title', 'slug', 'category_id');
                })
                ->take(5)
                ->get();
        }


        return response()->json(data: $products ?? collect());
    }
}
