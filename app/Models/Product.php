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
       'title',
       'slug',
       'sku',
       'description',
       'short_description',
       'specification',
       'quantity',
       'original_price',
       'selling_price',
       'is_stocked',
       'is_visible',
       'is_trending',
       'is_featured',
       'meta_title',
       'meta_keyword',
       'meta_description',
       'total_sales'
    ];


    /**
     * The attributes that should be cast.
     * 
     * @var array
     */
    protected $casts = [
        'is_stocked' => 'boolean',
        'is_visible' => 'boolean',
        'is_trending' => 'boolean',
        'is_featured' => 'boolean',
    ];


    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'offer_percentage'
    ];


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
            'description' => $product->description,
            'short_description' => $product->short_description,
            'specification' => $product->specification,
            'image' => !$product->relationLoaded('images') ? null : $product->images
                    ->filter(fn($image) => $image->is_primary === true)
                    ->first()?->only(['image_url', 'color_name']) ?? [],
            'images' => !$product->relationLoaded('images') ? null : $product?->images
                    ->sortByDesc('is_primary')
                    ->unique('color_name')
                    ->map(fn($image) => [
                        'image_url' => $image->image_url,
                        'color_name' => strtolower($image->color_name)
                    ])
                    ->values() ?? [],
            'sku' => $product->sku,
            'is_stocked' => $product->is_stocked,
            'category' => $product->category->name,
            'category_slug' => $product->category->slug,
            'subcategory' => $product->subcategory->name ?? null,
            'brand' => $product->brand->name ?? null,
            'original_price' => $product->original_price,
            'selling_price' => $product->selling_price,
            'offer_percentage' => $product->offer_percentage,
            'rating' => round($product->reviews->avg('rating') ?? 0),
            'reviews' => $product->reviews->count() ?? 0,
            'variants' => !$product->relationLoaded('variants') ? null : $product?->variants?->map(fn($variant) => [
                'id' => $variant->id,
                'image_url' => $variant->image_url,
                'original_price' => $variant->original_price,
                'selling_price' => $variant->selling_price,
                'quantity' => $variant->quantity,
                'sku' => $variant->sku,
                'total_sales' => $variant->total_sales,
                'available_quantity' => $variant->quantity > $variant->total_sales ? $variant->quantity - $variant->total_sales : 0,
                'is_stocked' => $variant->is_stocked,
                'attributes' => !$variant->relationLoaded('productAttributeValues') ? null : $variant->productAttributeValues?->map(fn($attribute) => [
                    'id' => $attribute->id,
                    'value' => strtolower($attribute->value),
                    'name' => strtolower($attribute->productAttribute?->name),
                    'image_url' => $attribute->pivot?->image_url
                ])
            ])
        ];
    }

}
