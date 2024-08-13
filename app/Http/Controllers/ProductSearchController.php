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
        if ($request->has('query')) {
            $products = Product::search(trim($request->get('query')) ?? '')
                ->orderBy('id', 'desc')
                ->query(function ($query) use ($request) {
                    if (!empty($request->get('category'))) {
                        $query->where('category_id', $request->get('category'));
                    }
                    return $query->with([
                        'image' => fn($query) => $query->select('product_id', 'image_path')
                    ])->select('id', 'title', 'slug');
                })
                ->take(5)
                ->get();
        }


        return response()->json(data: $products ?? collect());
    }
}
