<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use App\Models\VendorProfilesModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class WelcomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        
        $products = Product::all([]);

        $featuredProducts = Product::with('vendorProfile')
        ->where('is_featured', true)
        ->where('status', 'active')
        ->whereHas('vendorProfile', function ($query) {
            $query->where('status', 'active');
        })
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
