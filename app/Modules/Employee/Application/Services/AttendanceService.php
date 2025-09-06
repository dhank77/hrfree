<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Services;

use App\Modules\Employee\Application\Data\AttendanceData;
use App\Modules\Employee\Domain\Contracts\AttendanceRepositoryInterface;
use App\Modules\Employee\Infrastructure\Database\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class AttendanceService
{
    public function __construct(
        protected AttendanceRepositoryInterface $attendanceRepository
    ) {}

    public function getAllAttendance(): Collection
    {
        return $this->attendanceRepository->getAll();
    }

    public function getAttendanceById(int $id): ?Attendance
    {
        return $this->attendanceRepository->findById($id);
    }

    public function createAttendance(AttendanceData $attendanceData): Attendance
    {
        $data = $attendanceData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->attendanceRepository->create($data);
    }

    public function updateAttendance(int $id, AttendanceData $attendanceData): Attendance
    {
        $data = $attendanceData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->attendanceRepository->update($id, $data);
    }

    public function deleteAttendance(int $id): bool
    {
        return $this->attendanceRepository->delete($id);
    }

    public function getAttendanceByEmployee(int $employeeId): Collection
    {
        return $this->attendanceRepository->getByEmployee($employeeId);
    }

    public function getAttendanceByDateRange(int $employeeId, Carbon $startDate, Carbon $endDate): Collection
    {
        return $this->attendanceRepository->getByEmployeeAndDateRange($employeeId, $startDate, $endDate);
    }

    public function getAttendanceByEmployeeAndDate(int $employeeId, Carbon $date): ?Attendance
    {
        return $this->attendanceRepository->findByEmployeeAndDate($employeeId, $date);
    }

    public function getPresentEmployees(Carbon $date): Collection
    {
        return $this->attendanceRepository->getPresentEmployees($date);
    }

    public function getAbsentEmployees(Carbon $date): Collection
    {
        return $this->attendanceRepository->getAbsentEmployees($date);
    }

    public function getLateEmployees(Carbon $date): Collection
    {
        return $this->attendanceRepository->getLateEmployees($date);
    }

    public function clockIn(int $employeeId, ?Carbon $dateTime = null, ?array $location = null): Attendance
    {
        $dateTime = $dateTime ?? Carbon::now();

        return $this->attendanceRepository->clockIn($employeeId, $dateTime, $location);
    }

    public function clockOut(int $attendanceId, ?Carbon $dateTime = null, ?array $location = null): Attendance
    {
        $dateTime = $dateTime ?? Carbon::now();

        return $this->attendanceRepository->clockOut($attendanceId, $dateTime, $location);
    }

    public function getMonthlyAttendanceSummary(int $employeeId, int $year, int $month): array
    {
        return $this->attendanceRepository->getMonthlyAttendanceSummary($employeeId, $year, $month);
    }

    public function getTotalHoursByEmployee(int $employeeId, Carbon $startDate, Carbon $endDate): float
    {
        return $this->attendanceRepository->getTotalHoursByEmployee($employeeId, $startDate, $endDate);
    }

    public function getOvertimeHoursByEmployee(int $employeeId, Carbon $startDate, Carbon $endDate): float
    {
        return $this->attendanceRepository->getOvertimeHoursByEmployee($employeeId, $startDate, $endDate);
    }

    public function getAttendanceRate(int $employeeId, Carbon $startDate, Carbon $endDate): float
    {
        return $this->attendanceRepository->getAttendanceRate($employeeId, $startDate, $endDate);
    }

    public function getDailyAttendanceSummary(Carbon $date): array
    {
        return $this->attendanceRepository->getDailyAttendanceSummary($date);
    }
}
