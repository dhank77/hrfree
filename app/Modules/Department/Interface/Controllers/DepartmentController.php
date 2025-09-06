<?php

declare(strict_types=1);

namespace App\Modules\Department\Interface\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Department\Application\Data\DepartmentData;
use App\Modules\Department\Application\Services\DepartmentService;
use App\Modules\Department\Interface\Requests\DepartmentStoreRequest;
use App\Modules\Department\Interface\Requests\DepartmentUpdateRequest;
use App\Modules\Department\Interface\Resources\DepartmentResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function __construct(
        protected DepartmentService $departmentService
    ) {}

    /**
     * Display a listing of departments.
     */
    public function index(Request $request): Response|JsonResponse
    {
        $perPage = (int) $request->get('per_page', 15);
        $filters = $request->only(['status', 'search']);

        $departments = $this->departmentService->getPaginatedDepartments($perPage, $filters);

        if ($request->wantsJson()) {
            return response()->json([
                'data' => DepartmentResource::collection($departments->items()),
                'meta' => [
                    'current_page' => $departments->currentPage(),
                    'last_page' => $departments->lastPage(),
                    'per_page' => $departments->perPage(),
                    'total' => $departments->total(),
                ],
            ]);
        }

        return Inertia::render('departments/index', [
            'departments' => DepartmentResource::collection($departments->items()),
            'meta' => [
                'current_page' => $departments->currentPage(),
                'last_page' => $departments->lastPage(),
                'per_page' => $departments->perPage(),
                'total' => $departments->total(),
            ],
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new department.
     */
    public function create(): Response
    {
        return Inertia::render('departments/create');
    }

    /**
     * Store a newly created department.
     */
    public function store(DepartmentStoreRequest $request): JsonResponse
    {
        $departmentData = DepartmentData::from($request->validated());
        $department = $this->departmentService->createDepartment($departmentData);

        return response()->json([
            'message' => 'Department created successfully.',
            'data' => new DepartmentResource($department),
        ], 201);
    }

    /**
     * Display the specified department.
     */
    public function show(int $id, Request $request): Response|JsonResponse
    {
        $department = $this->departmentService->getDepartmentById($id);

        if (! $department) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Department not found.'], 404);
            }
            abort(404);
        }

        if ($request->wantsJson()) {
            return response()->json([
                'data' => new DepartmentResource($department),
            ]);
        }

        return Inertia::render('departments/show', [
            'department' => new DepartmentResource($department),
        ]);
    }

    /**
     * Show the form for editing the specified department.
     */
    public function edit(int $id): Response
    {
        $department = $this->departmentService->getDepartmentById($id);

        if (! $department) {
            abort(404);
        }

        return Inertia::render('departments/edit', [
            'department' => new DepartmentResource($department),
        ]);
    }

    /**
     * Update the specified department.
     */
    public function update(DepartmentUpdateRequest $request, int $id): JsonResponse
    {
        $department = $this->departmentService->getDepartmentById($id);

        if (! $department) {
            return response()->json(['message' => 'Department not found.'], 404);
        }

        $departmentData = DepartmentData::from($request->validated());
        $updatedDepartment = $this->departmentService->updateDepartment($id, $departmentData);

        return response()->json([
            'message' => 'Department updated successfully.',
            'data' => new DepartmentResource($updatedDepartment),
        ]);
    }

    /**
     * Remove the specified department.
     */
    public function destroy(int $id): JsonResponse
    {
        $department = $this->departmentService->getDepartmentById($id);

        if (! $department) {
            return response()->json(['message' => 'Department not found.'], 404);
        }

        $this->departmentService->deleteDepartment($id);

        return response()->json([
            'message' => 'Department deleted successfully.',
        ]);
    }

    /**
     * Get all active departments.
     */
    public function active(): JsonResponse
    {
        $departments = $this->departmentService->getActiveDepartments();

        return response()->json([
            'data' => DepartmentResource::collection($departments),
        ]);
    }

    /**
     * Get department statistics.
     */
    public function statistics(int $id): JsonResponse
    {
        $department = $this->departmentService->getDepartmentById($id);

        if (! $department) {
            return response()->json(['message' => 'Department not found.'], 404);
        }

        $statistics = $this->departmentService->getDepartmentStatistics($id);

        return response()->json([
            'data' => $statistics,
        ]);
    }
}
