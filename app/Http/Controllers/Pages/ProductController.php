<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($slug)
    {
            $product = Product::where('slug', $slug)
            ->with('category:id,name')
            ->firstOrFail();
            $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', 'active')
            ->take(8)
            ->get();

            return Inertia::render('Products', [
                'title' => $product->name,
                'product' => $product,
                'relatedProducts' => $relatedProducts
            ]);
    }
}
