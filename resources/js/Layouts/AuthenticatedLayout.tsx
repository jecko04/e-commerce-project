import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

type VendorProfiles = {
    store_name: string;
    store_logo: string | null;
}

type UserProfiles = {
    profile_photo: string | null;
    nickname: string;
}

type PageProps = {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    vendorProfile: VendorProfiles | null;
    userProfile: UserProfiles | null;
};

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode}>) {
    
    const { auth, vendorProfile, userProfile } = usePage<PageProps>().props;
    const user = auth.user;

    const brandName =
        user.role === 'vendor' && vendorProfile?.store_name
            ? vendorProfile.store_name
            : '';

    const brandInitial = brandName.charAt(0).toUpperCase();

    const brandLogo =
        user.role === 'vendor' && vendorProfile?.store_logo
            ? `/storage/${vendorProfile.store_logo}`
            : null;

    const nickname = 
        user.role === 'client' && userProfile?.nickname
            ? userProfile.nickname
            : ''

    const nicknameInitial = nickname.charAt(0).toUpperCase();

    const profilePhoto =
        user.role === 'client' && userProfile?.profile_photo
            ? `/storage/${userProfile.profile_photo}`
            : null;


    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
            <div className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.20),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_34%)]" />

            <nav className="sticky top-0 z-30 border-b border-white/70 bg-white/80 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link
                                href="/"
                                className="flex items-center gap-3 rounded-xl transition hover:opacity-80"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/20">
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

                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <button
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                aria-label="Notifications"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 0 0-12 0v.75a8.967 8.967 0 0 1-2.312 6.022 23.848 23.848 0 0 0 5.455 1.31m5.714 0a3 3 0 0 1-5.714 0" />
                                </svg>
                            </button>
                            <div className="relative ms-3">
                                
                                <Dropdown>
                                    <Dropdown.Trigger>
                                       
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                        >
                                            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-black uppercase text-white shadow-sm">
                                                {brandLogo ? (
                                                    <img
                                                        src={brandLogo}
                                                        alt={brandName}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    brandInitial
                                                )}

                                                {profilePhoto ? (
                                                    <img
                                                        src={profilePhoto}
                                                        alt={nickname}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    nicknameInitial
                                                )}
                                            </span>

                                            <span className="hidden sm:block">
                                                <span className="block max-w-28 truncate text-base tracking-tight text-slate-600">
                                                    {brandName ? (
                                                        <p>{brandName}</p>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {nickname ? (
                                                        <p>{nickname}</p>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </span>
                                            </span>


                                            <svg
                                                className="h-4 w-4 text-slate-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content
                                        align="right"
                                        contentClasses="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/80"
                                    >
                                        <div className="border-b border-slate-100 px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-black uppercase text-white">
                                                    {brandLogo ? (
                                                        <img
                                                            src={brandLogo}
                                                            alt={brandName}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        brandInitial
                                                    )}
                                                    {profilePhoto ? (
                                                        <img
                                                            src={profilePhoto}
                                                            alt={nickname}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        nicknameInitial
                                                    )}
                                                </span>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold text-slate-950">
                                                        {brandName ? (
                                                            brandName
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {nickname ? (
                                                            nickname
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </p>
                                                    <p className="truncate text-xs font-medium text-slate-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {user.role === 'vendor' && (
                                            <Dropdown.Link href={route('vendor.profile')}>
                                                Vendor Profile
                                            </Dropdown.Link>
                                        )}

                                        {user.role === 'admin' && (
                                            <Dropdown.Link href={route('admin.profile')}>
                                                Admin Profile
                                            </Dropdown.Link>
                                        )}

                                        {user.role === 'client' && (
                                            <Dropdown.Link href={route('user.profile')}>
                                                Client Profile
                                            </Dropdown.Link>
                                        )}

                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition duration-150 ease-in-out hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                aria-label="Toggle navigation"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

               <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' border-t border-slate-100 bg-white/95 px-4 pb-4 pt-3 shadow-lg shadow-slate-200/60 sm:hidden'
                    }
                >
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/80">
                        <div className="border-b border-slate-100 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-black uppercase text-white">
                                    {brandLogo ? (
                                        <img
                                            src={brandLogo}
                                            alt={brandName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        brandInitial
                                    )}
                                    {profilePhoto ? (
                                        <img
                                            src={profilePhoto}
                                            alt={nickname}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        nicknameInitial
                                    )}
                                </span>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-950">
                                        {brandName ? (
                                            brandName
                                        ) : (
                                            <></>
                                        )}
                                        {nickname ? (
                                            nickname
                                        ) : (
                                            <></>
                                        )}
                                    </p>
                                    <p className="truncate text-xs font-medium text-slate-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="py-1">
                            <ResponsiveNavLink
                                href={route('home')}
                                active={route().current('home')}
                            >
                                ShopX
                            </ResponsiveNavLink>

                            {user.role === 'vendor' && (
                                <ResponsiveNavLink href={route('vendor.profile')}>
                                    Vendor Profile
                                </ResponsiveNavLink>
                            )}

                            {user.role === 'admin' && (
                                <ResponsiveNavLink href={route('admin.profile')}>
                                    Admin Profile
                                </ResponsiveNavLink>
                            )}

                            {user.role === 'client' && (
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Client Profile
                                </ResponsiveNavLink>
                            )}

                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="relative border-b border-white/70 bg-white/55 backdrop-blur">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="px-5 py-5 sm:px-8">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            <main className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>

            <Toaster position="top-right" />
        </div>
    );
}
