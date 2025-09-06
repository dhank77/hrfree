<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Services;

use App\Modules\Employee\Application\Data\EmployeeData;
use App\Modules\Employee\Domain\Contracts\EmployeeRepositoryInterface;
use App\Modules\Employee\Infrastructure\Database\Models\Employee;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class EmployeeService
{
    public function __construct(
        protected EmployeeRepositoryInterface $employeeRepository
    ) {}

    public function getAllEmployees(): Collection
    {
        return $this->employeeRepository->getAll();
    }

    public function getPaginatedEmployees(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        return $this->employeeRepository->getPaginated($perPage, $filters);
    }

    public function getEmployeeById(int $id): ?Employee
    {
        return $this->employeeRepository->findById($id);
    }

    public function createEmployee(EmployeeData $employeeData): Employee
    {
        $data = $employeeData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->employeeRepository->create($data);
    }

    public function updateEmployee(int $id, EmployeeData $employeeData): ?Employee
    {
        $data = $employeeData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->employeeRepository->update($id, $data);
    }

    public function deleteEmployee(int $id): bool
    {
        return $this->employeeRepository->delete($id);
    }

    public function getEmployeesByDepartment(int $departmentId): Collection
    {
        return $this->employeeRepository->getByDepartment($departmentId);
    }

    public function getEmployeesByPosition(int $positionId): Collection
    {
        return $this->employeeRepository->getByPosition($positionId);
    }

    public function searchEmployeesByName(string $name): Collection
    {
        return $this->employeeRepository->searchByName($name);
    }

    public function getEmployeeByEmail(string $email): ?Employee
    {
        return $this->employeeRepository->findByEmail($email);
    }

    public function getEmployeeByEmployeeId(string $employeeId): ?Employee
    {
        return $this->employeeRepository->findByEmployeeId($employeeId);
    }

    public function getActiveEmployees(): Collection
    {
        return $this->employeeRepository->getActiveEmployees();
    }

    public function getInactiveEmployees(): Collection
    {
        return $this->employeeRepository->getInactiveEmployees();
    }

    public function getEmployeesByStatus(string $status): Collection
    {
        return $this->employeeRepository->getByStatus($status);
    }

    public function getTotalEmployeeCount(): int
    {
        return $this->employeeRepository->getTotalEmployeeCount();
    }
}
