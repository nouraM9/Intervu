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
Schema::create('interview_sessions', function (Blueprint $table) {            
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->foreignId('resume_id')->constrained()->restrictOnDelete();
            $table->string('interview_type');
            $table->string('difficulty');
            $table->string('duration');
            $table->string('status');
            
            // This creates both correct 'created_at' and 'updated_at' columns automatically
            $table->timestamps(); 
            
            // If you also needed a custom column for when it ended:
            $table->timestamp('ended_at')->nullable(); 

                });
            }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
           Schema::dropIfExists('interview_sessions');

    }
};
