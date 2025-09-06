<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Data;

class AttendanceData
{
    public function __construct(
        public readonly ?int $id,
        public readonly int $employee_id,
        public readonly string $date,
        public readonly ?string $check_in = null,
        public readonly ?string $check_out = null,
        public readonly ?int $hours_worked = null,
        public readonly string $status = 'present',
        public readonly ?string $notes = null,
        public readonly ?string $created_at = null,
        public readonly ?string $updated_at = null,
    ) {}

    public static function from(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            employee_id: $data['employee_id'],
            date: $data['date'],
            check_in: $data['check_in'] ?? null,
            check_out: $data['check_out'] ?? null,
            hours_worked: $data['hours_worked'] ?? null,
            status: $data['status'] ?? 'present',
            notes: $data['notes'] ?? null,
            created_at: $data['created_at'] ?? null,
            updated_at: $data['updated_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'date' => $this->date,
            'check_in' => $this->check_in,
            'check_out' => $this->check_out,
            'hours_worked' => $this->hours_worked,
            'status' => $this->status,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
