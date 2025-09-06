<?php

declare(strict_types=1);

namespace App\Modules\Employee\Domain\Contracts;

use App\Modules\Employee\Infrastructure\Database\Models\Employee;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface EmployeeRepositoryInterface
{
    public function findById(int $id): ?Employee;

    public function findByEmployeeId(string $employeeId): ?Employee;

    public function findByEmail(string $email): ?Employee;

    public function getAll(): Collection;

    public function getPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function getByDepartment(int $departmentId): Collection;

    public function getByPosition(int $positionId): Collection;

    public function getByManager(int $managerId): Collection;

    public function getActiveEmployees(): Collection;

    public function getInactiveEmployees(): Collection;

    public function getByStatus(string $status): Collection;

    public function searchByName(string $name): Collection;

    public function create(array $data): Employee;

    public function update(int $id, array $data): Employee;

    public function delete(int $id): bool;

    public function getEmployeesHiredBetween(\DateTime $startDate, \DateTime $endDate): Collection;

    public function getEmployeesWithUpcomingBirthdays(int $days = 30): Collection;

    public function getEmployeesWithUpcomingWorkAnniversaries(int $days = 30): Collection;

    public function getTotalEmployeeCount(): int;

    public function getEmployeeCountByDepartment(): array;

    public function getEmployeeCountByStatus(): array;
}
