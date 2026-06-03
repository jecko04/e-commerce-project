import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import VendorNav from '@/Components/VendorNav';
import { useState } from 'react';

type Title = {
    title: string;
};

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
    cost_price?: string | number | null;
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

export default function VendorInventory({
    products = [],
    categories = [],
    title,
}: VendorProductsProps & Title) {
    const lowStockLimit = 10;

    const totalProducts = products.length;
    const lowStockCount = products.filter(
        (product) => product.stock_quantity > 0 && product.stock_quantity <= lowStockLimit
    ).length;
    const outOfStockCount = products.filter(
        (product) => product.stock_quantity <= 0
    ).length;

    // const [categoryId, setCategoryId] = useState('');
    

    const getStockLabel = (quantity: number) => {
        if (quantity <= 0) {
            return {
                text: 'Out of Stock',
                className: 'bg-red-100 text-red-700 ring-red-200',
            };
        }

        if (quantity <= lowStockLimit) {
            return {
                text: 'Needs Restock',
                className: 'bg-amber-100 text-amber-700 ring-amber-200',
            };
        }

        return {
            text: 'In Stock',
            className: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
        };
    };

    return (
        <AuthenticatedLayout header={<VendorNav />}>
            <Head title={title} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mb-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">Total Products</p>
                            <p className="mt-2 text-3xl font-semibold text-gray-900">{totalProducts}</p>
                        </div>

                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                            <p className="text-sm font-medium text-amber-700">Needs Restock</p>
                            <p className="mt-2 text-3xl font-semibold text-amber-900">{lowStockCount}</p>
                        </div>

                        <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
                            <p className="text-sm font-medium text-red-700">Out of Stock</p>
                            <p className="mt-2 text-3xl font-semibold text-red-900">{outOfStockCount}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Product
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Cost
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            SKU
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Stock
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Availability
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {products.length > 0 ? (
                                        products.map((product) => {
                                            const stockLabel = getStockLabel(product.stock_quantity);

                                            return (
                                                <tr key={product.id} className="transition hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                                                                {product.thumbnail ? (
                                                                    <img
                                                                        src={`/storage/${product.thumbnail}`}
                                                                        alt={product.name}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-gray-400">
                                                                        No Image
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {product.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {product.brand || 'No brand'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {product.cost_price || null}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {product.category?.name || 'Uncategorized'}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {product.sku || 'N/A'}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {product.stock_quantity}
                                                        </span>
                                                        <span className="ml-1 text-sm text-gray-500">units</span>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${stockLabel.className}`}
                                                        >
                                                            {stockLabel.text}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 text-right">
                                                        {product.stock_quantity <= lowStockLimit ? (
                                                            <Link
                                                                href="#"
                                                                className="inline-flex items-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
                                                            >
                                                                Restock
                                                            </Link>
                                                        ) : (
                                                            <span className="text-sm text-gray-400">
                                                                No action needed
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-12 text-center text-sm text-gray-500"
                                            >
                                                No inventory items found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}