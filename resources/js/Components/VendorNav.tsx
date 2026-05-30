import { Link } from '@inertiajs/react';

export default function VendorNav() {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                Vendor Dashboard
            </h2>

            <nav className="flex items-center gap-2 overflow-x-auto">
                <Link
                    href="/vendor/dashboard"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                >
                    Dashboard
                </Link>

                <Link
                    href="/vendor/products"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                >
                    Products
                </Link>

                <Link
                    href={route('vendor.add-product')}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                    Add Product
                </Link>

                <Link
                    href="/vendor/orders"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                >
                    Orders
                </Link>

                <Link
                    href="/vendor/inventory"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                >
                    Inventory
                </Link>

                <Link
                    href="/vendor/earnings"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                >
                    Earnings
                </Link>

                <Link
                    href="/vendor/reviews"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                >
                    Reviews
                </Link>
            </nav>
        </div>
    );
}