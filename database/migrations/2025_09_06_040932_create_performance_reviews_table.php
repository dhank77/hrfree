<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('performance_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->foreignId('reviewer_id')->constrained('employees')->onDelete('cascade');
            $table->string('review_period');
            $table->date('review_date');
            $table->enum('review_type', ['annual', 'quarterly', 'probation', 'project_based']);
            $table->integer('overall_rating')->comment('1-5 scale');
            $table->json('goals_achievements')->nullable();
            $table->json('strengths')->nullable();
            $table->json('areas_for_improvement')->nullable();
            $table->json('development_plan')->nullable();
            $table->text('reviewer_comments')->nullable();
            $table->text('employee_comments')->nullable();
            $table->enum('status', ['draft', 'pending_employee', 'pending_manager', 'completed'])->default('draft');
            $table->date('due_date')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['employee_id', 'review_date']);
            $table->index(['reviewer_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('performance_reviews');
    }
};
