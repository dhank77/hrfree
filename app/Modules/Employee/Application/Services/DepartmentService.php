<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Services;

use App\Modules\Employee\Application\Data\DepartmentData;
use App\Modules\Employee\Domain\Contracts\DepartmentRepositoryInterface;
use App\Modules\Employee\Infrastructure\Database\Models\Department;
use Illuminate\Database\Eloquent\Collection;

class DepartmentService
{
    public function __construct(
        protected DepartmentRepositoryInterface $departmentRepository
    ) {}

    public function getAllDepartments(): Collection
    {
        return $this->departmentRepository->getAll();
    }

    public function getDepartmentById(int $id): ?Department
    {
        return $this->departmentRepository->findById($id);
    }

    public function createDepartment(DepartmentData $departmentData): Department
    {
        $data = $departmentData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->departmentRepository->create($data);
    }

    public function updateDepartment(int $id, DepartmentData $departmentData): Department
    {
        $data = $departmentData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->departmentRepository->update($id, $data);
    }

    public function deleteDepartment(int $id): bool
    {
        return $this->departmentRepository->delete($id);
    }

    public function getDepartmentByName(string $name): ?Department
    {
        return $this->departmentRepository->findByName($name);
    }

    public function getDepartmentEmployeeCount(int $id): int
    {
        return $this->departmentRepository->getDepartmentEmployeeCount($id);
    }

    public function getActiveDepartments(): Collection
    {
        return $this->departmentRepository->getActive();
    }

    public function getInactiveDepartments(): Collection
    {
        return $this->departmentRepository->getInactive();
    }

    public function getDepartmentsWithEmployeeCount(): Collection
    {
        return $this->departmentRepository->getWithEmployeeCount();
    }

    public function searchDepartmentsByName(string $name): Collection
    {
        return $this->departmentRepository->searchByName($name);
    }

    public function getTotalDepartmentCount(): int
    {
        return $this->departmentRepository->getTotalDepartmentCount();
    }
}
