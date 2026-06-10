import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

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
                            Create your account
                        </h1>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Full name"
                                className="text-sm font-semibold text-slate-700"
                            />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Juan Dela Cruz"
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

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
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="vendor@example.com"
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-sm font-semibold text-slate-700"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Create a password"
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm password"
                                className="text-sm font-semibold text-slate-700"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-2 block w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                placeholder="Confirm your password"
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <PrimaryButton
                            className="w-full justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 focus:bg-slate-800 focus:ring-emerald-500"
                            disabled={processing}
                        >
                            {processing ? 'Creating account...' : 'Create account'}
                        </PrimaryButton>

                        <div className="text-center">
                            <Link
                                href={route('login')}
                                className="text-sm font-semibold text-slate-500 transition hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                                Already registered? Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}