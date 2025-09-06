<?php

use App\Modules\Employee\Interface\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

Route::prefix('hr')->name('hr.')->group(function () {
    Route::resource('employees', EmployeeController::class);
    
    Route::get('employees/department/{departmentId}', [EmployeeController::class, 'byDepartment'])
        ->name('employees.by-department');
    Route::get('employees/position/{positionId}', [EmployeeController::class, 'byPosition'])
        ->name('employees.by-position');
    Route::get('employees/search', [EmployeeController::class, 'search'])
        ->name('employees.search');
    Route::get('employees/active', [EmployeeController::class, 'active'])
        ->name('employees.active');
    Route::get('employees/inactive', [EmployeeController::class, 'inactive'])
        ->name('employees.inactive');
});
