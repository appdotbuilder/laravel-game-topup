<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GameProduct;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of games.
     */
    public function index()
    {
        $games = GameProduct::with(['gameItems' => function ($query) {
            $query->active()->orderBy('price');
        }])
        ->active()
        ->orderBy('name')
        ->get();

        return Inertia::render('games/index', [
            'games' => $games
        ]);
    }

    /**
     * Show the specified game with its items.
     */
    public function show(GameProduct $game)
    {
        $game->load(['gameItems' => function ($query) {
            $query->active()->orderBy('price');
        }]);

        return Inertia::render('games/show', [
            'game' => $game
        ]);
    }
}