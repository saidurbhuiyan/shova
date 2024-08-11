<?php

namespace App\Models;

use App\Traits\HasImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    use HasFactory;
    use HasImage;

    /**
     * The attributes that are mass assignable. 
     * 
     * @var array
     */
    protected $fillable = [
        'product_id',
        'image_path',
        'color_name',
        'is_primary',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_primary' => 'boolean',
    ];

    protected $appends = [
        'image_url',
    ];

    /**
     * Get the product that owns the image.
     * 
     * @return BelongsTo
     */
    public function product() : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
