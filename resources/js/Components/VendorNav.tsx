import { Link } from '@inertiajs/react';

const navItems = [
    { label: 'Dashboard', href: '/vendor/dashboard' },
    { label: 'Products', href: route('vendor.products.index') },
    { label: 'Orders', href: '/vendor/orders' },
    { label: 'Inventory', href: route('vendor.inventory.index') },
    { label: 'Earnings', href: '/vendor/earnings' },
    { label: 'Reviews', href: '/vendor/reviews' },
];

export default function VendorNav() {
    return (
        <div className="flex flex-col gap-5 rounded-3xl border border-white/80 bg-white/75 p-5 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                    Seller Workspace
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                    Vendor Dashboard
                </h2>
            </div>

            <nav className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 p-1.5 shadow-inner">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
                    >
                        {item.label}
                    </Link>
                ))}

                <Link
                    href={route('vendor.add-product')}
                    className="whitespace-nowrap rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-emerald-700/20"
                >
                    Add Product
                </Link>
            </nav>
        </div>
    );
}
