import { PageProps } from '@/types';
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

                {/* NAVBAR */}
                <header className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Shop<span className="text-red-500">X</span>
                    </h1>

                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <>
                                <Link
                                    href={getDashboardRoute()}
                                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="hover:text-red-500">
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* HERO */}
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
                </section>

                {categories.length > 0 && (
                    <section id="categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                                Browse
                            </p>
                            <h3 className="mt-1 text-xl font-black text-slate-950">
                                Categories
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {categories.map((category) => (
                                <a
                                    key={category.id}
                                    href={`#category-${category.id}`}
                                    className="group rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
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