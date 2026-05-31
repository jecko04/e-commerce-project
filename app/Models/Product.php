<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'vendor_id',
        'category_id',
        'name',
        'slug',
        'sku',
        'brand',
        'short_description',
        'description',
        'price',
        'sale_price',
        'cost_price',
        'track_inventory',
        'stock_quantity',
        'low_stock_threshold',
        'status',
        'thumbnail',
        'meta_title',
        'meta_description',
        'is_featured',
        'published_at',
    ];
}
