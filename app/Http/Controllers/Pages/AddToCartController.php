<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Inertia\Inertia;

class AddToCartController extends Controller
{
    public function index()
    {
        // $product = Product::All();

        $cartItems = CartItem::with([
            'product:id,name,slug,price,sale_price,thumbnail,stock_quantity'
        ])
        ->where('user_id', auth()->id())
        ->get();

        $total = $cartItems->sum(function ($item) {
            $price = $item->product->sale_price ?: $item->product->price;

            return $price * $item->quantity;
        });

        return Inertia::render('Cart/AddToCart', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

   public function store(Request $request, $productId)
    {
        $product = Product::findOrFail($productId);

        $request->validate([
            'quantity' => [
                'required',
                'integer',
                'min:1',
                'max:' . $product->stock_quantity,
            ],
        ]);

        $cartItem = CartItem::firstOrNew([
            'user_id' => auth()->id(),
            'product_id' => $productId,
        ]);

        $cartItem->quantity =
            ($cartItem->quantity ?? 0) + $request->quantity;

        $cartItem->save();

        return back()->with('success', 'Added to cart.');
    }
}