<?php

declare(strict_types=1);

namespace App\Modules\Position\Interface\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PositionResource extends JsonResource
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
            'title' => $this->title,
            'code' => $this->code,
            'description' => $this->description,
            'department_id' => $this->department_id,
            'level' => $this->level,
            'min_salary' => $this->min_salary,
            'max_salary' => $this->max_salary,
            'requirements' => $this->requirements,
            'responsibilities' => $this->responsibilities,
            'status' => $this->status,
            'employee_count' => $this->whenLoaded('employees', fn () => $this->employees->count()),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),

            // Relationships
            'department' => $this->whenLoaded('department', function () {
                return [
                    'id' => $this->department->id,
                    'name' => $this->department->name,
                    'code' => $this->department->code,
                ];
            }),
            'employees' => $this->whenLoaded('employees'),
        ];
    }
}
