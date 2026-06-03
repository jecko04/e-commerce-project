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

        public function update(Request $request, Product $product) {
            abort_if($product->vendor_id !== auth()->id(), 403);

            $validated = $request->validate([
                'status' => ['required', 'in:active,inactive,draft,out_of_stock'],
                'price' => ['required', 'numeric', 'min:0'],
                'sale_price' => ['nullable', 'numeric', 'min:0', 'lt:price'],
            ]);

            $product->update([
                'status' => $validated['status'],
                'price' => $validated['price'],
                'sale_price' => $validated['sale_price'] ?? null,
            ]);

        
            return back()
            ->with('success', 'Product created successfully.');
        }
}

