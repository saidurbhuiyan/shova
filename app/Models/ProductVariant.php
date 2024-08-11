<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProductVariant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'product_id',
       'quantity',
       'original_price',
       'selling_price',
       'sku',
       'is_visible',
       'is_stocked',
       'total_sales',
    ];


    /**
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }


    public function productAttributeValues(): BelongsToMany
    {
        return $this->belongsToMany(ProductAttributeValue::class, ProductVariantAttribute::class, 'variant_id', 'attribute_value_id')
            ->withPivot('image_path')
            ->with('productAttribute');
    }
}
