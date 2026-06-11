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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->unique()
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('profile_photo')->nullable();

            $table->string('nickname');
            $table->string('phone_number');

            $table->string('shipping_recipient_name');
            $table->string('shipping_phone_number');
            $table->string('shipping_house_number')->nullable();
            $table->string('shipping_street');
            $table->string('shipping_barangay');
            $table->string('shipping_city');
            $table->string('shipping_province');
            $table->string('shipping_region')->nullable();
            $table->string('shipping_postal_code');
            $table->text('shipping_notes')->nullable();

            $table->boolean('billing_same_as_shipping')->default(true);
            $table->string('billing_name')->nullable();
            $table->string('billing_phone_number')->nullable();
            $table->string('billing_address')->nullable();
            $table->string('billing_barangay')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_province')->nullable();
            $table->string('billing_region')->nullable();
            $table->string('billing_postal_code')->nullable();

            $table->boolean('email_notifications')->default(true);
            $table->boolean('sms_notifications')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};