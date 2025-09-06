<?php

declare(strict_types=1);

namespace App\Modules\Employee\Infrastructure\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PerformanceReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'reviewer_id',
        'review_period',
        'review_date',
        'review_type',
        'overall_rating',
        'goals_achievements',
        'strengths',
        'areas_for_improvement',
        'development_plan',
        'reviewer_comments',
        'employee_comments',
        'status',
        'due_date',
        'completed_at',
    ];

    protected $casts = [
        'review_date' => 'date',
        'due_date' => 'date',
        'completed_at' => 'datetime',
        'goals_achievements' => 'array',
        'strengths' => 'array',
        'areas_for_improvement' => 'array',
        'development_plan' => 'array',
        'overall_rating' => 'integer',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'reviewer_id');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopePending($query)
    {
        return $query->whereIn('status', ['draft', 'pending_employee', 'pending_manager']);
    }

    public function scopeByReviewType($query, string $type)
    {
        return $query->where('review_type', $type);
    }

    public function getIsOverdueAttribute(): bool
    {
        return $this->due_date && $this->due_date->isPast() && $this->status !== 'completed';
    }

    public function getRatingDescriptionAttribute(): string
    {
        return match ($this->overall_rating) {
            1 => 'Needs Improvement',
            2 => 'Below Expectations',
            3 => 'Meets Expectations',
            4 => 'Exceeds Expectations',
            5 => 'Outstanding',
            default => 'Not Rated'
        };
    }
}
