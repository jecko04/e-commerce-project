import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

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

type Props = {
    auth: PageProps['auth'];
    categories: Category[];
    products: Product[];
};


export default function Welcome({
    auth,
    categories,
    products
}: Props) {

    const [showProfileMenu, setShowProfileMenu] = useState(false);


const getDashboardRoute = () => {
    if (!auth.user) return route('login');

    switch (auth.user.role) {
        case 'client':
            return route('dashboard');
        case 'vendor':
            return route('vendor.dashboard');
        case 'admin':
            return route('admin.dashboard');
        default:
            return route('home'); 
    }
};


    return (
        <>
            <Head title="Shop Smart - Home" />

            <div className="min-h-screen bg-white text-gray-800 dark:bg-black dark:text-white">

                <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
                    <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex shrink-0 items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-900/20">
                                X
                            </span>
                            <span className="hidden sm:block">
                                <span className="block text-base font-bold tracking-tight text-slate-950">
                                    ShopX
                                </span>
                                <span className="block text-xs font-medium uppercase tracking-[0.18em] text-emerald-600">
                                    Commerce Hub
                                </span>
                            </span>
                        </Link>

                        <div className="hidden flex-1 md:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm font-medium text-slate-700 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                                />

                                <svg
                                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <nav className="ml-auto flex items-center gap-2">
                            <button
                                type="button"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                aria-label="Notifications"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 0 0-12 0v.75a8.967 8.967 0 0 1-2.312 6.022 23.848 23.848 0 0 0 5.455 1.31m5.714 0a3 3 0 0 1-5.714 0" />
                                </svg>
                            </button>

                            <Link
                                href="#cart"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                aria-label="Cart"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a1.5 1.5 0 0 1 1.463 1.175l.383 1.725M7.5 14.25h9.75a1.5 1.5 0 0 0 1.463-1.175l1.087-4.9A1.5 1.5 0 0 0 18.337 6.3H5.482m2.018 7.95L6.15 8.175m1.35 6.075L6.75 17.25h10.5M9 20.25h.008v.008H9v-.008Zm7.5 0h.008v.008H16.5v-.008Z" />
                                </svg>
                            </Link>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowProfileMenu((open) => !open)}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-bold uppercase text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                    aria-label="Profile menu"
                                >
                                    {auth.user ? auth.user.name.charAt(0) : 'G'}
                                </button>

                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/80">
                                        {auth.user ? (
                                            <>
                                                <div className="border-b border-slate-100 px-4 py-3">
                                                    <p className="text-sm font-bold text-slate-950">
                                                        {auth.user.name}
                                                    </p>
                                                    <p className="truncate text-xs font-medium text-slate-500">
                                                        {auth.user.email}
                                                    </p>
                                                </div>

                                                <Link
                                                    href={getDashboardRoute()}
                                                    className="block px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700"
                                                >
                                                    Dashboard
                                                </Link>

                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                                >
                                                    Logout
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route('login')}
                                                    className="block px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700"
                                                >
                                                    Login
                                                </Link>

                                                <Link
                                                    href={route('register')}
                                                    className="block px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700"
                                                >
                                                    Sign up
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>

                    <div className="border-t border-slate-100 px-4 py-3 md:hidden">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                </header>

                {/* HERO
                <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Discover Products <br />
                            That Fit Your Lifestyle
                        </h2>

                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Shop the latest trends, gadgets, and essentials all in one place.
                            Fast delivery, secure payments, and trusted sellers.
                        </p>

                        <div className="mt-6 flex gap-4">
                            <a
                                href={route('products.index')}
                                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Shop Now
                            </a>

                            <a
                                href="#categories"
                                className="px-6 py-3 border rounded-lg hover:border-red-500"
                            >
                                Explore Categories
                            </a>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-tr from-red-500 to-orange-400 h-72 md:h-96 shadow-lg"></div>
                </section> */}

                {categories.length > 0 && (
                    <section id="categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                                    Browse
                                </p>
                                <h3 className="mt-1 text-xl font-black text-slate-950">
                                    Categories
                                </h3>
                            </div>

                            <p className="hidden text-xs font-semibold text-slate-400 sm:block">
                                Scroll to explore
                            </p>
                        </div>

                        <div className="-mx-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div className="flex gap-3">
                                {categories.map((category) => (
                                    <a
                                        key={category.id}
                                        href={`#category-${category.id}`}
                                        className="group min-w-[130px] snap-start rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg sm:min-w-[150px]"
                                    >
                                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-sm font-black uppercase text-emerald-700 transition group-hover:bg-emerald-100">
                                            {category.name.charAt(0)}
                                        </div>

                                        <p className="truncate text-xs font-bold text-slate-700 transition group-hover:text-emerald-700">
                                            {category.name}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {products.filter((product) => product.is_featured && product.status === 'active').length > 0 && (
                    <section id="products" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                                    Featured
                                </p>
                                <h3 className="mt-1 text-xl font-black text-slate-950">
                                    Featured Products
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                            {products
                                .filter((product) => product.is_featured && product.status === 'active')
                                .map((featuredProduct) => {
                                    const hasSale = Boolean(featuredProduct.sale_price);
                                    const isLowStock =
                                        featuredProduct.stock_quantity > 0 &&
                                        featuredProduct.stock_quantity <= 10;
                                    const isOutOfStock = featuredProduct.stock_quantity <= 0;

                                    return (
                                        <div
                                            key={featuredProduct.id}
                                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                                {featuredProduct.thumbnail ? (
                                                    <img
                                                        src={`/storage/${featuredProduct.thumbnail}`}
                                                        alt={featuredProduct.name}
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-[11px] font-semibold text-slate-400">
                                                        No Image
                                                    </div>
                                                )}

                                                <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
                                                    {hasSale && (
                                                        <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                                                            Sale
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur">
                                                    {featuredProduct.stock_quantity} left
                                                </div>
                                            </div>

                                            <div className="space-y-2 p-3">
                                                <div>
                                                    <h4 className="line-clamp-2 min-h-[2rem] text-xs font-bold leading-4 text-slate-950 group-hover:text-emerald-700">
                                                        {featuredProduct.name}
                                                    </h4>

                                                    <p className="mt-1 truncate text-[11px] font-medium text-slate-500">
                                                        {featuredProduct.category?.name ?? 'Featured item'}
                                                    </p>
                                                </div>

                                                <div>
                                                    {hasSale ? (
                                                        <>
                                                            <p className="truncate text-sm font-black text-red-600">
                                                                ₱{featuredProduct.sale_price}
                                                            </p>
                                                            <p className="truncate text-[11px] font-medium text-slate-400 line-through">
                                                                ₱{featuredProduct.price}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <p className="truncate text-sm font-black text-slate-950">
                                                            ₱{featuredProduct.price}
                                                        </p>
                                                    )}
                                                </div>

                                                <button className="w-full rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                                                    {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>
                )}
                

                {/* FOOTER */}
                <footer className="border-t mt-16 py-10 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} ShopX. All rights reserved.
                </footer>
            </div>
        </>
    );
}