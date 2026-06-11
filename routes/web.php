<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Pages\ProductController;
use App\Http\Controllers\Vendor\VendorProfileController;
use App\Http\Controllers\Vendor\VendorDashboardController;
use App\Http\Controllers\Vendor\AddProductController;
use App\Http\Controllers\Vendor\VendorProductController;
use App\Http\Controllers\Vendor\InventoryController;
use App\Http\Controllers\Vendor\VendorViewProductController;
use App\Http\Controllers\Vendor\Profiles\VendorProfilesController;
use App\Http\Controllers\Users\Profiles\UsersProfileController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'role:client', 'verified'])->prefix('user')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Users/Dashboard');
    })->name('dashboard');

    Route::get('/profile', [UsersProfileController::class, 'edit'])->name('user.profile');
    Route::post('/profile', [UsersProfileController::class, 'update'])->name('user.profile.update');
});

Route::middleware(['auth', 'role:vendor', 'verified'])->prefix('vendor')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Vendor/VendorDashboard');
    })->name('vendor.dashboard');

    Route::get('/add-product', [AddProductController::class, 'create'])->name('vendor.add-product');
    Route::post('/add-product', [AddProductController::class, 'store'])->name('vendor.store-product');
    Route::get('/products', [VendorProductController::class, 'index'])->name('vendor.products.index');
    Route::get('/inventory', [InventoryController::class, 'index'])->name('vendor.inventory.index');
    Route::get('/view-products/{slug}', [VendorViewProductController::class, 'show'])->name('vendor.view-products.show');
    Route::patch('view-products/{product}', [VendorViewProductController::class, 'update'])->name('vendor.view-products.update');
    Route::patch('inventory/{product}', [InventoryController::class, 'update'])->name('vendor.inventory.update');

    Route::get('/profile', [VendorProfilesController::class, 'edit'])->name('vendor.profile');
    Route::post('/profile', [VendorProfilesController::class, 'update'])->name('vendor.profile.update');
});

Route::get('/products', [ProductController::class, 'index'])->name('products.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
