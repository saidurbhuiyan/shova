<?php

namespace App\Models;

use App\Traits\HasImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;
    use HasImage;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'priority',
        'description',
        'image_path',
        'is_visible',
        'meta_title',
        'meta_keyword',
        'meta_description',
    ];


    /**
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
            'is_visible' => 'boolean',
        ];
    }

    /**
     * Get all of the subcategories for the Category
     * @return HasMany
     */
    public function subcategories(): HasMany
    {
        return $this->hasMany(Subcategory::class);
    }

    /**
     * Get all of the products for the Category
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
