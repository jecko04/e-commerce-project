<?php

namespace App\Http\Controllers\Vendor\Profiles;

use App\Http\Controllers\Controller;
use App\Models\VendorProfilesModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VendorProfilesController extends Controller
{
    public function edit()
    {
        $vendorDetails = VendorProfilesModel::where('vendor_id', auth()->id())->first();

        return Inertia::render('Vendor/Profiles/VendorProfiles', [
            'vendorDetails' => $vendorDetails,
        ]);
    }

    public function update(Request $request)
    {
        $vendorDetails = VendorProfilesModel::where('vendor_id', auth()->id())->first();

        $validated = $request->validate([
            'store_name' => ['required', 'string', 'max:255'],
            'store_slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('vendor_profiles', 'store_slug')->ignore($vendorDetails?->id),
            ],
            'store_logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'store_banner' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'store_description' => ['nullable', 'string'],
            'store_category' => ['nullable', 'string', 'max:255'],
            'public_email' => ['nullable', 'email', 'max:255'],
            'public_phone' => ['nullable', 'string', 'max:20'],
            'business_name' => ['nullable', 'string', 'max:255'],
            'business_registration_number' => ['nullable', 'string', 'max:255'],
            'tax_identification_number' => ['nullable', 'string', 'max:255'],
            'pickup_address' => ['nullable', 'string'],
            'warehouse_address' => ['nullable', 'string'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'contact_number' => ['nullable', 'string', 'max:20'],
        ]);

        unset($validated['store_logo'], $validated['store_banner']);

        $vendorId = auth()->id();

        if ($request->hasFile('store_logo')) {
            if ($vendorDetails?->store_logo) {
                Storage::disk('public')->delete($vendorDetails->store_logo);
            }

            $validated['store_logo'] = $request->file('store_logo')->storeAs(
                'vendor/logo',
                'vendor-' . $vendorId . '-logo-' . time() . '.' . $request->file('store_logo')->getClientOriginalExtension(),
                'public'
            );
        }

        if ($request->hasFile('store_banner')) {
            if ($vendorDetails?->store_banner) {
                Storage::disk('public')->delete($vendorDetails->store_banner);
            }

            $validated['store_banner'] = $request->file('store_banner')->storeAs(
                'vendor/banner',
                'vendor-' . $vendorId . '-banner-' . time() . '.' . $request->file('store_banner')->getClientOriginalExtension(),
                'public'
            );
        }

        VendorProfilesModel::updateOrCreate(
            ['vendor_id' => auth()->id()],
            [
                ...$validated,
                'vendor_id' => auth()->id(),
            ],
        );

        return redirect()
            ->route('vendor.profile')
            ->with('success', 'Profile updated successfully.');
    }
}