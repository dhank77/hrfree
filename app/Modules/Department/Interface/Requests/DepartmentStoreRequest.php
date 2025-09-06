<?php

declare(strict_types=1);

namespace App\Modules\Department\Interface\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DepartmentStoreRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100', 'unique:departments,name'],
            'code' => ['required', 'string', 'max:10', 'unique:departments,code'],
            'description' => ['nullable', 'string', 'max:500'],
            'manager_id' => ['nullable', 'integer', 'exists:employees,id'],
            'budget' => ['nullable', 'numeric', 'min:0'],
            'location' => ['nullable', 'string', 'max:255'],
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
            'name.required' => 'Department name is required.',
            'name.unique' => 'This department name already exists.',
            'code.required' => 'Department code is required.',
            'code.unique' => 'This department code already exists.',
            'manager_id.exists' => 'Selected manager does not exist.',
            'budget.min' => 'Budget must be a positive number.',
            'status.required' => 'Department status is required.',
        ];
    }
}
