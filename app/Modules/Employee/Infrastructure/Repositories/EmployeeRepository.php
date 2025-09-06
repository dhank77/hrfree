<?php

declare(strict_types=1);

namespace App\Modules\Employee\Infrastructure\Repositories;

use App\Modules\Employee\Domain\Contracts\EmployeeRepositoryInterface;
use App\Modules\Employee\Infrastructure\Database\Models\Employee;

class EmployeeRepository implements EmployeeRepositoryInterface
{
    public function __construct(
        protected Employee $employeeModel
    ) {}

}
