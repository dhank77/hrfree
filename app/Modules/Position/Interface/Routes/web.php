<?php

use App\Modules\Position\Interface\Controllers\PositionController;
use Illuminate\Support\Facades\Route;

// Position Web Routes
// Route::middleware(['auth', 'verified'])->prefix('hr')->name('hr.')->group(function () {
//     Route::resource('positions', PositionController::class);
//     Route::get('positions/department/{departmentId}', [PositionController::class, 'byDepartment'])
//         ->name('positions.by-department');
//     Route::get('positions/active', [PositionController::class, 'active'])
//         ->name('positions.active');
//     Route::get('positions/{id}/statistics', [PositionController::class, 'statistics'])
//         ->name('positions.statistics');
// });