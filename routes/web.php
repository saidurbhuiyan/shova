<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CartedProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductViewController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', HomeController::class)->name('home');
//categories
Route::get('/category/{slug?}', CategoryController::class)->name('category');

//cart
Route::get('/cart', CartController::class)->name('cart');
Route::post('/carted-products', CartedProductController::class)->name('carted-products.fetch');

//product
Route::get('/product/{slug}', ProductViewController::class)->name('product.view');

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