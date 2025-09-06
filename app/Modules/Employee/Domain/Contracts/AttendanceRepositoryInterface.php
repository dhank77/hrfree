<?php

declare(strict_types=1);

namespace App\Modules\Employee\Domain\Contracts;

use App\Modules\Employee\Infrastructure\Database\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface AttendanceRepositoryInterface
{
    public function findById(int $id): ?Attendance;

    public function findByEmployeeAndDate(int $employeeId, Carbon $date): ?Attendance;

    public function getAll(): Collection;

    public function getPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function getByEmployee(int $employeeId): Collection;

    public function getByEmployeeAndDateRange(int $employeeId, Carbon $startDate, Carbon $endDate): Collection;

    public function getByDateRange(Carbon $startDate, Carbon $endDate): Collection;

    public function getByStatus(string $status): Collection;

    public function getPresentEmployees(Carbon $date): Collection;

    public function getAbsentEmployees(Carbon $date): Collection;

    public function getLateEmployees(Carbon $date): Collection;

    public function create(array $data): Attendance;

    public function update(int $id, array $data): Attendance;

    public function delete(int $id): bool;

    public function clockIn(int $employeeId, Carbon $dateTime, ?array $location = null): Attendance;

    public function clockOut(int $attendanceId, Carbon $dateTime, ?array $location = null): Attendance;

    public function getTotalHoursByEmployee(int $employeeId, Carbon $startDate, Carbon $endDate): float;

    public function getOvertimeHoursByEmployee(int $employeeId, Carbon $startDate, Carbon $endDate): float;

    public function getAttendanceRate(int $employeeId, Carbon $startDate, Carbon $endDate): float;

    public function getDailyAttendanceSummary(Carbon $date): array;

    public function getMonthlyAttendanceSummary(int $employeeId, int $year, int $month): array;
}
