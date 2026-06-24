import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

type VendorProfiles = {
    store_name: string;
    store_logo: string | null;
};

type UserProfiles = {
    profile_photo: string | null;
    nickname: string;
};

type Props = {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };

    vendorProfile?: VendorProfiles | null;
    userProfile?: UserProfiles | null;
};

export default function GuestNav({
    auth,
    vendorProfile,
    userProfile,
}: Props) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const user = auth.user;

    let displayName = '';
    let displayInitial = '';
    let displayImage = null;

    switch (user?.role) {
        case 'vendor':
            displayName = vendorProfile?.store_name || 'ShopX';
            displayImage = vendorProfile?.store_logo
                ? `/storage/${vendorProfile.store_logo}`
                : null;
            break;

        case 'client':
            displayName = userProfile?.nickname || 'User';
            displayImage = userProfile?.profile_photo
                ? `/storage/${userProfile.profile_photo}`
                : null;
            break;

        case 'admin':
            displayName = user.name || 'Admin';
            break;

        default:
            displayName = 'Guest';
    }

    displayInitial = displayName.charAt(0).toUpperCase();

    return (
        <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex shrink-0 items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">
                        X
                    </span>

                    <span className="hidden sm:block">
                        <span className="block text-base font-bold tracking-tight text-slate-950">
                            ShopX
                        </span>

                        <span className="block text-xs font-medium uppercase tracking-[0.18em] text-emerald-600">
                            Commerce Hub
                        </span>
                    </span>
                </Link>

                <div className="flex-1 md:block">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm"
                        />

                        <svg
                            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                            />
                        </svg>
                    </div>
                </div>

                <nav className="ml-auto flex items-center gap-2">
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                        aria-label="Notifications"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 0 0-12 0v.75a8.967 8.967 0 0 1-2.312 6.022 23.848 23.848 0 0 0 5.455 1.31m5.714 0a3 3 0 0 1-5.714 0" />
                        </svg>
                    </button>

                    {user?.role !== 'vendor' && user?.role !== 'admin' && (
                        <Link
                            href={route('view-add-to-cart.index')}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                            aria-label="Cart"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a1.5 1.5 0 0 1 1.463 1.175l.383 1.725M7.5 14.25h9.75a1.5 1.5 0 0 0 1.463-1.175l1.087-4.9A1.5 1.5 0 0 0 18.337 6.3H5.482m2.018 7.95L6.15 8.175m1.35 6.075L6.75 17.25h10.5M9 20.25h.008v.008H9v-.008Zm7.5 0h.008v.008H16.5v-.008Z" />
                            </svg>
                        </Link>
                    )}

                    {!user && (
                        <div className="hidden items-center gap-2 sm:flex">
                            <Link
                                href={route('login')}
                                className="px-4 py-2 text-sm font-semibold text-slate-600"
                            >
                                Login
                            </Link>

                            <Link
                                href={route('register')}
                                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {user && (
                        <div className="hidden sm:block">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-black uppercase text-white">
                                            {displayImage ? (
                                                <img
                                                    src={displayImage}
                                                    alt={displayName}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                displayInitial
                                            )}
                                        </span>

                                        <span className="text-sm font-semibold">
                                            {displayName}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right">
                                    <div className="border-b px-4 py-3">
                                        <p className="font-bold">
                                            {displayName}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {user.email}
                                        </p>
                                    </div>

                                    {user?.role === 'vendor' && (
                                        <Dropdown.Link href={route('vendor.dashboard')}>
                                            Vendor Dashboard
                                        </Dropdown.Link>
                                    )}

                                    {user?.role === 'admin' && (
                                        <Dropdown.Link href={route('admin.dashboard')}>
                                            Admin Dashboard
                                        </Dropdown.Link>
                                    )}

                                    {user?.role === 'client' && (
                                        <Dropdown.Link href={route('dashboard')}>
                                            Dashboard
                                        </Dropdown.Link>
                                    )}

                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Logout
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    )}

                    <button
                        onClick={() =>
                            setShowingNavigationDropdown(
                                !showingNavigationDropdown,
                            )
                        }
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border sm:hidden"
                    >
                        ☰
                    </button>
                </nav>
            </div>

            {showingNavigationDropdown && (
                <>
                <div className="border-t bg-white px-4 py-3 sm:hidden">
                    {user?.role === 'vendor' && (
                        <Dropdown.Link href={route('vendor.dashboard')}>
                            Vendor Dashboard
                        </Dropdown.Link>
                    )}

                    {user?.role === 'admin' && (
                        <Dropdown.Link href={route('admin.dashboard')}>
                            Admin Dashboard
                        </Dropdown.Link>
                    )}

                    {user?.role === 'client' && (
                        <Dropdown.Link href={route('dashboard')}>
                            Dashboard
                        </Dropdown.Link>
                    )}
                    {user ? (

                        
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                            className='px-4'
                        >
                            Logout
                        </ResponsiveNavLink>
                    ) : (
                        <>
                            <ResponsiveNavLink href={route('login')}>
                                Login
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('register')}>
                                Sign Up
                            </ResponsiveNavLink>
                        </>
                    )}
                </div>
                </>

            )}
        </header>
    );
}