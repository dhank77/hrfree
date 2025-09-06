<?php

declare(strict_types=1);

namespace App\Modules\Employee\Infrastructure\Repositories;

use App\Modules\Employee\Domain\Contracts\DepartmentRepositoryInterface;
use App\Modules\Employee\Infrastructure\Database\Models\Department;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class DepartmentRepository implements DepartmentRepositoryInterface
{
    public function findById(int $id): ?Department
    {
        return Department::find($id);
    }

    public function findByName(string $name): ?Department
    {
        return Department::where('name', $name)->first();
    }

    public function findByCode(string $code): ?Department
    {
        return Department::where('code', $code)->first();
    }

    public function getAll(): Collection
    {
        return Department::with(['manager', 'employees'])->get();
    }

    public function getPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = Department::with(['manager', 'employees']);

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['search']}%")
                    ->orWhere('code', 'like', "%{$filters['search']}%")
                    ->orWhere('description', 'like', "%{$filters['search']}%");
            });
        }

        return $query->paginate($perPage);
    }

    public function getActive(): Collection
    {
        return Department::where('status', 'active')
            ->with(['manager', 'employees'])
            ->get();
    }

    public function getInactive(): Collection
    {
        return Department::where('status', '!=', 'active')
            ->with(['manager', 'employees'])
            ->get();
    }

    public function getByManager(int $managerId): Collection
    {
        return Department::where('manager_id', $managerId)
            ->with(['employees'])
            ->get();
    }

    public function getWithEmployeeCount(): Collection
    {
        return Department::withCount('employees')
            ->with(['manager'])
            ->get();
    }

    public function searchByName(string $name): Collection
    {
        return Department::where('name', 'like', "%{$name}%")
            ->with(['manager', 'employees'])
            ->get();
    }

    public function create(array $data): Department
    {
        return Department::create($data);
    }

    public function update(int $id, array $data): Department
    {
        $department = Department::findOrFail($id);
        $department->update($data);

        return $department->fresh(['manager', 'employees']);
    }

    public function delete(int $id): bool
    {
        return Department::destroy($id) > 0;
    }

    public function getTotalDepartmentCount(): int
    {
        return Department::count();
    }

    public function getDepartmentEmployeeCount(int $departmentId): int
    {
        $department = Department::withCount('employees')->find($departmentId);

        return $department ? $department->employees_count : 0;
    }

    public function getDepartmentsWithBudgetRange(float $minBudget, float $maxBudget): Collection
    {
        return Department::whereBetween('budget', [$minBudget, $maxBudget])
            ->with(['manager', 'employees'])
            ->get();
    }
}
