<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Data;

class PerformanceReviewData
{
    public function __construct(
        public readonly ?int $id,
        public readonly int $employee_id,
        public readonly int $reviewer_id,
        public readonly string $review_period_start,
        public readonly string $review_period_end,
        public readonly ?int $overall_rating = null,
        public readonly ?string $goals = null,
        public readonly ?string $achievements = null,
        public readonly ?string $areas_for_improvement = null,
        public readonly ?string $comments = null,
        public readonly string $status = 'draft',
        public readonly ?string $completed_at = null,
        public readonly ?string $created_at = null,
        public readonly ?string $updated_at = null,
    ) {}

    public static function from(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            employee_id: $data['employee_id'],
            reviewer_id: $data['reviewer_id'],
            review_period_start: $data['review_period_start'],
            review_period_end: $data['review_period_end'],
            overall_rating: $data['overall_rating'] ?? null,
            goals: $data['goals'] ?? null,
            achievements: $data['achievements'] ?? null,
            areas_for_improvement: $data['areas_for_improvement'] ?? null,
            comments: $data['comments'] ?? null,
            status: $data['status'] ?? 'draft',
            completed_at: $data['completed_at'] ?? null,
            created_at: $data['created_at'] ?? null,
            updated_at: $data['updated_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'reviewer_id' => $this->reviewer_id,
            'review_period_start' => $this->review_period_start,
            'review_period_end' => $this->review_period_end,
            'overall_rating' => $this->overall_rating,
            'goals' => $this->goals,
            'achievements' => $this->achievements,
            'areas_for_improvement' => $this->areas_for_improvement,
            'comments' => $this->comments,
            'status' => $this->status,
            'completed_at' => $this->completed_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
