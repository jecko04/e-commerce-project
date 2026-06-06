<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class WelcomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $products = Product::latest()->take(8)->get();
        $featuredProducts = Product::where('is_featured', true)
        ->where('status', 'active')
        ->latest()
        ->take(8)
        ->get();

        return Inertia::render('Welcome', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'categories' => $categories,
            'products' => $products,
            'featuredProducts' => $featuredProducts,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
        ]);
    }
}
