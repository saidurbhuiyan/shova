<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'quantity',
        'price_per_unit',
        'total',
    ];

    /**
     * Get the product that owns the order item.
     *
     * @return BelongsTo
     */
    public function product() : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the order that owns the order item.
     * 
     * @return BelongsTo
     */
    public function order() : BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product variant that owns the order item.
     * 
     * @return BelongsTo
     */
    public function productVariant() : BelongsTo
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
