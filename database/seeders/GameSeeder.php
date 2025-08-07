<?php

namespace Database\Seeders;

use App\Models\GameItem;
use App\Models\GameProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create popular games with their items
        $games = [
            [
                'name' => 'Mobile Legends: Bang Bang',
                'category' => 'MOBA',
                'description' => 'Join your friends in a brand new 5v5 MOBA showdown!',
                'items' => [
                    ['name' => '86 Diamonds', 'amount' => 86, 'price' => 15000],
                    ['name' => '172 Diamonds', 'amount' => 172, 'price' => 30000],
                    ['name' => '257 Diamonds', 'amount' => 257, 'price' => 45000],
                    ['name' => '344 Diamonds', 'amount' => 344, 'price' => 60000],
                    ['name' => '429 Diamonds', 'amount' => 429, 'price' => 75000],
                    ['name' => '706 Diamonds', 'amount' => 706, 'price' => 120000],
                ]
            ],
            [
                'name' => 'PUBG Mobile',
                'category' => 'Battle Royale',
                'description' => 'The most intense free-to-play multiplayer action!',
                'items' => [
                    ['name' => '60 UC', 'amount' => 60, 'price' => 15000, 'currency' => 'uc'],
                    ['name' => '300 UC', 'amount' => 300, 'price' => 75000, 'currency' => 'uc'],
                    ['name' => '600 UC', 'amount' => 600, 'price' => 150000, 'currency' => 'uc'],
                    ['name' => '1500 UC', 'amount' => 1500, 'price' => 375000, 'currency' => 'uc'],
                    ['name' => '3000 UC', 'amount' => 3000, 'price' => 750000, 'currency' => 'uc'],
                ]
            ],
            [
                'name' => 'Free Fire',
                'category' => 'Battle Royale',
                'description' => 'The ultimate survival shooter game!',
                'items' => [
                    ['name' => '100 Diamonds', 'amount' => 100, 'price' => 15000],
                    ['name' => '210 Diamonds', 'amount' => 210, 'price' => 30000],
                    ['name' => '355 Diamonds', 'amount' => 355, 'price' => 50000],
                    ['name' => '720 Diamonds', 'amount' => 720, 'price' => 100000],
                    ['name' => '1450 Diamonds', 'amount' => 1450, 'price' => 200000],
                ]
            ],
            [
                'name' => 'Genshin Impact',
                'category' => 'RPG',
                'description' => 'Step into Teyvat, a vast world teeming with life!',
                'items' => [
                    ['name' => '60 Genesis Crystals', 'amount' => 60, 'price' => 15000, 'currency' => 'crystal'],
                    ['name' => '300 Genesis Crystals', 'amount' => 300, 'price' => 75000, 'currency' => 'crystal'],
                    ['name' => '980 Genesis Crystals', 'amount' => 980, 'price' => 240000, 'currency' => 'crystal'],
                    ['name' => '1980 Genesis Crystals', 'amount' => 1980, 'price' => 475000, 'currency' => 'crystal'],
                    ['name' => '3280 Genesis Crystals', 'amount' => 3280, 'price' => 799000, 'currency' => 'crystal'],
                ]
            ]
        ];

        foreach ($games as $gameData) {
            $game = GameProduct::create([
                'name' => $gameData['name'],
                'category' => $gameData['category'],
                'description' => $gameData['description'],
                'is_active' => true,
            ]);

            foreach ($gameData['items'] as $itemData) {
                GameItem::create([
                    'game_product_id' => $game->id,
                    'name' => $itemData['name'],
                    'description' => 'Get ' . $itemData['name'] . ' for ' . $game->name,
                    'price' => $itemData['price'],
                    'amount' => $itemData['amount'],
                    'currency_type' => $itemData['currency'] ?? 'diamond',
                    'is_active' => true,
                ]);
            }
        }
    }
}