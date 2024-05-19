<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DiscountCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'type',
        'discount_goal',
        'description',
        'discount',
        'max_discount_amount',
        'max_uses_per_user',
        'uses_limit',
        'min_target_amount',
        'is_active',
        'start_date',
        'end_date',
    ];

    /**
     * @var string[]
     */
    protected $casts = [
        'start_date'        => 'datetime:Y-m-d H:i:s',
        'end_date'          => 'datetime:Y-m-d H:i:s',
        'created_at'        => 'datetime:Y-m-d H:i:s',
        'is_active'         => 'boolean',
    ];

    /**
     * @return HasMany
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
