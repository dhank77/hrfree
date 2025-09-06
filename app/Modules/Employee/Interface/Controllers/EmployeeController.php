<?php

declare(strict_types=1);

namespace App\Modules\Employee\Interface\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Employee\Application\Data\EmployeeData;
use App\Modules\Employee\Application\Services\EmployeeService;
use App\Modules\Employee\Interface\Requests\EmployeeStoreRequest;
use App\Modules\Employee\Interface\Requests\EmployeeUpdateRequest;
use App\Modules\Employee\Interface\Resources\EmployeeResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function __construct(
        protected EmployeeService $employeeService
    ) {}

    /**
     * Display a listing of employees.
     */
    public function index(Request $request): Response|JsonResponse
    {
        $perPage = (int) $request->get('per_page', 15);
        $filters = $request->only(['department_id', 'position_id', 'status', 'search']);

        $employees = $this->employeeService->getPaginatedEmployees($perPage, $filters);

        if ($request->wantsJson()) {
            return response()->json([
                'data' => EmployeeResource::collection($employees->items()),
                'meta' => [
                    'current_page' => $employees->currentPage(),
                    'last_page' => $employees->lastPage(),
                    'per_page' => $employees->perPage(),
                    'total' => $employees->total(),
                ],
            ]);
        }

        return Inertia::render('Employee/index', [
            'employees' => EmployeeResource::collection($employees->items()),
            'meta' => [
                'current_page' => $employees->currentPage(),
                'last_page' => $employees->lastPage(),
                'per_page' => $employees->perPage(),
                'total' => $employees->total(),
            ],
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create(): Response
    {
        return Inertia::render('Employee/create');
    }

    /**
     * Store a newly created employee.
     */
    public function store(EmployeeStoreRequest $request): JsonResponse
    {
        $employeeData = EmployeeData::from($request->validated());
        $employee = $this->employeeService->createEmployee($employeeData);

        return response()->json([
            'message' => 'Employee created successfully.',
            'data' => new EmployeeResource($employee),
        ], 201);
    }

    /**
     * Display the specified employee.
     */
    public function show(int $id, Request $request): Response|JsonResponse
    {
        $employee = $this->employeeService->getEmployeeById($id);

        if (! $employee) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Employee not found.'], 404);
            }
            abort(404);
        }

        if ($request->wantsJson()) {
            return response()->json([
                'data' => new EmployeeResource($employee),
            ]);
        }

        return Inertia::render('Employee/show', [
            'employee' => new EmployeeResource($employee),
        ]);
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(int $id): Response
    {
        $employee = $this->employeeService->getEmployeeById($id);

        if (! $employee) {
            abort(404);
        }

        return Inertia::render('Employee/edit', [
            'employee' => new EmployeeResource($employee),
        ]);
    }

    /**
     * Update the specified employee.
     */
    public function update(EmployeeUpdateRequest $request, int $id): JsonResponse
    {
        $employee = $this->employeeService->getEmployeeById($id);

        if (! $employee) {
            return response()->json(['message' => 'Employee not found.'], 404);
        }

        $employeeData = EmployeeData::from($request->validated());
        $updatedEmployee = $this->employeeService->updateEmployee($id, $employeeData);

        return response()->json([
            'message' => 'Employee updated successfully.',
            'data' => new EmployeeResource($updatedEmployee),
        ]);
    }

    /**
     * Remove the specified employee.
     */
    public function destroy(int $id): JsonResponse
    {
        $employee = $this->employeeService->getEmployeeById($id);

        if (! $employee) {
            return response()->json(['message' => 'Employee not found.'], 404);
        }

        $this->employeeService->deleteEmployee($id);

        return response()->json([
            'message' => 'Employee deleted successfully.',
        ]);
    }

    /**
     * Get employees by department.
     */
    public function byDepartment(int $departmentId): JsonResponse
    {
        $employees = $this->employeeService->getEmployeesByDepartment($departmentId);

        return response()->json([
            'data' => EmployeeResource::collection($employees),
        ]);
    }

    /**
     * Get employees by position.
     */
    public function byPosition(int $positionId): JsonResponse
    {
        $employees = $this->employeeService->getEmployeesByPosition($positionId);

        return response()->json([
            'data' => EmployeeResource::collection($employees),
        ]);
    }

    /**
     * Search employees by name.
     */
    public function search(Request $request): JsonResponse
    {
        $request->validate([
            'query' => ['required', 'string', 'min:2'],
        ]);

        $employees = $this->employeeService->searchEmployeesByName($request->get('query'));

        return response()->json([
            'data' => EmployeeResource::collection($employees),
        ]);
    }

    /**
     * Get active employees.
     */
    public function active(): JsonResponse
    {
        $employees = $this->employeeService->getActiveEmployees();

        return response()->json([
            'data' => EmployeeResource::collection($employees),
        ]);
    }

    /**
     * Get inactive employees.
     */
    public function inactive(): JsonResponse
    {
        $employees = $this->employeeService->getInactiveEmployees();

        return response()->json([
            'data' => EmployeeResource::collection($employees),
        ]);
    }
}
