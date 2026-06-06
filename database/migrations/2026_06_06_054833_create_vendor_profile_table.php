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
    Schema::create('vendor_profiles', function (Blueprint $table) {
        $table->id();

        $table->foreignId('vendor_id')->constrained('users')->cascadeOnDelete();

        $table->string('store_name');
        $table->string('store_slug')->unique();
        $table->string('store_logo')->nullable();
        $table->string('store_banner')->nullable();
        $table->text('store_description')->nullable();
        $table->string('store_category')->nullable();

        $table->string('public_email')->nullable();
        $table->string('public_phone')->nullable();

        $table->string('business_name')->nullable();
        $table->string('business_registration_number')->nullable();
        $table->string('tax_identification_number')->nullable();

        $table->string('pickup_address')->nullable();
        $table->string('warehouse_address')->nullable();
        $table->string('contact_person')->nullable();
        $table->string('contact_number')->nullable();

        $table->enum('status', ['inactive', 'active', 'suspended'])->default('inactive');
        $table->enum('verification_status', ['unverified', 'verified'])->default('unverified');
        $table->text('verification_remarks')->nullable();

        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendor_profile');
    }
};
