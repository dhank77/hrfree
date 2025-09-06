<?php

declare(strict_types=1);

namespace App\Modules\Employee\Domain\Contracts;

use App\Modules\Employee\Infrastructure\Database\Models\Department;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface DepartmentRepositoryInterface
{
    public function findById(int $id): ?Department;

    public function findByName(string $name): ?Department;

    public function getAll(): Collection;

    public function getPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function getActive(): Collection;

    public function getInactive(): Collection;

    public function getByManager(int $managerId): Collection;

    public function getWithEmployeeCount(): Collection;

    public function create(array $data): Department;

    public function update(int $id, array $data): Department;

    public function delete(int $id): bool;

    public function getTotalDepartmentCount(): int;

    public function getDepartmentEmployeeCount(int $departmentId): int;

    public function getDepartmentsWithBudgetRange(float $minBudget, float $maxBudget): Collection;

    public function searchByName(string $name): Collection;
}
