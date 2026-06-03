import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import VendorNav from '@/Components/VendorNav';
import { Head, Link } from '@inertiajs/react';

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
    thumbnail?: string | null;
    category?: Category | null;
};

type VendorViewProductProps = {
    title: string;
    product: Product;
};

export default function VendorViewProduct({
    title,
    product,
}: VendorViewProductProps) {
    const lowStockLimit = 10;

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
                            <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${stockStatus.className}`}
                            >
                                {stockStatus.label}
                            </span>

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
        </AuthenticatedLayout>
    );
}