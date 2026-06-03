import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mx-auto max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
                        <svg
                            className="h-8 w-8 text-indigo-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.8"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 16.5v-9m19.5 0A2.25 2.25 0 0 0 19.5 5.25h-15A2.25 2.25 0 0 0 2.25 7.5m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 9.66a2.25 2.25 0 0 1-1.07-1.916V7.5"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-900">
                        Verify your email
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        We sent a verification link to your email address.
                        Please check your inbox and click the link to activate
                        your account.
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        A new verification link has been sent to your email
                        address.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 rounded-xl bg-gray-50 px-4 py-4">
                            <p className="text-sm font-medium text-gray-900">
                                Didn't receive the email?
                            </p>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Check your spam folder or request a fresh
                                verification link below.
                            </p>
                        </div>

                        <PrimaryButton
                            disabled={processing}
                            className="w-full justify-center py-3"
                        >
                            {processing
                                ? 'Sending...'
                                : 'Resend Verification Email'}
                        </PrimaryButton>

                        <div className="mt-5 text-center">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm font-medium text-gray-500 transition hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Log out and use another account
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}