<?php

declare(strict_types=1);

namespace App\Modules\Employee\Infrastructure\Database\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendance';

    protected $fillable = [
        'employee_id',
        'date',
        'clock_in',
        'clock_out',
        'break_start',
        'break_end',
        'total_hours',
        'overtime_hours',
        'status',
        'notes',
        'location',
        'clock_in_location',
        'clock_out_location',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'date' => 'date',
        'clock_in' => 'datetime:H:i',
        'clock_out' => 'datetime:H:i',
        'break_start' => 'datetime:H:i',
        'break_end' => 'datetime:H:i',
        'clock_in_location' => 'array',
        'clock_out_location' => 'array',
        'approved_at' => 'datetime',
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

    public function scopeByDateRange($query, Carbon $startDate, Carbon $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    public function scopePresent($query)
    {
        return $query->where('status', 'present');
    }

    public function getTotalHoursFormattedAttribute(): string
    {
        if (! $this->total_hours) {
            return '0h 0m';
        }

        $hours = intval($this->total_hours / 60);
        $minutes = $this->total_hours % 60;

        return "{$hours}h {$minutes}m";
    }

    public function getOvertimeHoursFormattedAttribute(): string
    {
        if (! $this->overtime_hours) {
            return '0h 0m';
        }

        $hours = intval($this->overtime_hours / 60);
        $minutes = $this->overtime_hours % 60;

        return "{$hours}h {$minutes}m";
    }

    public function getIsLateAttribute(): bool
    {
        return $this->status === 'late';
    }

    public function calculateTotalHours(): void
    {
        if ($this->clock_in && $this->clock_out) {
            $clockIn = Carbon::parse($this->clock_in);
            $clockOut = Carbon::parse($this->clock_out);

            $totalMinutes = $clockOut->diffInMinutes($clockIn);

            // Subtract break time if available
            if ($this->break_start && $this->break_end) {
                $breakStart = Carbon::parse($this->break_start);
                $breakEnd = Carbon::parse($this->break_end);
                $breakMinutes = $breakEnd->diffInMinutes($breakStart);
                $totalMinutes -= $breakMinutes;
            }

            $this->total_hours = $totalMinutes;

            // Calculate overtime (assuming 8 hours = 480 minutes is standard)
            $standardHours = 480;
            $this->overtime_hours = max(0, $totalMinutes - $standardHours);
        }
    }
}
