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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->comment('Unique order number');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('game_item_id')->constrained('game_items')->onDelete('cascade');
            $table->string('player_id')->comment('Player ID in the game');
            $table->decimal('amount', 10, 2)->comment('Transaction amount');
            $table->enum('payment_method', ['ewallet', 'virtual_account', 'bank_transfer'])->comment('Payment method used');
            $table->string('payment_channel')->nullable()->comment('Specific payment channel (OVO, DANA, etc.)');
            $table->enum('status', ['pending', 'processing', 'completed', 'failed', 'cancelled'])->default('pending')->comment('Transaction status');
            $table->string('external_transaction_id')->nullable()->comment('External payment gateway transaction ID');
            $table->json('payment_details')->nullable()->comment('Additional payment information');
            $table->timestamp('completed_at')->nullable()->comment('Transaction completion timestamp');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('order_number');
            $table->index('user_id');
            $table->index('status');
            $table->index('payment_method');
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};