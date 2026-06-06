<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class VendorDetailsModel extends Model
{
    protected $table = 'vendor_profiles';

    protected $fillable = [
        'vendor_id',
        'store_name',
        'store_slug',
        'store_logo',
        'store_banner',
        'store_description',
        'store_category',
        'public_email',
        'public_phone',
        'business_name',
        'business_registration_number',
        'tax_identification_number',
        'pickup_address',
        'warehouse_address',
        'contact_person',
        'contact_number',
    ];
}