<?php

declare(strict_types=1);

namespace App\Modules\Employee\Application\Data;

class EmployeeData
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly string $email,
        public readonly ?string $phone = null,
        public readonly ?string $address = null,
        public readonly ?int $department_id = null,
        public readonly ?int $position_id = null,
        public readonly ?string $hire_date = null,
        public readonly ?float $salary = null,
        public readonly ?string $created_at = null,
        public readonly ?string $updated_at = null,
    ) {}

    public static function from(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            name: $data['name'],
            email: $data['email'],
            phone: $data['phone'] ?? null,
            address: $data['address'] ?? null,
            department_id: $data['department_id'] ?? null,
            position_id: $data['position_id'] ?? null,
            hire_date: $data['hire_date'] ?? null,
            salary: $data['salary'] ?? null,
            created_at: $data['created_at'] ?? null,
            updated_at: $data['updated_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'department_id' => $this->department_id,
            'position_id' => $this->position_id,
            'hire_date' => $this->hire_date,
            'salary' => $this->salary,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
