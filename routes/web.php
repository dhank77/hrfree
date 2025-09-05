<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');
    Route::get('sidebar-demo', function () {
        return inertia('sidebar-demo');
    })->name('sidebar-demo');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/dev.php';
