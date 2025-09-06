<?php

declare(strict_types=1);

namespace App\Modules\Employee\Infrastructure\Database\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Leave extends Model
{
    use HasFactory;

    protected $table = 'leaves';

    protected $fillable = [
        'employee_id',
        'leave_type',
        'start_date',
        'end_date',
        'days_requested',
        'reason',
        'status',
        'approved_by',
        'approved_at',
        'approval_notes',
        'rejection_reason',
        'is_half_day',
        'half_day_period',
        'attachments',
        'applied_date',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'applied_date' => 'date',
        'approved_at' => 'datetime',
        'is_half_day' => 'boolean',
        'attachments' => 'array',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'approved_by');
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeByLeaveType($query, string $type)
    {
        return $query->where('leave_type', $type);
    }

    public function scopeByDateRange($query, Carbon $startDate, Carbon $endDate)
    {
        return $query->where(function ($q) use ($startDate, $endDate) {
            $q->whereBetween('start_date', [$startDate, $endDate])
                ->orWhereBetween('end_date', [$startDate, $endDate])
                ->orWhere(function ($q2) use ($startDate, $endDate) {
                    $q2->where('start_date', '<=', $startDate)
                        ->where('end_date', '>=', $endDate);
                });
        });
    }

    public function getLeaveTypeDisplayAttribute(): string
    {
        return match ($this->leave_type) {
            'annual' => 'Annual Leave',
            'sick' => 'Sick Leave',
            'maternity' => 'Maternity Leave',
            'paternity' => 'Paternity Leave',
            'emergency' => 'Emergency Leave',
            'unpaid' => 'Unpaid Leave',
            'compensatory' => 'Compensatory Leave',
            default => ucfirst($this->leave_type)
        };
    }

    public function getStatusDisplayAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'Pending Approval',
            'approved' => 'Approved',
            'rejected' => 'Rejected',
            'cancelled' => 'Cancelled',
            default => ucfirst($this->status)
        };
    }

    public function getDurationAttribute(): string
    {
        if ($this->is_half_day) {
            return "Half Day ({$this->half_day_period})";
        }

        if ($this->days_requested == 1) {
            return '1 Day';
        }

        return "{$this->days_requested} Days";
    }

    public function getIsCurrentAttribute(): bool
    {
        $today = Carbon::today();

        return $this->start_date <= $today && $this->end_date >= $today && $this->status === 'approved';
    }

    public function getIsUpcomingAttribute(): bool
    {
        return $this->start_date > Carbon::today() && $this->status === 'approved';
    }

    public function calculateDays(): void
    {
        if ($this->start_date && $this->end_date) {
            $startDate = Carbon::parse($this->start_date);
            $endDate = Carbon::parse($this->end_date);

            if ($this->is_half_day) {
                $this->days_requested = 0.5;
            } else {
                $this->days_requested = $startDate->diffInDays($endDate) + 1;
            }
        }
    }
}
