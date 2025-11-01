<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teacher_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->json('diplomas')->nullable(); // [{name: "Master", file: "path"}]
            $table->json('specialties'); // ["Mathématiques", "Physique"]
            $table->json('levels_taught'); // ["Collège", "Lycée"]
            $table->text('professional_bio');
            $table->decimal('hourly_rate', 8, 2);
            $table->json('availability')->nullable(); // {days: ["lundi", "mardi"], hours: "14h-18h"}
            $table->string('withdrawal_method')->default('momo'); // momo, moov, bank
            $table->string('withdrawal_account')->nullable();
            $table->boolean('profile_paused')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_profiles');
    }
};
