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
        Schema::table('products', function (Blueprint $table) {
            // Extra Product Info
            $table->string('sku')->unique()->nullable()->after('slug');
            $table->string('brand')->nullable()->after('sku');

            // Inventory
            $table->boolean('track_inventory')->default(true)->after('cost_price');
            $table->unsignedInteger('stock_quantity')->default(0)->after('track_inventory');
            $table->unsignedInteger('low_stock_threshold')->default(5)->after('stock_quantity');

            // SEO
            $table->string('meta_title')->nullable()->after('thumbnail');
            $table->text('meta_description')->nullable()->after('meta_title');

            // Visibility
            $table->boolean('is_featured')->default(false)->after('meta_description');
            $table->timestamp('published_at')->nullable()->after('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);

            $table->dropColumn([
                'category_id',
                'sku',
                'brand',
                'track_inventory',
                'stock_quantity',
                'low_stock_threshold',
                'meta_title',
                'meta_description',
                'is_featured',
                'published_at',
            ]);
        });
    }
};