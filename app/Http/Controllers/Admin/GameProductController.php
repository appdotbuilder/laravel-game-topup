<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGameProductRequest;
use App\Http\Requests\UpdateGameProductRequest;
use App\Models\GameProduct;
use Inertia\Inertia;

class GameProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = GameProduct::withCount('gameItems')
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/game-products/index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/game-products/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGameProductRequest $request)
    {
        $product = GameProduct::create($request->validated());

        return redirect()->route('admin.game-products.show', $product)
            ->with('success', 'Game product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(GameProduct $gameProduct)
    {
        $gameProduct->load(['gameItems' => function ($query) {
            $query->orderBy('price');
        }]);

        return Inertia::render('admin/game-products/show', [
            'product' => $gameProduct
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GameProduct $gameProduct)
    {
        return Inertia::render('admin/game-products/edit', [
            'product' => $gameProduct
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGameProductRequest $request, GameProduct $gameProduct)
    {
        $gameProduct->update($request->validated());

        return redirect()->route('admin.game-products.show', $gameProduct)
            ->with('success', 'Game product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GameProduct $gameProduct)
    {
        $gameProduct->delete();

        return redirect()->route('admin.game-products.index')
            ->with('success', 'Game product deleted successfully.');
    }
}