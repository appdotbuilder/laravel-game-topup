<?php

namespace Tests\Feature;

use App\Models\GameItem;
use App\Models\GameProduct;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GameTopUpTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_welcome_page_displays_correctly(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_games_index_displays_all_active_games(): void
    {
        $response = $this->get('/games');

        $response->assertStatus(200);
    }

    public function test_game_show_displays_game_with_items(): void
    {
        $game = GameProduct::first();
        
        $response = $this->get("/games/{$game->id}");

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_view_transactions(): void
    {
        $user = User::factory()->create();
        Transaction::factory(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get('/transactions');

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_create_transaction(): void
    {
        $user = User::factory()->create();
        $gameItem = GameItem::first();

        $response = $this->actingAs($user)->get("/transactions/create?game_item_id={$gameItem->id}");

        $response->assertStatus(200);
    }

    public function test_user_can_store_transaction(): void
    {
        $user = User::factory()->create();
        $gameItem = GameItem::first();

        $transactionData = [
            'game_item_id' => $gameItem->id,
            'player_id' => '12345678',
            'payment_method' => 'ewallet',
            'payment_channel' => 'OVO',
        ];

        $response = $this->actingAs($user)->post('/transactions', $transactionData);

        $response->assertRedirect();
        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'game_item_id' => $gameItem->id,
            'player_id' => '12345678',
            'payment_method' => 'ewallet',
            'payment_channel' => 'OVO',
        ]);
    }

    public function test_user_can_view_own_transaction(): void
    {
        $user = User::factory()->create();
        $transaction = Transaction::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get("/transactions/{$transaction->id}");

        $response->assertStatus(200);
    }

    public function test_user_cannot_view_other_user_transaction(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $transaction = Transaction::factory()->create(['user_id' => $user2->id]);

        $response = $this->actingAs($user1)->get("/transactions/{$transaction->id}");

        $response->assertStatus(403);
    }

    public function test_guest_cannot_access_transaction_routes(): void
    {
        $this->get('/transactions')->assertRedirect('/login');
        $this->get('/transactions/create')->assertRedirect('/login');
        $this->post('/transactions', [])->assertRedirect('/login');
    }

    public function test_transaction_order_number_is_unique(): void
    {
        $orderNumber1 = Transaction::generateOrderNumber();
        $orderNumber2 = Transaction::generateOrderNumber();

        $this->assertNotEquals($orderNumber1, $orderNumber2);
    }
}