<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Services;

use App\Modules\Employee\Application\Data\PerformanceReviewData;
use App\Modules\Employee\Domain\Contracts\PerformanceReviewRepositoryInterface;
use App\Modules\Employee\Infrastructure\Database\Models\PerformanceReview;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class PerformanceReviewService
{
    public function __construct(
        protected PerformanceReviewRepositoryInterface $performanceReviewRepository
    ) {}

    public function getAllPerformanceReviews(): Collection
    {
        return $this->performanceReviewRepository->getAll();
    }

    public function getPerformanceReviewById(int $id): ?PerformanceReview
    {
        return $this->performanceReviewRepository->findById($id);
    }

    public function createPerformanceReview(PerformanceReviewData $performanceReviewData): PerformanceReview
    {
        $data = $performanceReviewData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->performanceReviewRepository->create($data);
    }

    public function updatePerformanceReview(int $id, PerformanceReviewData $performanceReviewData): PerformanceReview
    {
        $data = $performanceReviewData->toArray();
        unset($data['id'], $data['created_at'], $data['updated_at']);

        return $this->performanceReviewRepository->update($id, $data);
    }

    public function deletePerformanceReview(int $id): bool
    {
        return $this->performanceReviewRepository->delete($id);
    }

    public function getPerformanceReviewsByEmployee(int $employeeId): Collection
    {
        return $this->performanceReviewRepository->getByEmployee($employeeId);
    }

    public function getPerformanceReviewsByReviewer(int $reviewerId): Collection
    {
        return $this->performanceReviewRepository->getByReviewer($reviewerId);
    }

    public function getPerformanceReviewsByDateRange(Carbon $startDate, Carbon $endDate): Collection
    {
        return $this->performanceReviewRepository->getByDateRange($startDate, $endDate);
    }

    public function getPerformanceReviewsByReviewPeriod(string $reviewPeriod): Collection
    {
        return $this->performanceReviewRepository->getByReviewPeriod($reviewPeriod);
    }

    public function getPerformanceReviewsByReviewType(string $reviewType): Collection
    {
        return $this->performanceReviewRepository->getByReviewType($reviewType);
    }

    public function getPerformanceReviewsByStatus(string $status): Collection
    {
        return $this->performanceReviewRepository->getByStatus($status);
    }

    public function getPendingPerformanceReviews(): Collection
    {
        return $this->performanceReviewRepository->getPendingReviews();
    }

    public function getCompletedPerformanceReviews(): Collection
    {
        return $this->performanceReviewRepository->getCompletedReviews();
    }

    public function getOverduePerformanceReviews(): Collection
    {
        return $this->performanceReviewRepository->getOverdueReviews();
    }

    public function getDueReviews(): Collection
    {
        return $this->performanceReviewRepository->getDueReviews();
    }

    public function getAverageRatingByEmployee(int $employeeId): ?float
    {
        return $this->performanceReviewRepository->getAverageRatingByEmployee($employeeId);
    }

    public function getAverageRatingByDepartment(int $departmentId): ?float
    {
        return $this->performanceReviewRepository->getAverageRatingByDepartment($departmentId);
    }

    public function getReviewHistory(int $employeeId): Collection
    {
        return $this->performanceReviewRepository->getReviewHistory($employeeId);
    }

    public function getLatestReviewByEmployee(int $employeeId): ?PerformanceReview
    {
        return $this->performanceReviewRepository->getLatestReviewByEmployee($employeeId);
    }

    public function getReviewStatistics(int $year): array
    {
        return $this->performanceReviewRepository->getReviewStatistics($year);
    }

    public function completeReview(int $id): PerformanceReview
    {
        return $this->performanceReviewRepository->complete($id);
    }

    public function getReviewsByRatingRange(int $minRating, int $maxRating): Collection
    {
        return $this->performanceReviewRepository->getReviewsByRatingRange($minRating, $maxRating);
    }

    public function getUpcomingReviews(int $days = 30): Collection
    {
        return $this->performanceReviewRepository->getUpcomingReviews($days);
    }
}
