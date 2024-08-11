<?php

namespace App\Models;

use App\Traits\HasImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProductVariantAttribute extends Pivot
{
    use HasFactory;
    use HasImage;

    protected $table = 'product_variant_attributes';

    /**
     * @var string[]
     */
    protected $fillable = [
        'variant_id',
        'attribute_value_id',
       'image_path',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'image_url',
    ];

    /**
     * @return BelongsTo
     */
    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }

    /**
     * @return BelongsTo
     */
    public function attributeValue(): BelongsTo
    {
        return $this->belongsTo(ProductAttributeValue::class, 'attribute_value_id');
    }
}
