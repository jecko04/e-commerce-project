<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddProductController extends Controller
{
    public function create()
    {
        return Inertia::render('Vendor/VendorAddProducts', [
            'title' => 'Add New Product',
        ]);
    }
}
