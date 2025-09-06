<?php

use App\Modules\Department\Interface\Controllers\DepartmentController;
use Illuminate\Support\Facades\Route;

// Department Web Routes
Route::middleware(['auth', 'verified'])->prefix('hr')->name('hr.')->group(function () {
    Route::resource('departments', DepartmentController::class);
    Route::get('departments/active', [DepartmentController::class, 'active'])
        ->name('departments.active');
    Route::get('departments/{id}/statistics', [DepartmentController::class, 'statistics'])
        ->name('departments.statistics');
});