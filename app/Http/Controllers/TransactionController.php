<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
use App\Models\GameItem;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of user's transactions.
     */
    public function index(Request $request)
    {
        $transactions = Transaction::with(['gameItem.gameProduct'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('transactions/index', [
            'transactions' => $transactions
        ]);
    }

    /**
     * Show the form for creating a new transaction.
     */
    public function create(Request $request)
    {
        $gameItemId = $request->get('game_item_id');
        $gameItem = null;
        
        if ($gameItemId) {
            $gameItem = GameItem::with('gameProduct')->findOrFail($gameItemId);
        }

        return Inertia::render('transactions/create', [
            'gameItem' => $gameItem,
            'paymentMethods' => [
                'ewallet' => [
                    'name' => 'E-Wallet',
                    'channels' => ['OVO', 'DANA', 'GoPay', 'ShopeePay']
                ],
                'virtual_account' => [
                    'name' => 'Virtual Account',
                    'channels' => ['BCA VA', 'Mandiri VA', 'BNI VA', 'BRI VA']
                ],
                'bank_transfer' => [
                    'name' => 'Bank Transfer',
                    'channels' => ['BCA', 'Mandiri', 'BNI', 'BRI']
                ]
            ]
        ]);
    }

    /**
     * Store a newly created transaction.
     */
    public function store(StoreTransactionRequest $request)
    {
        $gameItem = GameItem::findOrFail($request->validated()['game_item_id']);
        
        $transaction = Transaction::create([
            'order_number' => Transaction::generateOrderNumber(),
            'user_id' => $request->user()->id,
            'game_item_id' => $gameItem->id,
            'player_id' => $request->validated()['player_id'],
            'amount' => $gameItem->price,
            'payment_method' => $request->validated()['payment_method'],
            'payment_channel' => $request->validated()['payment_channel'],
            'status' => 'pending',
            'payment_details' => [
                'channel' => $request->validated()['payment_channel'],
                'player_id' => $request->validated()['player_id'],
            ],
        ]);

        return redirect()->route('transactions.show', $transaction)
            ->with('success', 'Transaction created successfully! Please complete your payment.');
    }

    /**
     * Display the specified transaction.
     */
    public function show(Transaction $transaction)
    {
        // Ensure user can only view their own transactions
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        $transaction->load(['gameItem.gameProduct']);

        return Inertia::render('transactions/show', [
            'transaction' => $transaction
        ]);
    }
}