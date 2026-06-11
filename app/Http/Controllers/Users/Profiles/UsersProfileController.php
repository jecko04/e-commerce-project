<?php

namespace App\Http\Controllers\Users\Profiles;

use App\Http\Controllers\Controller;
use App\Models\UsersProfileModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UsersProfileController extends Controller
{
    public function edit()
    {
        $usersProfile = UsersProfileModel::where('user_id', auth()->id())->first();

        return Inertia::render('Users/Profiles/UsersProfile', [
            'userDetails' => $usersProfile,
        ]);
    }

    public function update(Request $request)
    {
        $usersProfile = UsersProfileModel::where('user_id', auth()->id())->first();

        $validated = $request->validate([
            'profile_photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],

            'nickname' => ['nullable', 'string', 'max:255'],
            'phone_number' => ['nullable', 'string', 'max:20'],

            'shipping_recipient_name' => ['nullable', 'string', 'max:255'],
            'shipping_phone_number' => ['required', 'string', 'max:20'],
            'shipping_house_number' => ['nullable', 'string', 'max:255'],
            'shipping_street' => ['nullable', 'string', 'max:255'],
            'shipping_barangay' => ['nullable', 'string', 'max:255'],
            'shipping_city' => ['nullable', 'string', 'max:255'],
            'shipping_province' => ['nullable', 'string', 'max:255'],
            'shipping_region' => ['nullable', 'string', 'max:255'],
            'shipping_postal_code' => ['nullable', 'string', 'max:20'],
            'shipping_notes' => ['nullable', 'string'],

            'billing_same_as_shipping' => ['required', 'boolean'],
            'billing_name' => ['nullable', 'string', 'max:255'],
            'billing_phone_number' => ['nullable', 'string', 'max:20'],
            'billing_address' => ['nullable', 'string', 'max:255'],
            'billing_barangay' => ['nullable', 'string', 'max:255'],
            'billing_city' => ['nullable', 'string', 'max:255'],
            'billing_province' => ['nullable', 'string', 'max:255'],
            'billing_region' => ['nullable', 'string', 'max:255'],
            'billing_postal_code' => ['nullable', 'string', 'max:20'],

            'email_notifications' => ['required', 'boolean'],
            'sms_notifications' => ['required', 'boolean'],
        ]);

        unset($validated['profile_photo']);

        $userId = auth()->id();

        if ($request->hasFile('profile_photo')) {
            if ($usersProfile?->profile_photo) {
                Storage::disk('public')->delete($usersProfile->profile_photo);
            }

            $validated['profile_photo'] = $request->file('profile_photo')->storeAs(
                'users/profile',
                'user-' . $userId . '-profile-' . time() . '.' . $request->file('profile_photo')->getClientOriginalExtension(),
                'public'
            );
        }

        UsersProfileModel::updateOrCreate(
            ['user_id' => $userId],
            [
                ...$validated,
                'user_id' => $userId,
            ],
        );

        return redirect()
            ->route('user.profile')
            ->with('success', 'Profile updated successfully.');
    }
}