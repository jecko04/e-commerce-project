<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\VendorProfilesModel;
use App\Models\UsersProfileModel;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'vendorProfile' => fn () => auth()->check() && auth()->user()->role === 'vendor'
                ? VendorProfilesModel::where('vendor_id', auth()->id())
                    ->select('store_name', 'store_logo')
                    ->first()
                : null,
            'userProfile' => fn () => auth()->check() && auth()->user()->role === 'client'
                ? UsersProfileModel::where('user_id', auth()->id())
                    ->select('nickname', 'profile_photo')
                    ->first()
                : null,
        ];
    }
}
