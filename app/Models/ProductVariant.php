<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    use HasFactory;

     /**
     * The table associated with the model.
     * 
     * @var string
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'variant_type',
       'name',
        'quantity',
    ];

    /**
     * Get the product that owns the variant.
     */
    public function product() : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
