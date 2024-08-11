<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductAttribute extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'name',
        'description'
    ];

    /**
     * @return HasMany
     */
    public function values(): HasMany
    {
        return $this->hasMany(ProductAttributeValue::class, 'attribute_id');
    }
}
