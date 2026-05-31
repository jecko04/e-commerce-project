<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    public function index()
    {
        $products = Product::where('vendor_id', auth()->id())
            ->with('category:id,name')
            ->latest()
            ->get(['id', 'category_id', 'name', 'slug', 'sku','thumbnail', 'price', 'sale_price', 'stock_quantity', 'status', 'created_at']);

        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Vendor/VendorProducts', [
            'title' => 'My Products',
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
