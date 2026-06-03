<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VendorViewProductController extends Controller
{
        public function show($slug)
        {
            $product = Product::where('slug', $slug)
                ->where('vendor_id', auth()->id())
                ->with('category:id,name')
                ->firstOrFail();

            return Inertia::render('Vendor/VendorViewProduct', [
                'title' => $product->name,
                'product' => $product,
            ]);
        }
}

