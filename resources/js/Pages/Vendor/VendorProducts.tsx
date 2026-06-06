import { useMemo, useState } from 'react';
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
    is_featured: boolean;
    thumbnail?: string | null;
    category_id?: number | null;
    category?: Category | null;
};

type VendorProductsProps = {
    products: Product[];
    categories: Category[];
};

export default function VendorProducts({
    products = [],
    categories = [],
}: VendorProductsProps) {
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.sku?.toLowerCase().includes(search.toLowerCase()) ||
                product.brand?.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                categoryId === '' || String(product.category_id) === categoryId;

            return matchesSearch && matchesCategory;
        });
    }, [products, search, categoryId]);

    return (
        <AuthenticatedLayout header={<VendorNav />}>
            <Head title="My Products" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                My Products
                            </h1>
                            <p className="text-sm text-gray-500">
                                {filteredProducts.length} product
                                {filteredProducts.length !== 1 ? 's' : ''} found
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full rounded-md border-gray-300 text-sm sm:w-64"
                            />

                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full rounded-md border-gray-300 text-sm sm:w-52"
                            >
                                <option value="">All categories</option>

                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

           {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {filteredProducts.map((product) => {
                    const hasSale = Boolean(product.sale_price);
                    const isLowStock =
                        product.stock_quantity > 0 && product.stock_quantity <= 10;
                    const isOutOfStock = product.stock_quantity <= 0;
                    const isFeatured = Boolean(product.is_featured);

                    return (
                        <Link
                            key={product.id}
                            href={route('vendor.view-products.show', product.slug)}
                            className="group overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-sm shadow-slate-200/70 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-200/90 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                            <div className="relative aspect-square overflow-hidden bg-slate-100">
                                {product.thumbnail ? (
                                    <img
                                        src={`/storage/${product.thumbnail}`}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition duration-300"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs font-semibold text-slate-400">
                                        No image
                                    </div>
                                )}

                                <div className="absolute left-3 top-3 flex flex-wrap gap-2">

                                    {hasSale && (
                                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-200">
                                            Sale
                                        </span>
                                    )}

                                    {isFeatured && (
                                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                            Featured
                                        </span>
                                    )}  

                                    {isOutOfStock ? (
                                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-200">
                                            Out of stock
                                        </span>
                                    ) : isLowStock ? (
                                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-200">
                                            Low stock
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                            In stock
                                        </span>
                                    )}
                                </div>

                                <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
                                    {product.stock_quantity} left
                                </div>
                            </div>

                            <div className="space-y-4 p-4">
                                <div>
                                    <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                                        {product.category?.name ?? 'No category'}
                                    </p>

                                    <h2 className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-5 text-slate-950 transition group-hover:text-emerald-700">
                                        {product.name}
                                    </h2>

                                    <p className="mt-1 truncate text-xs font-medium text-slate-500">
                                        {product.brand ?? 'No brand'} · {product.sku ?? 'No SKU'}
                                    </p>
                                </div>

                                <div className="flex items-end justify-between gap-3">
                                    <div>
                                        {hasSale ? (
                                            <>
                                                <p className="text-lg font-bold text-red-600">
                                                    ₱{product.sale_price}
                                                </p>
                                                <p className="text-xs font-medium text-slate-400 line-through">
                                                    ₱{product.price}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-lg font-bold text-slate-950">
                                                ₱{product.price}
                                            </p>
                                        )}
                                    </div>

                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold capitalize text-slate-600">
                                        {product.status}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                    <span className="text-xs font-semibold text-slate-400">
                                        View details
                                    </span>

                                    <span className="text-sm font-bold text-emerald-600 transition group-hover:translate-x-1">
                                        →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm">
                <p className="text-sm font-bold text-slate-700">
                    No products found.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or category filter.
                </p>
            </div>
        )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}