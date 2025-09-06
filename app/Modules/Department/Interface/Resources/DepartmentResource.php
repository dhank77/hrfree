<?php

declare(strict_types=1);

namespace App\Modules\Department\Interface\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
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
            'name' => $this->name,
            'code' => $this->code,
            'description' => $this->description,
            'manager_id' => $this->manager_id,
            'budget' => $this->budget,
            'location' => $this->location,
            'status' => $this->status,
            'employee_count' => $this->whenLoaded('employees', fn () => $this->employees->count()),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),

            // Relationships
            'manager' => $this->whenLoaded('manager', function () {
                return [
                    'id' => $this->manager->id,
                    'first_name' => $this->manager->first_name,
                    'last_name' => $this->manager->last_name,
                    'email' => $this->manager->email,
                ];
            }),
            'employees' => $this->whenLoaded('employees'),
            'positions' => $this->whenLoaded('positions'),
        ];
    }
}
