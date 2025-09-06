<?php

declare(strict_types=1);

namespace App\Modules\Position\Interface\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PositionStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:10', 'unique:positions,code'],
            'description' => ['nullable', 'string', 'max:1000'],
            'department_id' => ['required', 'integer', 'exists:departments,id'],
            'level' => ['required', Rule::in(['entry', 'junior', 'mid', 'senior', 'lead', 'manager', 'director', 'executive'])],
            'min_salary' => ['nullable', 'numeric', 'min:0'],
            'max_salary' => ['nullable', 'numeric', 'min:0', 'gte:min_salary'],
            'requirements' => ['nullable', 'string', 'max:2000'],
            'responsibilities' => ['nullable', 'string', 'max:2000'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Position title is required.',
            'code.required' => 'Position code is required.',
            'code.unique' => 'This position code already exists.',
            'department_id.required' => 'Department is required.',
            'department_id.exists' => 'Selected department does not exist.',
            'level.required' => 'Position level is required.',
            'min_salary.min' => 'Minimum salary must be a positive number.',
            'max_salary.min' => 'Maximum salary must be a positive number.',
            'max_salary.gte' => 'Maximum salary must be greater than or equal to minimum salary.',
            'status.required' => 'Position status is required.',
        ];
    }
}
