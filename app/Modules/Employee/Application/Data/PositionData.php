<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Data;

class PositionData
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $title,
        public readonly ?string $description = null,
        public readonly ?int $department_id = null,
        public readonly ?float $min_salary = null,
        public readonly ?float $max_salary = null,
        public readonly ?string $created_at = null,
        public readonly ?string $updated_at = null,
    ) {}

    public static function from(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            title: $data['title'],
            description: $data['description'] ?? null,
            department_id: $data['department_id'] ?? null,
            min_salary: $data['min_salary'] ?? null,
            max_salary: $data['max_salary'] ?? null,
            created_at: $data['created_at'] ?? null,
            updated_at: $data['updated_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'department_id' => $this->department_id,
            'min_salary' => $this->min_salary,
            'max_salary' => $this->max_salary,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
