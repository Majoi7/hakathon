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

            // Informations personnelles
            $table->string('phone')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('birth_date')->nullable();
            $table->string('city')->nullable();
            $table->string('school')->nullable();
            $table->string('study_level')->nullable();
            $table->string('field_of_study')->nullable();
            $table->text('bio')->nullable();
            $table->string('profile_photo')->nullable();

            // Informations professionnelles
            $table->json('specialties')->nullable();
            $table->json('levels_taught')->nullable();
            $table->text('professional_bio')->nullable();
            $table->decimal('hourly_rate', 8, 2)->default(0);
            $table->json('availability')->nullable();

            // Paiements
            $table->string('withdrawal_method')->nullable();
            $table->string('withdrawal_account')->nullable();

            // Diplômes et vérification
            $table->json('diplomas')->nullable();
            $table->enum('verification_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamp('verified_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->boolean('profile_paused')->default(false);

            $table->timestamps();

            // Index pour les performances
            $table->index('verification_status');
            $table->index('user_id');
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
