import { useMemo, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import VendorNav from '@/Components/VendorNav';
import { Head } from '@inertiajs/react';

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
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                                >
                                    <div className="aspect-square bg-gray-100">
                                        {product.thumbnail ? (
                                            <img
                                                src={`/storage/${product.thumbnail}`}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2 p-3">
                                        <div>
                                            <h2 className="line-clamp-2 text-sm font-semibold text-gray-900">
                                                {product.name}
                                            </h2>

                                            <p className="mt-0.5 truncate text-xs text-gray-500">
                                                {product.category?.name ?? 'No category'}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between gap-2">
                                            <div>
                                                {product.sale_price ? (
                                                    <>
                                                        <p className="text-sm font-bold text-red-600">
                                                            ₱{product.sale_price}
                                                        </p>
                                                        <p className="text-xs text-gray-400 line-through">
                                                            ₱{product.price}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <p className="text-sm font-bold text-gray-900">
                                                        ₱{product.price}
                                                    </p>
                                                )}
                                            </div>

                                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                {product.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span className="truncate">
                                                {product.sku ?? 'No SKU'}
                                            </span>
                                            <span>{product.stock_quantity} stock</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
                            <p className="text-sm text-gray-500">
                                No products found.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}