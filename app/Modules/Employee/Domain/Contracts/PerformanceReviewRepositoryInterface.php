<?php

declare(strict_types=1);

namespace App\Modules\Employee\Domain\Contracts;

use App\Modules\Employee\Infrastructure\Database\Models\PerformanceReview;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface PerformanceReviewRepositoryInterface
{
    public function findById(int $id): ?PerformanceReview;

    public function getAll(): Collection;

    public function getPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function getByEmployee(int $employeeId): Collection;

    public function getByReviewer(int $reviewerId): Collection;

    public function getByStatus(string $status): Collection;

    public function getByReviewType(string $reviewType): Collection;

    public function getPendingReviews(): Collection;

    public function getCompletedReviews(): Collection;

    public function getOverdueReviews(): Collection;

    public function getByReviewPeriod(string $reviewPeriod): Collection;

    public function getByDateRange(Carbon $startDate, Carbon $endDate): Collection;

    public function create(array $data): PerformanceReview;

    public function update(int $id, array $data): PerformanceReview;

    public function delete(int $id): bool;

    public function complete(int $id): PerformanceReview;

    public function getLatestReviewByEmployee(int $employeeId): ?PerformanceReview;

    public function getReviewHistory(int $employeeId): Collection;

    public function getAverageRatingByEmployee(int $employeeId): ?float;

    public function getAverageRatingByDepartment(int $departmentId): ?float;

    public function getReviewStatistics(int $year): array;

    public function getUpcomingReviews(int $days = 30): Collection;

    public function getDueReviews(): Collection;

    public function getReviewsByRatingRange(int $minRating, int $maxRating): Collection;
}
