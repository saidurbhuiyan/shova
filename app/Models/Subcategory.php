<?php

namespace App\Models;

use App\Traits\HasImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subcategory extends Model
{

    use HasFactory;
    use HasImage;

    /**
     * @var string[]
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image_path',
        'priority',
        'is_visible',
    ];

    /**
     * @var string[]
     */
    protected $appends = [
        'image_url',
    ];

    /**
     * The attributes that should be cast.
     * @return array
     */
    protected function casts(): array
    {
        return [
            'is_visible' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

}
