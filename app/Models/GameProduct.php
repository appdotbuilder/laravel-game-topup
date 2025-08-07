<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\GameProduct
 *
 * @property int $id
 * @property string $name
 * @property string $category
 * @property string|null $icon_url
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GameItem> $gameItems
 * @property-read int|null $game_items_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct query()
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct whereIconUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameProduct active()
 * @method static \Database\Factories\GameProductFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GameProduct extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'category',
        'icon_url',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the game items for this product.
     */
    public function gameItems(): HasMany
    {
        return $this->hasMany(GameItem::class);
    }

    /**
     * Scope a query to only include active products.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}