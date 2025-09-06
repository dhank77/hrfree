<?php

declare(strict_types=1);

namespace App\Modules\Employee\Infrastructure\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'department_id',
        'min_salary',
        'max_salary',
        'level',
        'requirements',
        'responsibilities',
        'is_active',
    ];

    protected $casts = [
        'min_salary' => 'decimal:2',
        'max_salary' => 'decimal:2',
        'requirements' => 'array',
        'responsibilities' => 'array',
        'is_active' => 'boolean',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByLevel($query, string $level)
    {
        return $query->where('level', $level);
    }

    public function getSalaryRangeAttribute(): string
    {
        if ($this->min_salary && $this->max_salary) {
            return $this->min_salary.' - '.$this->max_salary;
        }

        return 'Not specified';
    }

    public function getEmployeeCountAttribute(): int
    {
        return $this->employees()->count();
    }
}
