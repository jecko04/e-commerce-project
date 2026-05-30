import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';

export default function Products({ auth }: PageProps<{ title: string }>) {

    const [search, setSearch] = useState('');

    const products = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 3499,
            image: 'https://via.placeholder.com/300',
            stock: 24,
        },
        {
            id: 2,
            name: 'Gaming Mouse',
            price: 1299,
            image: 'https://via.placeholder.com/300',
            stock: 10,
        },
        {
            id: 3,
            name: 'Mechanical Keyboard',
            price: 2899,
            image: 'https://via.placeholder.com/300',
            stock: 5,
        },
        {
            id: 4,
            name: 'Smart Watch',
            price: 4999,
            image: 'https://via.placeholder.com/300',
            stock: 15,
        },
    ];

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const addToCart = (productId: number) => {
        console.log('Added to cart:', productId);
        alert('Added to cart!');
    };

    return (
        <>
            <Head title="ShopX - Products" />

            <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">

                {/* HEADER */}
                <header className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto border-b dark:border-zinc-800">
                    <h1 className="text-2xl font-bold">
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

                {/* SEARCH BAR */}
                <div className="max-w-7xl mx-auto px-6 mt-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                {/* PRODUCT GRID */}
                <section className="max-w-7xl mx-auto px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition dark:border-zinc-800"
                        >

                            {/* IMAGE */}
                            <div className="h-48 bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="p-4">

                                <h3 className="font-semibold text-lg">
                                    {product.name}
                                </h3>

                                <p className="text-red-500 font-bold mt-1">
                                    ₱{product.price.toLocaleString()}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Stock: {product.stock}
                                </p>

                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                                >
                                    Add to Cart
                                </button>

                            </div>
                        </div>
                    ))}

                </section>

                {/* EMPTY STATE */}
                {filteredProducts.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        No products found
                    </div>
                )}

            </div>
        </>
    );
}