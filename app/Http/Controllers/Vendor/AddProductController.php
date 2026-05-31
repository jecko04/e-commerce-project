<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AddProductController extends Controller
{
    public function create()
    {
        $categories = Category::where('is_active', true)
        ->orderBy('name')
        ->get(['id', 'name']);

        return Inertia::render('Vendor/VendorAddProducts', [
            'title' => 'Add New Product',
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        // Validate and store the product
        $validated = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug'],
            'sku' => ['nullable', 'string', 'max:255', 'unique:products,sku'],
            'brand' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0', 'lte:price'],
            'cost_price' => ['nullable', 'numeric', 'min:0'],
            'track_inventory' => ['boolean'],
            'stock_quantity' => ['nullable', 'integer', 'min:0'],
            'low_stock_threshold' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', Rule::in(['draft', 'active', 'inactive', 'out_of_stock'])],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('products', 'public');
            $validated['thumbnail'] = $path;
        }

        $validated['vendor_id'] = auth()->id();
        $validated['track_inventory'] = $request->boolean('track_inventory');
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['stock_quantity'] = $validated['stock_quantity'] ?? 0;
        $validated['low_stock_threshold'] = $validated['low_stock_threshold'] ?? 5;

        Product::create($validated);

        return redirect()
        ->route('vendor.add-product')
        ->with('success', 'Product created successfully.');
    }
}
