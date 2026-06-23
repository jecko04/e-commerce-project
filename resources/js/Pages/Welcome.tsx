import { Head, Link } from '@inertiajs/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import GuestNav from '@/Components/GuestNav';

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
    const heroProduct = featuredProducts[0];
    const carouselProducts = featuredProducts.slice(1);

    return (
        <>
            <Head title="Shop Smart - Home" />

            <div className="min-h-screen bg-white text-gray-800 dark:text-white">
                <GuestNav auth={auth} vendorProfile={vendorProfile} userProfile={userProfile} />

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
                                            href={route('view-products.show', heroProduct.slug)}
                                            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-100"
                                        >
                                            View Product →
                                        </Link>
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
                                                <Link
                                                    key={product.id}
                                                    href={route('view-products.show', product.slug)}
                                                    className="group overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-sm shadow-slate-200/70 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-200/90 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                                >   
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
                                                    </div>
                                                </div>
                                                </Link>
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
                                    href={route('view-products.show', product.slug)}
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