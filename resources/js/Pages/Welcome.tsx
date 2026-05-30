import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
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
                                    href={route('dashboard')}
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

                {/* CATEGORIES */}
                <section id="categories" className="max-w-7xl mx-auto px-6 py-12">
                    <h3 className="text-2xl font-semibold mb-6">Categories</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Electronics', 'Fashion', 'Home', 'Gaming'].map((cat) => (
                            <div
                                key={cat}
                                className="p-6 rounded-xl border hover:shadow-lg transition"
                            >
                                <p className="font-medium">{cat}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PRODUCTS */}
                <section id="products" className="max-w-7xl mx-auto px-6 py-12">
                    <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="border rounded-xl p-4 hover:shadow-lg transition"
                            >
                                <div className="h-40 bg-gray-100 dark:bg-zinc-800 rounded-lg"></div>

                                <h4 className="mt-4 font-semibold">Product Name</h4>
                                <p className="text-sm text-gray-500">₱1,999.00</p>

                                <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="border-t mt-16 py-10 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} ShopX. All rights reserved.
                </footer>
            </div>
        </>
    );
}