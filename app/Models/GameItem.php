<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\GameItem
 *
 * @property int $id
 * @property int $game_product_id
 * @property string $name
 * @property string|null $description
 * @property string $price
 * @property int $amount
 * @property string $currency_type
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\GameProduct $gameProduct
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Transaction> $transactions
 * @property-read int|null $transactions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem whereCurrencyType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem whereGameProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameItem active()
 * @method static \Database\Factories\GameItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GameItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'game_product_id',
        'name',
        'description',
        'price',
        'amount',
        'currency_type',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'amount' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the game product that owns this item.
     */
    public function gameProduct(): BelongsTo
    {
        return $this->belongsTo(GameProduct::class);
    }

    /**
     * Get the transactions for this item.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Scope a query to only include active items.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get formatted price with currency.
     */
    public function getFormattedPriceAttribute(): string
    {
        return 'Rp ' . number_format((float) $this->price, 0, ',', '.');
    }
}