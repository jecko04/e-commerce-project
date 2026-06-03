import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_38%)]" />

                <div className="relative">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/20">
                            <ApplicationLogo className="block h-7 w-auto fill-current" />
                        </div>

                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
                            ShopX Commerce Hub
                        </p>

                        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Sign in to manage your store, inventory, and orders.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email address"
                                className="text-sm font-semibold text-slate-700"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="vendor@example.com"
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-sm font-semibold text-slate-700"
                                />

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData(
                                            'remember',
                                            (e.target.checked || false) as false,
                                        )
                                    }
                                />
                                <span className="ms-2 text-sm font-medium text-slate-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <PrimaryButton
                            className="w-full justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 focus:bg-slate-800 focus:ring-emerald-500"
                            disabled={processing}
                        >
                            {processing ? 'Signing in...' : 'Log in'}
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}