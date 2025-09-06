<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Services;

use App\Modules\Employee\Application\Data\PositionData;
use App\Modules\Employee\Domain\Contracts\PositionRepositoryInterface;
use App\Modules\Employee\Infrastructure\Database\Models\Position;
use Illuminate\Database\Eloquent\Collection;

class PositionService
{
    public function __construct(
        protected PositionRepositoryInterface $positionRepository
    ) {}

    public function getAllPositions(): Collection
    {
        return $this->positionRepository->getAll();
    }

    public function getPositionById(int $id): ?Position
    {
        return $this->positionRepository->findById($id);
    }

    public function createPosition(PositionData $positionData): Position
    {
        $data = $positionData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->positionRepository->create($data);
    }

    public function updatePosition(int $id, PositionData $positionData): Position
    {
        $data = $positionData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->positionRepository->update($id, $data);
    }

    public function deletePosition(int $id): bool
    {
        return $this->positionRepository->delete($id);
    }

    public function getPositionsByDepartment(int $departmentId): Collection
    {
        return $this->positionRepository->getByDepartment($departmentId);
    }

    public function getPositionByTitle(string $title): ?Position
    {
        return $this->positionRepository->findByTitle($title);
    }

    public function getActivePositions(): Collection
    {
        return $this->positionRepository->getActive();
    }

    public function getInactivePositions(): Collection
    {
        return $this->positionRepository->getInactive();
    }

    public function getPositionsBySalaryRange(float $minSalary, float $maxSalary): Collection
    {
        return $this->positionRepository->getBySalaryRange($minSalary, $maxSalary);
    }

    public function getPositionsWithEmployeeCount(): Collection
    {
        return $this->positionRepository->getPositionsWithEmployeeCount();
    }

    public function getPositionEmployeeCount(int $positionId): int
    {
        return $this->positionRepository->getPositionEmployeeCount($positionId);
    }

    public function searchPositionsByTitle(string $title): Collection
    {
        return $this->positionRepository->searchByTitle($title);
    }

    public function getTotalPositionCount(): int
    {
        return $this->positionRepository->getTotalPositionCount();
    }

    public function getPositionsByLevel(string $level): Collection
    {
        return $this->positionRepository->getByLevel($level);
    }
}
