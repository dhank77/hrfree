<?php

declare(strict_types=1);

namespace App\Modules\Employee\Infrastructure\Repositories;

use App\Modules\Employee\Domain\Contracts\EmployeeRepositoryInterface;
use App\Modules\Employee\Infrastructure\Database\Models\Employee;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class EmployeeRepository implements EmployeeRepositoryInterface
{
    public function findById(int $id): ?Employee
    {
        return Employee::find($id);
    }

    public function findByEmail(string $email): ?Employee
    {
        return Employee::where('email', $email)->first();
    }

    public function findByEmployeeId(string $employeeId): ?Employee
    {
        return Employee::where('employee_id', $employeeId)->first();
    }

    public function getAll(): Collection
    {
        return Employee::all();
    }

    public function getPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = Employee::with(['department', 'position']);

        if (! empty($filters['department_id'])) {
            $query->where('department_id', $filters['department_id']);
        }

        if (! empty($filters['position_id'])) {
            $query->where('position_id', $filters['position_id']);
        }

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->paginate($perPage);
    }

    public function getByDepartment(int $departmentId): Collection
    {
        return Employee::where('department_id', $departmentId)
            ->with(['position'])
            ->get();
    }

    public function getByPosition(int $positionId): Collection
    {
        return Employee::where('position_id', $positionId)
            ->with(['department'])
            ->get();
    }

    public function getByManager(int $managerId): Collection
    {
        return Employee::where('manager_id', $managerId)
            ->with(['department', 'position'])
            ->get();
    }

    public function getActiveEmployees(): Collection
    {
        return Employee::active()
            ->with(['department', 'position'])
            ->get();
    }

    public function getInactiveEmployees(): Collection
    {
        return Employee::inactive()
            ->with(['department', 'position'])
            ->get();
    }

    public function create(array $data): Employee
    {
        return Employee::create($data);
    }

    public function update(int $id, array $data): Employee
    {
        $employee = Employee::findOrFail($id);
        $employee->update($data);

        return $employee->fresh();
    }

    public function delete(int $id): bool
    {
        return Employee::destroy($id) > 0;
    }

    public function searchByName(string $name): Collection
    {
        return Employee::where('first_name', 'like', "%{$name}%")
            ->orWhere('last_name', 'like', "%{$name}%")
            ->with(['department', 'position'])
            ->get();
    }

    public function getByStatus(string $status): Collection
    {
        return Employee::where('status', $status)
            ->with(['department', 'position'])
            ->get();
    }

    public function getEmployeesHiredBetween(\DateTime $startDate, \DateTime $endDate): Collection
    {
        return Employee::whereBetween('hire_date', [$startDate, $endDate])
            ->with(['department', 'position'])
            ->get();
    }

    public function getEmployeesWithUpcomingBirthdays(int $days = 30): Collection
    {
        $today = now();
        $futureDate = $today->copy()->addDays($days);

        return Employee::whereRaw(
            'DATE_FORMAT(date_of_birth, "%m-%d") BETWEEN ? AND ?',
            [$today->format('m-d'), $futureDate->format('m-d')]
        )
            ->active()
            ->with(['department', 'position'])
            ->get();
    }

    public function getEmployeesWithUpcomingWorkAnniversaries(int $days = 30): Collection
    {
        $today = now();
        $futureDate = $today->copy()->addDays($days);

        return Employee::whereRaw(
            'DATE_FORMAT(hire_date, "%m-%d") BETWEEN ? AND ?',
            [$today->format('m-d'), $futureDate->format('m-d')]
        )
            ->active()
            ->with(['department', 'position'])
            ->get();
    }

    public function getTotalEmployeeCount(): int
    {
        return Employee::count();
    }

    public function getEmployeeCountByDepartment(): array
    {
        return Employee::selectRaw('department_id, COUNT(*) as count')
            ->with('department:id,name')
            ->groupBy('department_id')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->department->name ?? 'Unknown' => $item->count];
            })
            ->toArray();
    }

    public function getEmployeeCountByStatus(): array
    {
        return Employee::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
    }
}
