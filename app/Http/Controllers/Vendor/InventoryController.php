<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        $products = Product::where('vendor_id', auth()->id())
            ->with('category:id,name')
            ->latest()
            ->get(['id', 'category_id', 'name', 'brand','slug', 'sku','thumbnail', 'price', 'sale_price', 'cost_price','stock_quantity', 'status', 'created_at']);

        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);


        return Inertia::render('Vendor/VendorInventory', [
            'title' => 'Inventory Management',
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Product $product) {
        abort_if($product->vendor_id !== auth()->id(), 403);

        $validated = $request->validate([
            'stock_quantity' => ['required', 'integer', 'min:0'],
        ]);

        $product->update([
            'stock_quantity' => $validated['stock_quantity'],
        ]);

    
        return redirect()
        ->route('vendor.inventory.index')
        ->with('success', 'Product stock updated successfully.');
    }
}
