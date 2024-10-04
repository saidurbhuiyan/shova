<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CartedProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductReviewsController;
use App\Http\Controllers\SearchProductController;
use App\Http\Controllers\ProductViewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RelatedProductOnCategoryController;
use App\Http\Middleware\InertiaSearchRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::group(['middleware' => InertiaSearchRequests::class], static function () {
Route::get('/', HomeController::class)->name('home');

//cart
Route::get('/cart', CartController::class)->name('cart');
Route::post('/carted-products', CartedProductController::class)->name('carted-products.fetch');

//product
Route::prefix('product')
    ->name('product.')
    ->group(static function () {
    Route::get('/view/{slug}', ProductViewController::class)->name('view');
    Route::get('/reviews/{productId}', [ProductReviewsController::class, 'show'])->name('reviews.show');
    Route::post('/reviews/{productId}', [ProductReviewsController::class, 'store'])->name('reviews.store');
    Route::get('/related/{categorySlug}/{sellingPrice}', RelatedProductOnCategoryController::class)->name('related');
    Route::get('/search', SearchProductController::class)->name('search');
});
});



//dashboard
Route::get('/dashboard', static function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    //profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';