<?php

declare(strict_types=1);

namespace App\Modules\Employee\Domain\Contracts;

use App\Modules\Employee\Infrastructure\Database\Models\Leave;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface LeaveRepositoryInterface
{
    public function findById(int $id): ?Leave;

    public function getAll(): Collection;

    public function getPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function getByEmployee(int $employeeId): Collection;

    public function getByStatus(string $status): Collection;

    public function getByLeaveType(string $leaveType): Collection;

    public function getPendingLeaves(): Collection;

    public function getApprovedLeaves(): Collection;

    public function getByDateRange(Carbon $startDate, Carbon $endDate): Collection;

    public function getByEmployeeAndDateRange(int $employeeId, Carbon $startDate, Carbon $endDate): Collection;

    public function getCurrentLeaves(): Collection;

    public function getUpcomingLeaves(int $days = 30): Collection;

    public function create(array $data): Leave;

    public function update(int $id, array $data): Leave;

    public function delete(int $id): bool;

    public function approve(int $id, int $approverId, ?string $notes = null): Leave;

    public function reject(int $id, int $approverId, string $reason): Leave;

    public function cancel(int $id): Leave;

    public function getLeaveBalance(int $employeeId, string $leaveType, int $year): array;

    public function getTotalLeaveDays(int $employeeId, string $leaveType, int $year): float;

    public function getUsedLeaveDays(int $employeeId, string $leaveType, int $year): float;

    public function getRemainingLeaveDays(int $employeeId, string $leaveType, int $year): float;

    public function hasConflictingLeave(int $employeeId, Carbon $startDate, Carbon $endDate, ?int $excludeId = null): bool;

    public function getLeaveCalendar(Carbon $startDate, Carbon $endDate): Collection;

    public function getLeaveStatistics(int $year): array;
}
