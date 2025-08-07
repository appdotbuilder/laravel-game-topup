<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Seed games and items
        $this->call([
            GameSeeder::class,
        ]);

        // Create some sample transactions for the test user
        \App\Models\Transaction::factory(15)->create([
            'user_id' => $user->id,
        ]);
    }
}
