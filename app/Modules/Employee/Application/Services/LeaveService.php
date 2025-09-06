<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Services;

use App\Modules\Employee\Application\Data\LeaveData;
use App\Modules\Employee\Domain\Contracts\LeaveRepositoryInterface;
use App\Modules\Employee\Infrastructure\Database\Models\Leave;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class LeaveService
{
    public function __construct(
        protected LeaveRepositoryInterface $leaveRepository
    ) {}

    public function getAllLeaves(): Collection
    {
        return $this->leaveRepository->getAll();
    }

    public function getLeaveById(int $id): ?Leave
    {
        return $this->leaveRepository->findById($id);
    }

    public function createLeave(LeaveData $leaveData): Leave
    {
        $data = $leaveData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->leaveRepository->create($data);
    }

    public function updateLeave(int $id, LeaveData $leaveData): Leave
    {
        $data = $leaveData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->leaveRepository->update($id, $data);
    }

    public function deleteLeave(int $id): bool
    {
        return $this->leaveRepository->delete($id);
    }

    public function getLeavesByEmployee(int $employeeId): Collection
    {
        return $this->leaveRepository->getByEmployee($employeeId);
    }

    public function getLeavesByStatus(string $status): Collection
    {
        return $this->leaveRepository->getByStatus($status);
    }

    public function getLeavesByType(string $leaveType): Collection
    {
        return $this->leaveRepository->getByLeaveType($leaveType);
    }

    public function getLeavesByDateRange(Carbon $startDate, Carbon $endDate): Collection
    {
        return $this->leaveRepository->getByDateRange($startDate, $endDate);
    }

    public function getLeavesByEmployeeAndDateRange(int $employeeId, Carbon $startDate, Carbon $endDate): Collection
    {
        return $this->leaveRepository->getByEmployeeAndDateRange($employeeId, $startDate, $endDate);
    }

    public function getPendingLeaves(): Collection
    {
        return $this->leaveRepository->getPendingLeaves();
    }

    public function getApprovedLeaves(): Collection
    {
        return $this->leaveRepository->getApprovedLeaves();
    }

    public function getCurrentLeaves(): Collection
    {
        return $this->leaveRepository->getCurrentLeaves();
    }

    public function approveLeave(int $id, int $approverId, ?string $notes = null): Leave
    {
        return $this->leaveRepository->approve($id, $approverId, $notes);
    }

    public function rejectLeave(int $id, int $approverId, string $reason): Leave
    {
        return $this->leaveRepository->reject($id, $approverId, $reason);
    }

    public function cancelLeave(int $id): Leave
    {
        return $this->leaveRepository->cancel($id);
    }

    public function getLeaveBalance(int $employeeId, string $leaveType, int $year): array
    {
        return $this->leaveRepository->getLeaveBalance($employeeId, $leaveType, $year);
    }

    public function getTotalLeaveDays(int $employeeId, string $leaveType, int $year): float
    {
        return $this->leaveRepository->getTotalLeaveDays($employeeId, $leaveType, $year);
    }

    public function getUsedLeaveDays(int $employeeId, string $leaveType, int $year): float
    {
        return $this->leaveRepository->getUsedLeaveDays($employeeId, $leaveType, $year);
    }

    public function getRemainingLeaveDays(int $employeeId, string $leaveType, int $year): float
    {
        return $this->leaveRepository->getRemainingLeaveDays($employeeId, $leaveType, $year);
    }

    public function hasConflictingLeave(int $employeeId, Carbon $startDate, Carbon $endDate, ?int $excludeId = null): bool
    {
        return $this->leaveRepository->hasConflictingLeave($employeeId, $startDate, $endDate, $excludeId);
    }

    public function getLeaveCalendar(Carbon $startDate, Carbon $endDate): Collection
    {
        return $this->leaveRepository->getLeaveCalendar($startDate, $endDate);
    }

    public function getLeaveStatistics(int $year): array
    {
        return $this->leaveRepository->getLeaveStatistics($year);
    }

    public function getUpcomingLeaves(int $days = 30): Collection
    {
        return $this->leaveRepository->getUpcomingLeaves($days);
    }
}
