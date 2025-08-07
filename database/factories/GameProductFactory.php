<?php

namespace Database\Factories;

use App\Models\GameProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GameProduct>
 */
class GameProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\GameProduct>
     */
    protected $model = GameProduct::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $games = [
            ['name' => 'Mobile Legends', 'category' => 'MOBA'],
            ['name' => 'PUBG Mobile', 'category' => 'Battle Royale'],
            ['name' => 'Free Fire', 'category' => 'Battle Royale'],
            ['name' => 'Call of Duty Mobile', 'category' => 'FPS'],
            ['name' => 'Genshin Impact', 'category' => 'RPG'],
            ['name' => 'Arena of Valor', 'category' => 'MOBA'],
            ['name' => 'Clash Royale', 'category' => 'Strategy'],
            ['name' => 'Clash of Clans', 'category' => 'Strategy'],
        ];

        $game = $this->faker->randomElement($games);

        return [
            'name' => $game['name'],
            'category' => $game['category'],
            'icon_url' => $this->faker->imageUrl(100, 100, 'games'),
            'description' => $this->faker->paragraph(),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the product is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}