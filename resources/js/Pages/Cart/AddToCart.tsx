import { Head, Link } from '@inertiajs/react';
import GuestNav from '@/Components/GuestNav';
import toast from 'react-hot-toast';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';


type Product = {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number | null;
    thumbnail?: string | null;
    stock_quantity: number;
};

type CartItem = {
    id: number;
    product_id: number;
    quantity: number;
    product: Product;
};

type VendorProfiles = {
    store_name: string;
    store_logo: string | null;
};

type UserProfiles = {
    profile_photo: string | null;
    nickname: string;
}


type PageProps = {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    cartItems: CartItem[];
    total: number;

    flash?: {
        success?: string;
        error?: string;
    };

    vendorProfile: VendorProfiles | null;
    userProfile: UserProfiles | null;
};

export default function AddToCart({
    cartItems,
    total,
    vendorProfile,
    userProfile,
}: PageProps) {
    const { flash, auth } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    
    return (
        <>
            <Head title="Shopping Cart" />

            <div className="min-h-screen bg-white">
                <GuestNav auth={auth}  vendorProfile={vendorProfile} userProfile={userProfile}  />

                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                            Cart
                        </p>

                        <h1 className="mt-2 text-3xl font-black text-slate-950">
                            Shopping Cart
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Review your selected items before checkout.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                                    >
                                        <div className="h-28 w-28 overflow-hidden rounded-2xl bg-slate-100">
                                            {item.product.thumbnail ? (
                                                <img
                                                    src={`/storage/${item.product.thumbnail}`}
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-950">
                                                    {item.product.name}
                                                </h3>

                                            {item.product.sale_price ? (
                                                <p className="mt-1 text-emerald-600 font-black">
                                                    ₱{item.product.sale_price}
                                                </p>
                                            ) : (
                                                <p className="mt-1 text-emerald-600 font-black">
                                                    ₱{item.product.price}
                                                </p>
                                            )}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <button className="h-9 w-9 rounded-xl border border-slate-300">
                                                        -
                                                    </button>

                                                    <span className="font-bold">
                                                        {item.quantity}
                                                    </span>

                                                    <button className="h-9 w-9 rounded-xl border border-slate-300">
                                                        +
                                                    </button>
                                                </div>

                                                <button className="text-sm font-bold text-red-600 hover:text-red-700">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center">
                                    <h3 className="text-xl font-bold text-slate-700">
                                        Your cart is empty
                                    </h3>

                                    <p className="mt-2 text-slate-500">
                                        Browse products and add items to your cart.
                                    </p>

                                    <Link
                                        href="/"
                                        className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-black text-slate-950">
                                    Order Summary
                                </h2>

                                <div className="mt-6 space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Subtotal
                                        </span>

                                        <span className="font-bold">
                                            ₱{total.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Shipping
                                        </span>

                                        <span className="font-bold">
                                            Calculated at checkout
                                        </span>
                                    </div>

                                    <hr />

                                    <div className="flex justify-between text-lg">
                                        <span className="font-black">
                                            Total
                                        </span>

                                        <span className="font-black text-emerald-600">
                                            ₱{total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <button className="mt-6 w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white transition hover:bg-emerald-700">
                                    Proceed to Checkout
                                </button>

                                <Link
                                    href="/"
                                    className="mt-3 block text-center text-sm font-bold text-slate-500 hover:text-slate-700"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}