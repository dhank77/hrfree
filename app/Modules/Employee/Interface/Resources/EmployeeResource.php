<?php

declare(strict_types=1);

namespace App\Modules\Employee\Interface\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->first_name.' '.$this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'date_of_birth' => $this->date_of_birth?->format('Y-m-d'),
            'gender' => $this->gender,
            'address' => $this->address,
            'hire_date' => $this->hire_date?->format('Y-m-d'),
            'department_id' => $this->department_id,
            'position_id' => $this->position_id,
            'salary' => $this->salary,
            'status' => $this->status,
            'manager_id' => $this->manager_id,
            'emergency_contact_name' => $this->emergency_contact_name,
            'emergency_contact_phone' => $this->emergency_contact_phone,
            'emergency_contact_relationship' => $this->emergency_contact_relationship,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),

            // Relationships
            'department' => $this->whenLoaded('department', function () {
                return [
                    'id' => $this->department->id,
                    'name' => $this->department->name,
                    'code' => $this->department->code,
                ];
            }),

            'position' => $this->whenLoaded('position', function () {
                return [
                    'id' => $this->position->id,
                    'title' => $this->position->title,
                    'level' => $this->position->level,
                ];
            }),

            'manager' => $this->whenLoaded('manager', function () {
                return [
                    'id' => $this->manager->id,
                    'employee_id' => $this->manager->employee_id,
                    'first_name' => $this->manager->first_name,
                    'last_name' => $this->manager->last_name,
                    'full_name' => $this->manager->first_name.' '.$this->manager->last_name,
                ];
            }),
        ];
    }
}
