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
        Schema::create('game_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_product_id')->constrained('game_products')->onDelete('cascade');
            $table->string('name')->comment('Item name');
            $table->text('description')->nullable()->comment('Item description');
            $table->decimal('price', 10, 2)->comment('Item price in IDR');
            $table->integer('amount')->comment('Amount of game currency/item');
            $table->string('currency_type')->default('diamond')->comment('Type of game currency');
            $table->boolean('is_active')->default(true)->comment('Item status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('game_product_id');
            $table->index('name');
            $table->index('price');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_items');
    }
};