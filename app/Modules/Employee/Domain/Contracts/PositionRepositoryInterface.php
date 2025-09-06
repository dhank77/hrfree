<?php

declare(strict_types=1);

namespace App\Modules\Employee\Domain\Contracts;

use App\Modules\Employee\Infrastructure\Database\Models\Position;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface PositionRepositoryInterface
{
    public function findById(int $id): ?Position;

    public function findByTitle(string $title): ?Position;

    public function getAll(): Collection;

    public function getPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function getActive(): Collection;

    public function getInactive(): Collection;

    public function getByDepartment(int $departmentId): Collection;

    public function getByLevel(string $level): Collection;

    public function getBySalaryRange(float $minSalary, float $maxSalary): Collection;

    public function create(array $data): Position;

    public function update(int $id, array $data): Position;

    public function delete(int $id): bool;

    public function getTotalPositionCount(): int;

    public function getPositionEmployeeCount(int $positionId): int;

    public function searchByTitle(string $title): Collection;

    public function getPositionsWithEmployeeCount(): Collection;
}
