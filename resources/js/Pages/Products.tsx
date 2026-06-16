import { Head, Link } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import GuestNav from '@/Components/GuestNav';

type VendorProfiles = {
    store_name: string;
    store_logo: string | null;
};

type UserProfiles = {
    profile_photo: string | null;
    nickname: string;
}

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
    description: string | null;
    sale_price?: string | number | null;
    stock_quantity: number;
    status: string;
    is_featured: boolean;
    thumbnail?: string | null;
    category?: Category | null;
};

type ViewProductProps = {
    title: string;
    product: Product;
    relatedProducts: Product[];
    vendorProfile: VendorProfiles | null;
    userProfile: UserProfiles | null;
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

export default function ViewProduct({
    title,
    product,
    relatedProducts,
    vendorProfile,
    userProfile
}: ViewProductProps) {
    const lowStockLimit = 10;

const { flash, auth } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

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
        <>
            <Head title={title} />

            <GuestNav auth={auth} vendorProfile={vendorProfile} userProfile={userProfile} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('home')}
                            className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                        >
                            Back to products
                        </Link>

                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
                            Product View
                        </p>

                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                            {product.name}
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Review product details, pricing, and stock availability.
                        </p>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-[550px_1fr]">

                    {/* Product Image */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                        <div className="aspect-square overflow-hidden bg-slate-100">
                            {product.thumbnail ? (
                                <img
                                    src={`/storage/${product.thumbnail}`}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                    No Image Available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>

                        {/* Category */}
                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                            {product.category?.name ?? 'Uncategorized'}
                        </span>

                        {/* Product Name */}
                        <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950">
                            {product.name}
                        </h1>

                        {/* Brand */}
                        <p className="mt-2 text-sm text-slate-500">
                            Brand:
                            <span className="ml-1 font-semibold text-slate-700">
                                {product.brand ?? 'No Brand'}
                            </span>
                        </p>

                        {/* Price */}
                        <div className="mt-8 rounded-3xl bg-slate-50 p-6">
                            {product.sale_price ? (
                                <div>
                                    <span className="text-5xl font-black text-red-600">
                                        {formatPrice(product.sale_price)}
                                    </span>

                                    <span className="ml-4 text-2xl text-slate-400 line-through">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-5xl font-black text-slate-950">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                        </div>

                        {/* Stock */}
                        <div className="mt-6 flex items-center gap-3">
                            <span
                                className={`rounded-full px-3 py-1 text-sm font-bold ${
                                    product.stock_quantity > 0
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-red-100 text-red-700'
                                }`}
                            >
                                {product.stock_quantity > 0
                                    ? 'In Stock'
                                    : 'Out of Stock'}
                            </span>

                            {product.stock_quantity > 0 && (
                                <span className="text-sm text-slate-500">
                                    {product.stock_quantity} available
                                </span>
                            )}
                        </div>

                        {/* SKU */}
                        <div className="mt-6 border-t border-slate-200 pt-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">
                                    SKU
                                </span>

                                <span className="font-semibold text-slate-950">
                                    {product.sku ?? 'N/A'}
                                </span>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-8">
                            <p className="mb-3 text-sm font-semibold text-slate-700">
                                Quantity
                            </p>

                            <div className="flex items-center gap-3">
                                <button
                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100"
                                >
                                    -
                                </button>

                                <span className="w-10 text-center font-bold">
                                    1
                                </span>

                                <button
                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">

                            <button
                                disabled={product.stock_quantity <= 0}
                                className="flex-1 rounded-2xl border-2 border-emerald-600 bg-white py-4 font-bold text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Add To Cart
                            </button>

                            <button
                                disabled={product.stock_quantity <= 0}
                                className="flex-1 rounded-2xl bg-emerald-600 py-4 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Buy Now
                            </button>

                        </div>

                        {/* Description */}
                        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
                            <h2 className="mb-4 text-xl font-black text-slate-950">
                                Product Information
                            </h2>

                            <div className="space-y-3 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Category</span>
                                    <span className="font-semibold">
                                        {product.category?.name ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Brand</span>
                                    <span className="font-semibold">
                                        {product.brand ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>SKU</span>
                                    <span className="font-semibold">
                                        {product.sku ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Description</span>
                                    <span className="font-semibold">
                                        {product.description ?? 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </div>
            </div>

            <section className="mt-16">
                <div className="mb-6">
                    <h2 className="text-2xl font-black text-slate-950">
                        Related Products
                    </h2>

                    <p className="text-sm text-slate-500">
                        Products you might also like
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                    {relatedProducts.map((item) => (
                        <Link
                            key={item.id}
                            href={route('view-products.show', item.slug)}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                {item.thumbnail ? (
                                    <img
                                        src={`/storage/${item.thumbnail}`}
                                        alt={item.name}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="p-3">
                                <p className="truncate text-[10px] font-bold uppercase text-emerald-600">
                                    {item.category?.name}
                                </p>

                                <h3 className="mt-1 line-clamp-2 min-h-[32px] text-xs font-bold text-slate-950">
                                    {item.name}
                                </h3>

                                <p className="mt-2 text-sm font-black text-emerald-600">
                                    {item.sale_price
                                        ? formatPrice(item.sale_price)
                                        : formatPrice(item.price)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
       </>

    );
}