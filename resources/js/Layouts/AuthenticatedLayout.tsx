import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

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
                                    <ApplicationLogo className="block h-6 w-auto fill-current" />
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
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-full">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold leading-4 text-slate-700 shadow-sm transition duration-150 ease-in-out hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                            >
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-xs font-bold uppercase text-white">
                                                    {user.name.charAt(0)}
                                                </span>
                                                <span>{user.name}</span>

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
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
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
                        ' border-t border-slate-100 bg-white/95 pb-4 shadow-lg shadow-slate-200/60 sm:hidden'
                    }
                >
                    <div className="space-y-1 px-4 pb-3 pt-4">
                        <ResponsiveNavLink
                            href={route('home')}
                            active={route().current('home')}
                        >
                            ShopX
                        </ResponsiveNavLink>
                    </div>

                    <div className="mx-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-sm font-bold uppercase text-white">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-base font-semibold text-slate-950">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-slate-500">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
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
