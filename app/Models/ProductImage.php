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
     * The attributes that should be appended.
     * @var string[]
     */
    protected $appends = [
        'image_url',
    ];

    /**
     * The attributes that should be cast.
     * @return string[]
     */
    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
        ];
    }

    /**
     * Get the product that owns the image.
     *
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

}
