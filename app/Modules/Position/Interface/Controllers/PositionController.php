<?php

declare(strict_types=1);

namespace App\Modules\Position\Interface\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Position\Application\Data\PositionData;
use App\Modules\Position\Application\Services\PositionService;
use App\Modules\Position\Interface\Requests\PositionStoreRequest;
use App\Modules\Position\Interface\Requests\PositionUpdateRequest;
use App\Modules\Position\Interface\Resources\PositionResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PositionController extends Controller
{
    public function __construct(
        protected PositionService $positionService
    ) {}

    /**
     * Display a listing of positions.
     */
    public function index(Request $request): Response|JsonResponse
    {
        $perPage = (int) $request->get('per_page', 15);
        $filters = $request->only(['department_id', 'status', 'search']);

        $positions = $this->positionService->getPaginatedPositions($perPage, $filters);

        if ($request->wantsJson()) {
            return response()->json([
                'data' => PositionResource::collection($positions->items()),
                'meta' => [
                    'current_page' => $positions->currentPage(),
                    'last_page' => $positions->lastPage(),
                    'per_page' => $positions->perPage(),
                    'total' => $positions->total(),
                ],
            ]);
        }

        return Inertia::render('positions/index', [
            'positions' => PositionResource::collection($positions->items()),
            'meta' => [
                'current_page' => $positions->currentPage(),
                'last_page' => $positions->lastPage(),
                'per_page' => $positions->perPage(),
                'total' => $positions->total(),
            ],
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new position.
     */
    public function create(): Response
    {
        return Inertia::render('positions/create');
    }

    /**
     * Store a newly created position.
     */
    public function store(PositionStoreRequest $request): JsonResponse
    {
        $positionData = PositionData::from($request->validated());
        $position = $this->positionService->createPosition($positionData);

        return response()->json([
            'message' => 'Position created successfully.',
            'data' => new PositionResource($position),
        ], 201);
    }

    /**
     * Display the specified position.
     */
    public function show(int $id, Request $request): Response|JsonResponse
    {
        $position = $this->positionService->getPositionById($id);

        if (! $position) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Position not found.'], 404);
            }
            abort(404);
        }

        if ($request->wantsJson()) {
            return response()->json([
                'data' => new PositionResource($position),
            ]);
        }

        return Inertia::render('positions/show', [
            'position' => new PositionResource($position),
        ]);
    }

    /**
     * Show the form for editing the specified position.
     */
    public function edit(int $id): Response
    {
        $position = $this->positionService->getPositionById($id);

        if (! $position) {
            abort(404);
        }

        return Inertia::render('positions/edit', [
            'position' => new PositionResource($position),
        ]);
    }

    /**
     * Update the specified position.
     */
    public function update(PositionUpdateRequest $request, int $id): JsonResponse
    {
        $position = $this->positionService->getPositionById($id);

        if (! $position) {
            return response()->json(['message' => 'Position not found.'], 404);
        }

        $positionData = PositionData::from($request->validated());
        $updatedPosition = $this->positionService->updatePosition($id, $positionData);

        return response()->json([
            'message' => 'Position updated successfully.',
            'data' => new PositionResource($updatedPosition),
        ]);
    }

    /**
     * Remove the specified position.
     */
    public function destroy(int $id): JsonResponse
    {
        $position = $this->positionService->getPositionById($id);

        if (! $position) {
            return response()->json(['message' => 'Position not found.'], 404);
        }

        $this->positionService->deletePosition($id);

        return response()->json([
            'message' => 'Position deleted successfully.',
        ]);
    }

    /**
     * Get positions by department.
     */
    public function byDepartment(int $departmentId): JsonResponse
    {
        $positions = $this->positionService->getPositionsByDepartment($departmentId);

        return response()->json([
            'data' => PositionResource::collection($positions),
        ]);
    }

    /**
     * Get all active positions.
     */
    public function active(): JsonResponse
    {
        $positions = $this->positionService->getActivePositions();

        return response()->json([
            'data' => PositionResource::collection($positions),
        ]);
    }

    /**
     * Get position statistics.
     */
    public function statistics(int $id): JsonResponse
    {
        $position = $this->positionService->getPositionById($id);

        if (! $position) {
            return response()->json(['message' => 'Position not found.'], 404);
        }

        $statistics = $this->positionService->getPositionStatistics($id);

        return response()->json([
            'data' => $statistics,
        ]);
    }
}
