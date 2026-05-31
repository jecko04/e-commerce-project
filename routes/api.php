<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Vendor\AddProductController;

Route::get('/add-product', [AddProductController::class, 'create']);
Route::post('/add-product', [AddProductController::class, 'store']);