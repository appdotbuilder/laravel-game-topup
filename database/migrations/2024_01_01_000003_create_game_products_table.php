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
        Schema::create('game_products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Game name');
            $table->string('category')->comment('Game category');
            $table->string('icon_url')->nullable()->comment('Game icon URL');
            $table->text('description')->nullable()->comment('Game description');
            $table->boolean('is_active')->default(true)->comment('Product status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('category');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_products');
    }
};