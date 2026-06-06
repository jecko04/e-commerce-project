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
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// add verified middleware later
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register')
//     ]);
// });

Route::get('/', [WelcomeController::class, 'index'])->name('home');


// add verified middleware later
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'role:client', 'verified'])->name('dashboard');

// add verified middleware later
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
    Route::patch('/profile', [VendorProfilesController::class, 'update'])->name('vendor.profile.update');
});

Route::get('/products', [ProductController::class, 'index'])->name('products.index');

// add verified middleware later
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
