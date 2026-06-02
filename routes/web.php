<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Pages\ProductController;
use App\Http\Controllers\Vendor\VendorProfileController;
use App\Http\Controllers\Vendor\VendorDashboardController;
use App\Http\Controllers\Vendor\AddProductController;
use App\Http\Controllers\Vendor\VendorProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'role:admin'])->name('dashboard');

Route::middleware(['auth', 'verified', 'role:vendor'])->prefix('vendor')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Vendor/VendorDashboard');
    })->name('vendor.dashboard');

    Route::get('/add-product', [AddProductController::class, 'create'])->name('vendor.add-product');
    Route::post('/add-product', [AddProductController::class, 'store'])->name('vendor.store-product');
    Route::get('/products', [VendorProductController::class, 'index'])->name('vendor.products.index');
});

Route::get('/products', [ProductController::class, 'index'])->name('products.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
