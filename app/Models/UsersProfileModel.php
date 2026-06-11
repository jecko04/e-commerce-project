<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsersProfileModel extends Model
{
    protected $table = 'user_profiles';

    protected $fillable = [
        'user_id',
        'profile_photo',
        'nickname',
        'phone_number',
        'shipping_recipient_name',
        'shipping_phone_number',
        'shipping_house_number',
        'shipping_street',
        'shipping_barangay',
        'shipping_city',
        'shipping_province',
        'shipping_region',
        'shipping_postal_code',
        'shipping_notes',
        'billing_same_as_shipping',
        'billing_name',
        'billing_phone_number',
        'billing_address',
        'billing_barangay',
        'billing_city',
        'billing_province',
        'billing_region',
        'billing_postal_code',
        'email_notifications',
        'sms_notifications'
    ];
}
