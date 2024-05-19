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
        Schema::create('addresses', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->string('address');
            $table->string('city');
            $table->string('sub_district');
            $table->string('contact_number');
            $table->boolean('is_primary')->default(true);
            $table->boolean('is_guest')->default(false);
            $table->string('guest_name')->nullable();
            $table->boolean('is_archived')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};
