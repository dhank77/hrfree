<?php

declare(strict_types=1);

namespace App\Modules\Employee\Infrastructure\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'manager_id',
        'location',
        'budget',
        'is_active',
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function manager(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'manager_id');
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function positions(): HasMany
    {
        return $this->hasMany(Position::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getEmployeeCountAttribute(): int
    {
        return $this->employees()->count();
    }

    public function getTotalSalaryBudgetAttribute(): float
    {
        return $this->employees()->sum('salary') ?? 0.0;
    }
}
