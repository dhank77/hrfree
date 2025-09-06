<?php

use App\Modules\Department\Interface\Controllers\DepartmentController;
use Illuminate\Support\Facades\Route;

// Department API Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('departments', DepartmentController::class);
    Route::get('departments/active', [DepartmentController::class, 'active']);
    Route::get('departments/{id}/statistics', [DepartmentController::class, 'statistics']);
});