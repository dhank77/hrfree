<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Data;

class LeaveData
{
    public function __construct(
        public readonly ?int $id,
        public readonly int $employee_id,
        public readonly string $type,
        public readonly string $start_date,
        public readonly string $end_date,
        public readonly int $days_requested,
        public readonly string $reason,
        public readonly string $status = 'pending',
        public readonly ?string $approved_by = null,
        public readonly ?string $approved_at = null,
        public readonly ?string $comments = null,
        public readonly ?string $created_at = null,
        public readonly ?string $updated_at = null,
    ) {}

    public static function from(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            employee_id: $data['employee_id'],
            type: $data['type'],
            start_date: $data['start_date'],
            end_date: $data['end_date'],
            days_requested: $data['days_requested'],
            reason: $data['reason'],
            status: $data['status'] ?? 'pending',
            approved_by: $data['approved_by'] ?? null,
            approved_at: $data['approved_at'] ?? null,
            comments: $data['comments'] ?? null,
            created_at: $data['created_at'] ?? null,
            updated_at: $data['updated_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'type' => $this->type,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'days_requested' => $this->days_requested,
            'reason' => $this->reason,
            'status' => $this->status,
            'approved_by' => $this->approved_by,
            'approved_at' => $this->approved_at,
            'comments' => $this->comments,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
