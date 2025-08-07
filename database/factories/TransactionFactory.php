<?php

namespace Database\Factories;

use App\Models\GameItem;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Transaction>
     */
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gameItem = GameItem::factory()->create();
        $paymentMethods = ['ewallet', 'virtual_account', 'bank_transfer'];
        $paymentChannels = [
            'ewallet' => ['OVO', 'DANA', 'GoPay', 'ShopeePay'],
            'virtual_account' => ['BCA VA', 'Mandiri VA', 'BNI VA', 'BRI VA'],
            'bank_transfer' => ['BCA', 'Mandiri', 'BNI', 'BRI'],
        ];
        
        $paymentMethod = $this->faker->randomElement($paymentMethods);
        $paymentChannel = $this->faker->randomElement($paymentChannels[$paymentMethod]);

        return [
            'order_number' => Transaction::generateOrderNumber(),
            'user_id' => User::factory(),
            'game_item_id' => $gameItem->id,
            'player_id' => $this->faker->numerify('########'),
            'amount' => $gameItem->price,
            'payment_method' => $paymentMethod,
            'payment_channel' => $paymentChannel,
            'status' => $this->faker->randomElement(['completed', 'pending', 'processing']),
            'external_transaction_id' => $this->faker->uuid(),
            'payment_details' => [
                'channel' => $paymentChannel,
                'account_number' => $this->faker->numerify('##########'),
            ],
            'completed_at' => $this->faker->optional(0.7)->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the transaction is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'completed_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ]);
    }

    /**
     * Indicate that the transaction is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'completed_at' => null,
        ]);
    }
}