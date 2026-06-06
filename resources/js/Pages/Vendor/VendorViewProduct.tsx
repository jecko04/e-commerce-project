import { FormEventHandler, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import VendorNav from '@/Components/VendorNav';
import { Head, Link, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

type Category = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    name: string;
    slug: string;
    sku?: string | null;
    brand?: string | null;
    price: string | number;
    sale_price?: string | number | null;
    stock_quantity: number;
    status: string;
    is_featured: boolean;
    thumbnail?: string | null;
    category?: Category | null;
};

type VendorViewProductProps = {
    title: string;
    product: Product;
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

export default function VendorViewProduct({
    title,
    product,
}: VendorViewProductProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const lowStockLimit = 10;

    const { flash } = usePage<PageProps>().props;
    
        useEffect(() => {
            if (flash?.success) {
                toast.success(flash.success);
            }
    
            if (flash?.error) {
                toast.error(flash.error);
            }
        }, [flash]);

    const { data, setData, patch, processing, errors, reset } = useForm({
        status: product.status,
        price: String(product.price ?? ''),
        sale_price: String(product.sale_price ?? ''),
        is_featured: Boolean(product.is_featured),
    });

    const closeModal = () => {
        setShowEditModal(false);
        reset();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('vendor.view-products.update', product.id), {
            preserveScroll: true,
            onSuccess: () => setShowEditModal(false),
        });
    };

    const formatPrice = (value?: string | number | null) => {
        if (!value) return 'PHP 0.00';

        return `PHP ${Number(value).toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const stockStatus =
        product.stock_quantity <= 0
            ? {
                  label: 'Out of Stock',
                  className: 'bg-red-50 text-red-700 ring-red-200',
                  note: 'This item is unavailable. Restock before customers can order it again.',
              }
            : product.stock_quantity <= lowStockLimit
              ? {
                    label: 'Needs Restock',
                    className: 'bg-amber-50 text-amber-700 ring-amber-200',
                    note: 'Stock is running low. Consider restocking this product soon.',
                }
              : {
                    label: 'In Stock',
                    className: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
                    note: 'This product has enough stock available for customer orders.',
                };

    return (
        <AuthenticatedLayout header={<VendorNav />}>
            <Head title={title} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('vendor.products.index')}
                            className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                        >
                            Back to products
                        </Link>

                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
                            Vendor Product View
                        </p>

                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                            {product.name}
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Review product details, pricing, and stock availability.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
                        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-xl shadow-slate-200/70 backdrop-blur">
                            <div className="aspect-[4/3] bg-slate-100">
                                {product.thumbnail ? (
                                    <img
                                        src={`/storage/${product.thumbnail}`}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
                                        No image
                                    </div>
                                )}
                            </div>
                        </div>

                        <aside className="h-fit rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                            <div className="flex items-center justify-between gap-2">
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${stockStatus.className}`}
                                >
                                    {stockStatus.label}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(true)}
                                    className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                    Edit
                                </button>
                            </div>

                            <h2 className="mt-4 text-xl font-bold text-slate-950">
                                {product.name}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {product.brand ?? 'No brand'} ·{' '}
                                {product.category?.name ?? 'No category'}
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Current Stock
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-slate-950">
                                        {product.stock_quantity}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Status
                                    </p>
                                    <p className="mt-1 text-sm font-bold capitalize text-slate-950">
                                        {product.status}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="font-medium text-slate-500">SKU</span>
                                    <span className="font-bold text-slate-900">
                                        {product.sku ?? 'No SKU'}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="font-medium text-slate-500">Regular Price</span>
                                    <span className="font-bold text-slate-900">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="font-medium text-slate-500">Sale Price</span>
                                    <span className="font-bold text-red-600">
                                        {product.sale_price
                                            ? formatPrice(product.sale_price)
                                            : 'No sale price'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                                <p className="text-sm font-bold text-emerald-800">
                                    Vendor stock note
                                </p>
                                <p className="mt-1 text-sm leading-6 text-emerald-700">
                                    {stockStatus.note}
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
                    <div
                        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-950/20">
                        <div className="border-b border-slate-100 px-6 py-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                                        Update Product
                                    </p>
                                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                                        Edit product details
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Change public status, regular price, and sale price.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-5 px-6 py-6">
                            <div>
                                <label className="text-sm font-bold text-slate-700">
                                    Public status
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="draft">Draft</option>
                                    <option value="out_of_stock">Out of Stock</option>
                                </select>

                                {errors.status && (
                                    <p className="mt-2 text-sm font-medium text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700">
                                    Regular price
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                                    placeholder="0.00"
                                />

                                {errors.price && (
                                    <p className="mt-2 text-sm font-medium text-red-600">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700">
                                    Sale price
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.sale_price}
                                    onChange={(e) => setData('sale_price', e.target.value)}
                                    className="mt-2 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                                    placeholder="Leave empty if no sale"
                                />

                                {errors.sale_price && (
                                    <p className="mt-2 text-sm font-medium text-red-600">
                                        {errors.sale_price}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <label
                                            htmlFor="is_featured"
                                            className="text-sm font-bold text-slate-700"
                                        >
                                            Featured product
                                        </label>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Show this item in the featured products section.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        id="is_featured"
                                        onClick={() => setData('is_featured', !data.is_featured)}
                                        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${
                                            data.is_featured ? 'bg-emerald-500' : 'bg-slate-300'
                                        }`}
                                        aria-pressed={data.is_featured}
                                    >
                                        <span
                                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                                data.is_featured ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {errors.is_featured && (
                                    <p className="mt-2 text-sm font-medium text-red-600">
                                        {errors.is_featured}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Saving...' : 'Save changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}