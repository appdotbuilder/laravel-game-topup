<?php

namespace Database\Factories;

use App\Models\GameItem;
use App\Models\GameProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GameItem>
 */
class GameItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\GameItem>
     */
    protected $model = GameItem::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amounts = [86, 172, 257, 344, 429, 514, 706, 878, 1050, 2195];
        $amount = $this->faker->randomElement($amounts);
        
        return [
            'game_product_id' => GameProduct::factory(),
            'name' => $amount . ' Diamonds',
            'description' => 'Get ' . $amount . ' diamonds for your game',
            'price' => $amount * 17.5, // Approximate IDR price
            'amount' => $amount,
            'currency_type' => 'diamond',
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the item is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Create a UC (Unknown Cash) item.
     */
    public function uc(): static
    {
        $amounts = [60, 300, 600, 1500, 3000, 8100];
        $amount = $this->faker->randomElement($amounts);
        
        return $this->state(fn (array $attributes) => [
            'name' => $amount . ' UC',
            'description' => 'Get ' . $amount . ' Unknown Cash for PUBG Mobile',
            'price' => $amount * 250,
            'amount' => $amount,
            'currency_type' => 'uc',
        ]);
    }
}