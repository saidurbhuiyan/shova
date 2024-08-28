<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('category_id');
            $table->foreignId('brand_id');
            $table->foreignId('subcategory_id');
            $table->string('title')->unique();
            $table->string('slug')->unique();
            $table->string('sku')->nullable();
            $table->mediumText('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->longText('specification')->nullable();
            $table->unsignedInteger('quantity')->nullable();
            $table->decimal('original_price', 10)->nullable();
            $table->decimal('selling_price', 10)->nullable();
            $table->boolean('is_stocked')->default(true)->index();
            $table->boolean('is_visible')->default(true)->index();
            $table->boolean('is_trending')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('total_sales')->default(0);

            $table->string('meta_title')->nullable();
            $table->mediumText('meta_keyword')->nullable();
            $table->mediumText('meta_description')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
