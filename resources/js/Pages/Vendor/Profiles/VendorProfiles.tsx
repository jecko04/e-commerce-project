import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import VendorNav from '@/Components/VendorNav';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type VendorProfiles = {
    id: number;
    vendor_id: number;
    store_name: string;
    store_slug: string;
    store_logo: string | null;
    store_banner: string | null;
    store_description: string;
    store_category: string;
    public_email: string;
    public_phone: string;
    business_name: string;
    business_registration_number: string;
    tax_identification_number: string;
    pickup_address: string;
    warehouse_address: string;
    contact_person: string;
    contact_number: string;
    status: string;
    verification_status: string;
    verification_remarks: string | null;
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
    vendorDetails: VendorProfiles;
};

export default function VendorProfiles({
    vendorDetails,
    auth,
}: Props) {

    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const { data, setData, post, processing, errors } = useForm({
        store_name: vendorDetails?.store_name ?? '',
        store_slug: vendorDetails?.store_slug ?? '',
        store_logo: null as File | null,
        store_banner: null as File | null,
        store_description: vendorDetails?.store_description ?? '',
        store_category: vendorDetails?.store_category ?? '',
        public_email: vendorDetails?.public_email ?? '',
        public_phone: vendorDetails?.public_phone ?? '',
        business_name: vendorDetails?.business_name ?? '',
        business_registration_number:
            vendorDetails?.business_registration_number ?? '',
        tax_identification_number:
            vendorDetails?.tax_identification_number ?? '',
        pickup_address: vendorDetails?.pickup_address ?? '',
        warehouse_address: vendorDetails?.warehouse_address ?? '',
        contact_person: vendorDetails?.contact_person ?? '',
        contact_number: vendorDetails?.contact_number ?? '',
    });
    const [logoPreview, setLogoPreview] = useState(
        vendorDetails?.store_logo ? `/storage/${vendorDetails.store_logo}` : null,
    );

    const [bannerPreview, setBannerPreview] = useState(
        vendorDetails?.store_banner ? `/storage/${vendorDetails.store_banner}` : null,
    );

    const handleLogoChange = (file: File | null) => {
        setData('store_logo', file);

        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleBannerChange = (file: File | null) => {
        setData('store_banner', file);

        if (file) {
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const status = vendorDetails?.status ?? 'inactive';
    const verificationStatus = vendorDetails?.verification_status ?? 'unverified';

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const setStoreSlug = (storeName: string) => {
        setData({
            ...data,
            store_name: storeName,
            store_slug: generateSlug(storeName),
        });
    };

    const formatTin = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '').slice(0, 12);

    return numbersOnly
            .replace(/^(\d{3})(\d)/, '$1-$2')
            .replace(/^(\d{3})-(\d{3})(\d)/, '$1-$2-$3')
            .replace(/^(\d{3})-(\d{3})-(\d{3})(\d)/, '$1-$2-$3-$4');
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('vendor.profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout header={<VendorNav />}>
            <Head title="Vendor Profile" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
                            Vendor Settings
                        </p>
                        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                            Store Profile
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage your public store details, business information, and pickup contact.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                        <aside className="h-fit overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-xl shadow-slate-200/70 backdrop-blur">
                            <div className="relative h-36 bg-slate-950">
                                {bannerPreview ? (
                                    <img
                                        src={bannerPreview}
                                        alt="Store banner"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.35),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.28),_transparent_38%),linear-gradient(135deg,_#0f172a,_#064e3b)]" />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                            </div>

                            <div className="-mt-12 px-6 pb-6">
                                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-slate-950 text-2xl font-black text-white shadow-lg">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Store logo"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span>
                                            {(data.store_name ?? 'S').charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                <h2 className="mt-4 text-xl font-black text-slate-950">
                                    {data.store_name ?? 'Store Name'}
                                </h2>
                                <p className="mt-1 text-sm font-medium text-slate-500">
                                    {data.store_slug ?? 'shopx-store'}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {status === 'active' ? (
                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold capitalize text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                            {status}
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold capitalize text-red-700 ring-1 ring-inset ring-red-200">
                                            {status}
                                        </span>
                                    )}
                                    
                                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-200">
                                        {verificationStatus}
                                    </span>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {vendorDetails?.store_description 
 && (
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-200">
                                            {vendorDetails.store_description.length > 50
                                                ? vendorDetails.store_description.slice(0, 50) + '...'
                                                : vendorDetails.store_description}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {vendorDetails?.verification_remarks && (
                                        <p className="text-sm italic text-red-600">
                                            Remarks: {vendorDetails.verification_remarks}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </aside>

                        <form onSubmit={submit} className="space-y-6">
                            <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                                <div className="mb-5">
                                    <h2 className="text-lg font-black text-slate-950">
                                        Store Details
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        These details are shown to customers on your public store page.
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-700">
                                        Store logo
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleLogoChange(e.target.files?.[0] ?? null)}
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm file:mr-4 file:rounded-xl file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-slate-800"
                                    />
                                    {errors.store_logo && (
                                        <p className="mt-2 text-sm font-medium text-red-600">{errors.store_logo}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-700">
                                        Store banner
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleBannerChange(e.target.files?.[0] ?? null)}
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm file:mr-4 file:rounded-xl file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-slate-800"
                                    />
                                    {errors.store_banner && (
                                        <p className="mt-2 text-sm font-medium text-red-600">{errors.store_banner}</p>
                                    )}
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Store name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.store_name ?? ''}
                                            onChange={(e) => setStoreSlug(e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="Enter store name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Store slug
                                        </label>
                                        <input
                                            type="text"
                                            value={data.store_slug}
                                            onChange={(e) => setData('store_slug', generateSlug(e.target.value))}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="store-url-name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Store category
                                        </label>
                                        <input
                                            type="text"
                                            value={data.store_category}
                                            onChange={(e) => setData('store_category', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="Electronics, Fashion, Home..."
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Public phone
                                        </label>
                                        <input
                                            type="text"
                                            value={data.public_phone}
                                            onChange={(e) => setData('public_phone', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="09XXXXXXXXX"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">
                                            Store description
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={data.store_description}
                                            onChange={(e) => setData('store_description', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="Tell customers about your store..."
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                                <div className="mb-5">
                                    <h2 className="text-lg font-black text-slate-950">
                                        Business Information
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Used for verification and internal seller review.
                                    </p>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Business name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.business_name}
                                            onChange={(e) => setData('business_name', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="Registered business name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Registration number
                                        </label>
                                        <input
                                            type="text"
                                            value={data.business_registration_number}
                                            onChange={(e) => setData('business_registration_number', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="DTI / SEC number"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Tax identification number
                                        </label>
                                        <input
                                            type="text"
                                            value={data.tax_identification_number}
                                            onChange={(e) =>
                                                setData(
                                                    'tax_identification_number',
                                                    formatTin(e.target.value),
                                                )
                                            }
                                            maxLength={15}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="000-000-000-000"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Public email
                                        </label>
                                        <input
                                            type="email"
                                            value={data.public_email}
                                            onChange={(e) => setData('public_email', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="store@example.com"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                                <div className="mb-5">
                                    <h2 className="text-lg font-black text-slate-950">
                                        Pickup & Contact
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Used for order pickup, returns, and delivery coordination.
                                    </p>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Contact person
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_person}
                                            onChange={(e) => setData('contact_person', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="Contact person name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-slate-700">
                                            Contact number
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_number}
                                            onChange={(e) => setData('contact_number', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="09XXXXXXXXX"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">
                                            Pickup address
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={data.pickup_address}
                                            onChange={(e) => setData('pickup_address', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="Complete pickup address"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">
                                            Warehouse address
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={data.warehouse_address}
                                            onChange={(e) => setData('warehouse_address', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            placeholder="Optional warehouse address"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
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