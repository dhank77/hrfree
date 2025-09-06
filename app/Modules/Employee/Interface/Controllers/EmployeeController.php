<?php

declare(strict_types=1);

namespace App\Modules\Employee\Interface\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Employee\Application\Services\EmployeeService;

class EmployeeController extends Controller
{

    public function __construct(
        protected EmployeeService $employeeService
    ) {}

}
