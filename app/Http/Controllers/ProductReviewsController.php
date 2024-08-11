<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductReviewsRequest;
use App\Models\ProductReview;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ProductReviewsController extends Controller
{
    /**
     * Handle the incoming request.
     * @param int $productId
     * @return JsonResponse
     */
    public function show(int $productId) : JsonResponse
    {
        $reviews = ProductReview::with('user')
            ->where('product_id', $productId)
            ->orderBy('id', 'desc')
            ->paginate(5);

        $reviews->getCollection()->transform(function ($review) {
            return [
                'user_name' => $review->user?->name,
                'user_image' => $review->user?->profile_photo_url,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => $review->created_at->diffForHumans(),
            ];
        });

        return response()->json($reviews);
    }

    /**
     * Handle the incoming request to store the review
     * @param ProductReviewsRequest $request
     * @param int $productId
     * @return RedirectResponse
     */
    public function store(ProductReviewsRequest $request, int $productId) : RedirectResponse
    {
        $validated = $request->validated();
        $review = ProductReview::firstOrCreate(
            ['product_id' => $productId,
             'user_id' => auth()->user()?->id
            ],[
            'rating' => $validated[  'rating'],
            'comment' => $validated['comment'],
        ]);

        if ($review->wasRecentlyCreated) {
            return redirect()->back()->with('success', 'Review added successfully');
        }

        return redirect()->back()->with('error', 'You have already reviewed this product');

    }
}
