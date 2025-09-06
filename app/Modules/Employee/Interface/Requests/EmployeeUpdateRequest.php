<?php

declare(strict_types=1);

namespace App\Modules\Employee\Interface\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeUpdateRequest extends FormRequest
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
        $employeeId = $this->route()->parameter('id');

        return [
            'employee_id' => ['required', 'string', 'max:20', Rule::unique('employees', 'employee_id')->ignore($employeeId)],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255', Rule::unique('employees', 'email')->ignore($employeeId)],
            'phone' => ['nullable', 'string', 'max:20'],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'gender' => ['nullable', Rule::in(['male', 'female', 'other'])],
            'address' => ['nullable', 'string', 'max:500'],
            'hire_date' => ['required', 'date'],
            'department_id' => ['required', 'integer', 'exists:departments,id'],
            'position_id' => ['required', 'integer', 'exists:positions,id'],
            'salary' => ['required', 'numeric', 'min:0'],
            'status' => ['required', Rule::in(['active', 'inactive', 'terminated'])],
            'manager_id' => ['nullable', 'integer', 'exists:employees,id'],
            'emergency_contact_name' => ['nullable', 'string', 'max:100'],
            'emergency_contact_phone' => ['nullable', 'string', 'max:20'],
            'emergency_contact_relationship' => ['nullable', 'string', 'max:50'],
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
            'employee_id.required' => 'Employee ID is required.',
            'employee_id.unique' => 'This employee ID is already taken.',
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already registered.',
            'date_of_birth.before' => 'Date of birth must be before today.',
            'hire_date.required' => 'Hire date is required.',
            'department_id.required' => 'Department is required.',
            'department_id.exists' => 'Selected department does not exist.',
            'position_id.required' => 'Position is required.',
            'position_id.exists' => 'Selected position does not exist.',
            'salary.required' => 'Salary is required.',
            'salary.min' => 'Salary must be a positive number.',
            'status.required' => 'Employee status is required.',
            'manager_id.exists' => 'Selected manager does not exist.',
        ];
    }
}
