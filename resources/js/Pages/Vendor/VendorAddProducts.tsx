import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import VendorNav from '@/Components/VendorNav';

export default function VendorAddProducts() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        short_description: '',
        description: '',
        price: '',
        sale_price: '',
        cost_price: '',
        thumbnail: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('vendor.products.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout header={<VendorNav />}>
            <Head title="Add Product" />

            <div className="py-10">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

                    {/* Card */}
                    <div className="rounded-2xl bg-white shadow-lg dark:bg-zinc-900">
                        <div className="border-b border-gray-200 p-6 dark:border-zinc-800">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Add New Product
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Create a product for your store
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6 p-6">

                            {/* Product Name */}
                            <div>
                                <label className="text-sm font-medium">Product Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border p-3 dark:bg-zinc-800"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="text-sm font-medium">Slug</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="mt-1 w-full rounded-lg border p-3 dark:bg-zinc-800"
                                />
                            </div>

                            {/* Short Description */}
                            <div>
                                <label className="text-sm font-medium">Short Description</label>
                                <input
                                    type="text"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    className="mt-1 w-full rounded-lg border p-3 dark:bg-zinc-800"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 w-full rounded-lg border p-3 dark:bg-zinc-800"
                                />
                            </div>

                            {/* Pricing */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Price</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="mt-1 w-full rounded-lg border p-3 dark:bg-zinc-800"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Sale Price</label>
                                    <input
                                        type="number"
                                        value={data.sale_price}
                                        onChange={(e) => setData('sale_price', e.target.value)}
                                        className="mt-1 w-full rounded-lg border p-3 dark:bg-zinc-800"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Cost Price</label>
                                    <input
                                        type="number"
                                        value={data.cost_price}
                                        onChange={(e) => setData('cost_price', e.target.value)}
                                        className="mt-1 w-full rounded-lg border p-3 dark:bg-zinc-800"
                                    />
                                </div>
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <label className="text-sm font-medium">Thumbnail</label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setData('thumbnail', e.target.files?.[0] || null)
                                    }
                                    className="mt-1 w-full rounded-lg border p-3 dark:bg-zinc-800"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-red-500 px-6 py-3 text-white hover:bg-red-600"
                                >
                                    {processing ? 'Saving...' : 'Create Product'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}