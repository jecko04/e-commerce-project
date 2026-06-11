import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type UserProfile = {
    id: number;
    user_id: number;
    profile_photo: string | null;
    nickname: string | null;
    phone_number: string | null;
    shipping_recipient_name: string | null;
    shipping_phone_number: string | null;
    shipping_house_number: string | null;
    shipping_street: string | null;
    shipping_barangay: string | null;
    shipping_city: string | null;
    shipping_province: string | null;
    shipping_region: string | null;
    shipping_postal_code: string | null;
    shipping_notes: string | null;
    billing_same_as_shipping: boolean;
    billing_name: string | null;
    billing_phone_number: string | null;
    billing_address: string | null;
    billing_barangay: string | null;
    billing_city: string | null;
    billing_province: string | null;
    billing_region: string | null;
    billing_postal_code: string | null;
    email_notifications: boolean;
    sms_notifications: boolean;
};

type PageProps = {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    flash?: {
        success?: string;
        error?: string;
    };
};

type Props = {
    auth: PageProps['auth'];
    userDetails: UserProfile | null;
};

export default function UserProfiles({ userDetails, auth }: Props) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const { data, setData, post, processing, errors } = useForm({
        profile_photo: null as File | null,
        nickname: userDetails?.nickname ?? '',
        phone_number: userDetails?.phone_number ?? '',
        shipping_recipient_name: userDetails?.shipping_recipient_name ?? '',
        shipping_house_number: userDetails?.shipping_house_number ?? '',
        shipping_street: userDetails?.shipping_street ?? '',
        shipping_barangay: userDetails?.shipping_barangay ?? '',
        shipping_city: userDetails?.shipping_city ?? '',
        shipping_province: userDetails?.shipping_province ?? '',
        shipping_region: userDetails?.shipping_region ?? '',
        shipping_postal_code: userDetails?.shipping_postal_code ?? '',
        shipping_notes: userDetails?.shipping_notes ?? '',
        billing_same_as_shipping: userDetails?.billing_same_as_shipping ?? true,
        billing_name: userDetails?.billing_name ?? '',
        billing_phone_number: userDetails?.billing_phone_number ?? '',
        billing_address: userDetails?.billing_address ?? '',
        billing_barangay: userDetails?.billing_barangay ?? '',
        billing_city: userDetails?.billing_city ?? '',
        billing_province: userDetails?.billing_province ?? '',
        billing_region: userDetails?.billing_region ?? '',
        billing_postal_code: userDetails?.billing_postal_code ?? '',
        email_notifications: userDetails?.email_notifications ?? true,
        sms_notifications: userDetails?.sms_notifications ?? false,
    });

    const [photoPreview, setPhotoPreview] = useState(
        userDetails?.profile_photo ? `/storage/${userDetails.profile_photo}` : null,
    );

    const handlePhotoChange = (file: File | null) => {
        setData('profile_photo', file);
        if (file) setPhotoPreview(URL.createObjectURL(file));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('user.profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Profile" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
                            Account Settings
                        </p>
                        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                            My Profile
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage your delivery details, billing information, and order notifications.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
                        <aside className="h-fit overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-xl shadow-slate-200/70 backdrop-blur">
                            <div className="h-32 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.35),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.28),_transparent_38%),linear-gradient(135deg,_#0f172a,_#064e3b)]" />

                            <div className="-mt-12 px-6 pb-6">
                                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-slate-950 text-2xl font-black text-white shadow-lg">
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <span>{auth.user.name.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>

                                <h2 className="mt-4 text-xl font-black text-slate-950">
                                    {data.nickname || auth.user.name}
                                </h2>
                                <p className="mt-1 text-sm font-medium text-slate-500">
                                    {auth.user.email}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                        Customer
                                    </span>
                                </div>
                            </div>
                        </aside>

                        <form onSubmit={submit} className="space-y-6">
                            <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                                <h2 className="text-lg font-black text-slate-950">
                                    Personal Details
                                </h2>

                                <div className="mt-5 grid gap-5 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">
                                            Profile photo
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handlePhotoChange(e.target.files?.[0] ?? null)}
                                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm file:mr-4 file:rounded-xl file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-slate-800"
                                        />
                                        {errors.profile_photo && (
                                            <p className="mt-2 text-sm font-medium text-red-600">
                                                {errors.profile_photo}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Nickname
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nickname}
                                            onChange={(e) => setData('nickname', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 px-4 py-3 text-sm font-semibold"
                                            placeholder="Your display name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Phone number
                                        </label>
                                        <input
                                            type="text"
                                            value={data.phone_number}
                                            onChange={(e) => setData('phone_number', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 px-4 py-3 text-sm font-semibold"
                                            placeholder="09XXXXXXXXX"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                                <h2 className="text-lg font-black text-slate-950">
                                    Shipping Address
                                </h2>

                                <div className="mt-5 grid gap-5 md:grid-cols-2">
                                    {[
                                        ['shipping_recipient_name', 'Recipient name'],
                                        ['shipping_phone_number', 'Phone number'],
                                        ['shipping_house_number', 'House / unit number'],
                                        ['shipping_street', 'Street'],
                                        ['shipping_barangay', 'Barangay'],
                                        ['shipping_city', 'City'],
                                        ['shipping_province', 'Province'],
                                        ['shipping_region', 'Region'],
                                        ['shipping_postal_code', 'Postal code'],
                                    ].map(([field, label]) => (
                                        <div key={field}>
                                            <label className="text-sm font-bold text-slate-700">
                                                {label}
                                            </label>
                                            <input
                                                type="text"
                                                value={data[field as keyof typeof data] as string}
                                                onChange={(e) =>
                                                    setData(field as keyof typeof data, e.target.value)
                                                }
                                                className="mt-2 w-full rounded-2xl border-slate-200 px-4 py-3 text-sm font-semibold"
                                            />
                                        </div>
                                    ))}

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">
                                            Delivery notes
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={data.shipping_notes}
                                            onChange={(e) => setData('shipping_notes', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 px-4 py-3 text-sm font-semibold"
                                            placeholder="Call before delivery, leave at guard house..."
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-black text-slate-950">
                                            Billing Details
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Use these for invoices and payment records.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData(
                                                'billing_same_as_shipping',
                                                !data.billing_same_as_shipping,
                                            )
                                        }
                                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                                            data.billing_same_as_shipping
                                                ? 'bg-emerald-500'
                                                : 'bg-slate-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${
                                                data.billing_same_as_shipping
                                                    ? 'translate-x-6'
                                                    : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {!data.billing_same_as_shipping && (
                                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                                        {[
                                            ['billing_name', 'Billing name'],
                                            ['billing_phone_number', 'Billing phone'],
                                            ['billing_address', 'Billing address'],
                                            ['billing_barangay', 'Barangay'],
                                            ['billing_city', 'City'],
                                            ['billing_province', 'Province'],
                                            ['billing_region', 'Region'],
                                            ['billing_postal_code', 'Postal code'],
                                        ].map(([field, label]) => (
                                            <div key={field}>
                                                <label className="text-sm font-bold text-slate-700">
                                                    {label}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data[field as keyof typeof data] as string}
                                                    onChange={(e) =>
                                                        setData(field as keyof typeof data, e.target.value)
                                                    }
                                                    className="mt-2 w-full rounded-2xl border-slate-200 px-4 py-3 text-sm font-semibold"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                                <h2 className="text-lg font-black text-slate-950">
                                    Notifications
                                </h2>

                                <div className="mt-5 grid gap-3 md:grid-cols-2">
                                    {[
                                        ['email_notifications', 'Email notifications'],
                                        ['sms_notifications', 'SMS notifications'],
                                    ].map(([field, label]) => {
                                        const enabled = data[field as keyof typeof data] as boolean;

                                        return (
                                            <button
                                                key={field}
                                                type="button"
                                                onClick={() =>
                                                    setData(field as keyof typeof data, !enabled)
                                                }
                                                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                            >
                                                <span className="text-sm font-bold text-slate-700">
                                                    {label}
                                                </span>
                                                <span
                                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                                                        enabled ? 'bg-emerald-500' : 'bg-slate-300'
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${
                                                            enabled
                                                                ? 'translate-x-6'
                                                                : 'translate-x-1'
                                                        }`}
                                                    />
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing ? 'Updating...' : 'Update Profile'}
                                    </button>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}