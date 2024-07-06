<?php

namespace App\Models;

use App\Services\HashIdService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
       'name',
       'slug',
       'description',
       'quantity',
       'price',
       'sale_price',
       'is_stocked',
       'is_visible',
    ];


    /**
     * The attributes that should be cast.
     * 
     * @var array
     */
    protected $casts = [
        'is_stocked' => 'boolean',
        'is_visible' => 'boolean',
    ];


    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['offer_percentage'];


    /**
     * Get the percentage of price that is off.
     * @return float|int
     */
    public function getOfferPercentageAttribute(): float|int
    {
        if ($this->price >$this->sale_price) {
            return round((($this->price - $this->sale_price) / $this->price) * 100, 2);
        }

        return 0;
    }


    /**
     * Get the user that owns the product.
     * 
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that owns the product.
     *
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }


    /**
     * Get the category that owns the product.
     *
     * @return BelongsTo
     */
    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(Subcategory::class);
    }


    /**
     * Get the brand that owns the product.
     *
     * @return BelongsTo
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Get all of the product's images.
     *
     * @return HasMany
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    /**
     * Get all of the product's variants.
     *
     * @return HasMany
     */
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    /**
     * Get all of the product's reviews.
     *
     * @return HasMany
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    /**
     * Get the mapped product collection to be used in the view.
     * @param Product $product
     * @return object
     */
    public function mappedProduct(Product $product) : object
    {
        return (object)[
            'sku_id' => $product->id,
            'hash_id' => (new HashIdService)->encode($product->id),
            'title' => $product->title,
            'slug' => $product->slug,
            'image' => $product->images
                    ->filter(fn($image) => $image->is_primary === true)
                    ->first()->image_url ?? null,
            'images' => $product->images
                    ->sortByDesc('is_primary')
                    ->take(4)
                    ->pluck('image_url')
                    ->toArray() ?? [],
            'is_stoked' => $product->is_stocked,
            'category' => $product->category->name,
            'category_slug' => $product->category->slug,
            'subcategory' => $product->subcategory->name ?? null,
            'brand' => $product->brand->name ?? null,
            'price' => $product->price,
            'sale_price' => $product->sale_price,
            'offer_percentage' => $product->offer_percentage,
            'rating' => round($product->reviews->avg('rating') ?? 0),
            'reviews' => $product->reviews->count() ?? 0,
        ];
    }

}
