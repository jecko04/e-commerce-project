<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\VendorProfilesModel;
use App\Models\Category;
use App\Models\CartItem;

class Product extends Model
{
    protected $table = 'products';

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

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function vendorProfile()
    {
        return $this->hasOne(VendorProfilesModel::class, 'vendor_id', 'vendor_id');
    }

    public function cartItem()
    {
        return $this->hasOne(CartItem::class, 'productId', 'productId');
    }

}
