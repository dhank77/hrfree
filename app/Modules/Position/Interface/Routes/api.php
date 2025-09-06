<?php

use App\Modules\Position\Interface\Controllers\PositionController;
use Illuminate\Support\Facades\Route;

// Position API Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('positions', PositionController::class);
    Route::get('positions/department/{departmentId}', [PositionController::class, 'byDepartment']);
    Route::get('positions/active', [PositionController::class, 'active']);
    Route::get('positions/{id}/statistics', [PositionController::class, 'statistics']);
});