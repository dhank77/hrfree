<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function shouldRun() : bool
    {
        return false;
    }
    
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->date('date');
            $table->time('clock_in')->nullable();
            $table->time('clock_out')->nullable();
            $table->time('break_start')->nullable();
            $table->time('break_end')->nullable();
            $table->integer('total_hours')->nullable()->comment('in minutes');
            $table->integer('overtime_hours')->nullable()->comment('in minutes');
            $table->enum('status', ['present', 'absent', 'late', 'half_day', 'work_from_home']);
            $table->text('notes')->nullable();
            $table->string('location')->nullable();
            $table->json('clock_in_location')->nullable()->comment('GPS coordinates');
            $table->json('clock_out_location')->nullable()->comment('GPS coordinates');
            $table->foreignId('approved_by')->nullable()->constrained('employees')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->unique(['employee_id', 'date']);
            $table->index(['date', 'status']);
            $table->index(['employee_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};
