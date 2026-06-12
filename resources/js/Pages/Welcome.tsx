import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

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
    sale_price?: string | number | null;
    stock_quantity: number;
    status: string;
    is_featured: boolean;
    thumbnail?: string | null;
    category_id?: number | null;
    category?: Category | null;
};

type Props = {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };
    categories: Category[];
    products: Product[];
    featuredProducts: Product[];
    vendorProfile: VendorProfiles | null;
    userProfile: UserProfiles | null;
};

export default function Welcome({
    auth,
    categories,
    products,
    featuredProducts,
    vendorProfile,
    userProfile
}: Props) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const user = auth.user;

    let displayName = '';
    let displayInitial = '';
    let displayImage = null;

    switch (user?.role) {
        case 'vendor':
            displayName = vendorProfile?.store_name || 'ShopX';
            displayImage = vendorProfile?.store_logo
                ? `/storage/${vendorProfile.store_logo}`
                : null;
            break;

        case 'client':
            displayName = userProfile?.nickname || 'User';
            displayImage = userProfile?.profile_photo
                ? `/storage/${userProfile.profile_photo}`
                : null;
            break;

        case 'admin':
            displayName = user.name || 'Admin';
            displayImage = null;
            break;

        default:
            displayName = 'User';
            displayImage = null;
    }

    displayInitial = displayName.charAt(0).toUpperCase();

    const heroProduct = featuredProducts[0];
    const carouselProducts = featuredProducts.slice(1);

    return (
        <>
            <Head title="Shop Smart - Home" />

            <div className="min-h-screen bg-white text-gray-800 dark:text-white">
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
                                className="hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 sm:inline-flex"
                                aria-label="Notifications"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 0 0-12 0v.75a8.967 8.967 0 0 1-2.312 6.022 23.848 23.848 0 0 0 5.455 1.31m5.714 0a3 3 0 0 1-5.714 0" />
                                </svg>
                            </button>

                            {user?.role !== 'vendor' && (
                                <Link
                                    href="#cart"
                                    className="hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 sm:inline-flex"
                                    aria-label="Cart"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a1.5 1.5 0 0 1 1.463 1.175l.383 1.725M7.5 14.25h9.75a1.5 1.5 0 0 0 1.463-1.175l1.087-4.9A1.5 1.5 0 0 0 18.337 6.3H5.482m2.018 7.95L6.15 8.175m1.35 6.075L6.75 17.25h10.5M9 20.25h.008v.008H9v-.008Zm7.5 0h.008v.008H16.5v-.008Z" />
                                    </svg>
                                </Link>
                            )}

                            {user ? (
                                <div className="hidden sm:block">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                            >
                                                <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-black uppercase text-white shadow-sm">
                                                    {displayImage ? (
                                                        <img src={displayImage} alt={displayName} className="h-full w-full object-cover" />
                                                    ) : (
                                                        displayInitial
                                                    )}
                                                </span>

                                                <span className="block max-w-28 truncate text-sm font-semibold text-slate-600">
                                                    {displayName}
                                                </span>

                                                <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content
                                            align="right"
                                            contentClasses="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/80"
                                        >
                                            <div className="border-b border-slate-100 px-4 py-3">
                                                <p className="truncate text-sm font-bold text-slate-950">{displayName}</p>
                                                <p className="truncate text-xs font-medium text-slate-500">{user.email}</p>
                                            </div>

                                            {user.role === 'vendor' && (
                                                <Dropdown.Link href={route('vendor.dashboard')}>Vendor Dashboard</Dropdown.Link>
                                            )}

                                            {user.role === 'admin' && (
                                                <Dropdown.Link href={route('admin.dashboard')}>Admin Dashboard</Dropdown.Link>
                                            )}

                                            {user.role === 'client' && (
                                                <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                                            )}

                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                <div className="hidden items-center gap-2 sm:flex">
                                    <Link href={route('login')} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-700">
                                        Login
                                    </Link>
                                    <Link href={route('register')} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
                                        Sign up
                                    </Link>
                                </div>
                            )}

                            <button
                                onClick={() => setShowingNavigationDropdown((open) => !open)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:hidden"
                                aria-label="Toggle navigation"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </nav>
                    </div>

                    {showingNavigationDropdown && (
                        <div className="border-t border-slate-100 bg-white/95 px-4 pb-4 pt-3 shadow-lg shadow-slate-200/60 sm:hidden">
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/80">
                                {user ? (
                                    <>
                                        <div className="border-b border-slate-100 px-4 py-3">
                                            <p className="truncate text-sm font-bold text-slate-950">{displayName}</p>
                                            <p className="truncate text-xs font-medium text-slate-500">{user.email}</p>
                                        </div>

                                        <div className="py-1">
                                            {user.role === 'vendor' && (
                                                <ResponsiveNavLink href={route('vendor.dashboard')}>Vendor Dashboard</ResponsiveNavLink>
                                            )}

                                            {user.role === 'admin' && (
                                                <ResponsiveNavLink href={route('admin.dashboard')}>Admin Dashboard</ResponsiveNavLink>
                                            )}

                                            {user.role === 'client' && (
                                                <ResponsiveNavLink href={route('dashboard')}>Dashboard</ResponsiveNavLink>
                                            )}

                                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                                Log Out
                                            </ResponsiveNavLink>
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-1">
                                        <ResponsiveNavLink href={route('login')}>Login</ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('register')}>Sign up</ResponsiveNavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="border-t border-slate-100 px-4 py-3 md:hidden">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                </header>

                {categories.length > 0 && (
                    <section id="categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">Browse</p>
                                <h3 className="mt-1 text-xl font-black text-slate-950">Categories</h3>
                            </div>
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

                {featuredProducts.length > 0 && (
                    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-900 shadow-2xl">
                            <div className="grid lg:grid-cols-2">

                                <div className="flex flex-col justify-center p-8 lg:p-12">
                                    <span className="w-fit rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                                        Featured Product
                                    </span>

                                    <h2 className="mt-4 text-3xl font-black text-white lg:text-5xl">
                                        {heroProduct.name}
                                    </h2>

                                    <p className="mt-4 max-w-lg text-slate-300">
                                        {heroProduct.category?.name
                                            ? `Explore our featured ${heroProduct.category.name.toLowerCase()} collection. Carefully selected products offering quality and value.`
                                            : 'Discover one of our most popular and highly recommended products.'}
                                    </p>

                                    <div className="mt-6 flex items-center gap-3">
                                        {heroProduct.sale_price ? (
                                            <>
                                                <span className="text-3xl font-black text-red-400">
                                                    ₱{heroProduct.sale_price}
                                                </span>

                                                <span className="text-lg text-slate-400 line-through">
                                                    ₱{heroProduct.price}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-3xl font-black text-white">
                                                ₱{heroProduct.price}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                                            {heroProduct.stock_quantity} Available
                                        </span>

                                        {heroProduct.sale_price && (
                                            <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-300">
                                                On Sale
                                            </span>
                                        )}

                                        {heroProduct.category?.name && (
                                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                                                {heroProduct.category.name}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-8 flex gap-3">
                                        <Link
                                            href={`/products/${heroProduct.slug}`}
                                            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-100"
                                        >
                                            View Product →
                                        </Link>

                                        <button className="rounded-2xl border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="relative h-[320px] lg:h-[500px]">
                                    {heroProduct.thumbnail ? (
                                        <img
                                            src={`/storage/${heroProduct.thumbnail}`}
                                            alt={heroProduct.name}
                                            className="h-full w-full object-cover transition duration-700 hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-slate-800 text-lg font-bold text-white">
                                            No Image Available
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {carouselProducts.length > 0 && (
                            <>
                                <div className="mt-12 mb-6">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                                        Featured Collection
                                    </p>

                                    <div className="mt-2 flex items-center justify-between">
                                        <h3 className="text-2xl font-black text-slate-950">
                                            More Featured Products
                                        </h3>

                                        <span className="text-sm font-medium text-slate-500">
                                            {carouselProducts.length} Products
                                        </span>
                                    </div>
                                </div>

                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    navigation
                                    autoplay={{
                                        delay: 3500,
                                        disableOnInteraction: false,
                                    }}
                                    spaceBetween={20}
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1.2,
                                        },
                                        640: {
                                            slidesPerView: 2.2,
                                        },
                                        1024: {
                                            slidesPerView: 3.2,
                                        },
                                        1280: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {carouselProducts.map((product) => {
                                        const hasSale = Boolean(product.sale_price);
                                        const isOutOfStock =
                                            product.stock_quantity <= 0;

                                        return (
                                            <SwiperSlide key={product.id}>
                                                <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

                                                    <div className="relative h-56 overflow-hidden">
                                                        {product.thumbnail ? (
                                                            <img
                                                                src={`/storage/${product.thumbnail}`}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
                                                                No Image
                                                            </div>
                                                        )}

                                                        <span className="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-slate-950">
                                                            ★ Featured
                                                        </span>

                                                        {hasSale && (
                                                            <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">
                                                                Sale
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="p-4">
                                                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
                                                            {product.category?.name ??
                                                                'Featured'}
                                                        </p>

                                                        <h4 className="mt-2 line-clamp-2 min-h-[56px] text-lg font-black text-slate-950">
                                                            {product.name}
                                                        </h4>

                                                        <div className="mt-3">
                                                            {hasSale ? (
                                                                <>
                                                                    <span className="text-2xl font-black text-red-600">
                                                                        ₱{product.sale_price}
                                                                    </span>

                                                                    <span className="ml-2 text-sm text-slate-400 line-through">
                                                                        ₱{product.price}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className="text-2xl font-black text-slate-950">
                                                                    ₱{product.price}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="mt-3">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                                                    isOutOfStock
                                                                        ? 'bg-red-100 text-red-700'
                                                                        : 'bg-emerald-100 text-emerald-700'
                                                                }`}
                                                            >
                                                                {isOutOfStock
                                                                    ? 'Out of Stock'
                                                                    : `${product.stock_quantity} Available`}
                                                            </span>
                                                        </div>

                                                        <button
                                                            disabled={isOutOfStock}
                                                            className="mt-4 w-full rounded-2xl bg-slate-950 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {isOutOfStock
                                                                ? 'Unavailable'
                                                                : 'Add to Cart'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </>
                        )}
                    </section>
                )}

                {products.length > 0 && (
                    <section id="products" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">All</p>
                            <h3 className="mt-1 text-xl font-black text-slate-950">All Products</h3>
                        </div>

                        <div className="grid grid-cols-4 gap-5 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
                         {products.map((product) => {
                            const hasSale = Boolean(product.sale_price);
                            const isLowStock =
                                product.stock_quantity > 0 && product.stock_quantity <= 10;
                            const isOutOfStock = product.stock_quantity <= 0;
                        
                            return (
                                <Link
                                    key={product.id}
                                    // href={route('vendor.view-products.show', product.slug)}
                                    className="group overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-sm shadow-slate-200/70 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-200/90 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                    <div
                                        key={product.id}
                                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                            {product.thumbnail ? (
                                                <img
                                                    src={`/storage/${product.thumbnail}`}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-[11px] font-semibold text-slate-400">
                                                    No Image
                                                </div>
                                            )}

                                            {hasSale && (
                                                <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                                                    Sale
                                                </span>
                                            )}

                                            <div className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur">
                                                {product.stock_quantity} left
                                            </div>
                                        </div>

                                        <div className="space-y-2 p-3">
                                            <div>
                                                <h4 className="line-clamp-2 min-h-[2rem] text-xs font-bold leading-4 text-slate-950 group-hover:text-emerald-700">
                                                    {product.name.toLowerCase()}
                                                </h4>
                                            </div>

                                            <div>
                                                {hasSale ? (
                                                    <>
                                                        <p className="truncate text-sm font-black text-red-600">
                                                            ₱{product.sale_price}
                                                        </p>
                                                        <p className="truncate text-[11px] font-medium text-slate-400 line-through">
                                                            ₱{product.price}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <p className="truncate text-sm font-black text-slate-950">
                                                        ₱{product.price}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                disabled={isOutOfStock}
                                                className="w-full rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            );
                         })}
                        </div>
                    </section>

                    
                )}



                <footer className="mt-16 border-t py-10 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} ShopX. All rights reserved.
                </footer>
            </div>
        </>
    );
}