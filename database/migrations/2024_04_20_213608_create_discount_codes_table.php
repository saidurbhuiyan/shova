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
        Schema::create('discount_codes', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable();
            $table->foreignId('subcategory_id')->nullable();
            $table->string('code')->unique()->index();
            $table->string('discount_goal');
            $table->string('description');
            $table->string('type')->comment('percentage, fixed')->default('percentage')->index();
            $table->unsignedBigInteger('discount')->default(0);
            $table->unsignedBigInteger('max_discount_amount')->default(0);
            $table->unsignedBigInteger('max_uses_per_user')->default(1);
            $table->unsignedBigInteger('uses_limit')->default(0);
            $table->string('min_target_amount')->default(0);
            $table->boolean('is_active')->default(true)->index();
            $table->timestamp('start_date')->nullable()->index();
            $table->timestamp('end_date')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupon_codes');
    }
};
