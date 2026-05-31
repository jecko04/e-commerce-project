import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import VendorNav from '@/Components/VendorNav';
import { Head, useForm } from '@inertiajs/react';

export default function VendorAddProducts() {
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        sku: '',
        brand: '',
        short_description: '',
        description: '',
        price: '',
        sale_price: '',
        cost_price: '',
        track_inventory: true,
        stock_quantity: 0,
        low_stock_threshold: 5,
        status: 'draft',
        thumbnail: null as File | null,
        meta_title: '',
        meta_description: '',
        is_featured: false,
        published_at: '',
    });

    useEffect(() => {
        if (!data.thumbnail) {
            setThumbnailPreview(null);
            return;
        }

        const imageUrl = URL.createObjectURL(data.thumbnail);
        setThumbnailPreview(imageUrl);

        return () => URL.revokeObjectURL(imageUrl);
    }, [data.thumbnail]);

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const generateSku = (name: string, brand: string) => {
    const brandPart = brand
            ? brand
                .trim()
                .replace(/[^a-zA-Z0-9]/g, '')
                .substring(0, 4)
                .toUpperCase()
            : 'PROD';

    const namePart = name
            ? name
                .trim()
                .split(/\s+/)
                .map((word) => word.substring(0, 3))
                .join('')
                .replace(/[^a-zA-Z0-9]/g, '')
                .substring(0, 8)
                .toUpperCase()
            : 'ITEM';

        return `${brandPart}-${namePart}`;
    };

    const updateProductIdentity = (name: string, brand: string) => {
        setData((currentData) => ({
            ...currentData,
            name,
            brand,
            slug: generateSlug(name),
            sku: generateSku(name, brand),
        }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('vendor.products.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setThumbnailPreview(null);
            },
        });
    };

    return (
        <AuthenticatedLayout header={<VendorNav />}>
            <Head title="Add Product" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-1">
                            <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="mb-4">
                                    <h2 className="text-base font-semibold text-gray-900">
                                        Product Image
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Upload the main product thumbnail.
                                    </p>
                                </div>

                                <label className="block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:border-red-400">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            setData('thumbnail', e.target.files?.[0] || null)
                                        }
                                    />

                                    {thumbnailPreview ? (
                                        <img
                                            src={thumbnailPreview}
                                            alt="Product preview"
                                            className="h-64 w-full rounded-md object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-64 items-center justify-center rounded-md bg-gray-50 text-center">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Click to upload image
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    PNG, JPG, or WEBP
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </label>

                                {errors.thumbnail && (
                                    <p className="mt-2 text-sm text-red-600">{errors.thumbnail}</p>
                                )}
                            </section>

                            <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="mb-4 text-base font-semibold text-gray-900">
                                    Status
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Product Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full rounded-md border-gray-300"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        {errors.status && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.status}
                                            </p>
                                        )}
                                    </div>

                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={data.is_featured}
                                            onChange={(e) =>
                                                setData('is_featured', e.target.checked)
                                            }
                                            className="rounded border-gray-300 text-red-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                            Featured product
                                        </span>
                                    </label>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Published At
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={data.published_at}
                                            onChange={(e) =>
                                                setData('published_at', e.target.value)
                                            }
                                            className="w-full rounded-md border-gray-300"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="space-y-6 lg:col-span-2">
                            <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="mb-4 text-base font-semibold text-gray-900">
                                    Basic Information
                                </h2>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Product Name
                                        </label>
                                        <input
                                            value={data.name}
                                            onChange={(e) => updateProductIdentity(e.target.value, data.brand)}
                                            className="w-full rounded-md border-gray-300"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Slug
                                        </label>
                                        <input
                                            value={data.slug}
                                            readOnly
                                            className="w-full rounded-md border-gray-300 bg-gray-100 text-gray-600"
                                        />
                                        {errors.slug && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.slug}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            SKU
                                        </label>
                                        <input
                                            value={data.sku}
                                            readOnly
                                            className="w-full rounded-md border-gray-300 bg-gray-100 text-gray-600"
                                        />
                                        {errors.sku && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.sku}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Brand
                                        </label>
                                        <input
                                            value={data.brand}
                                            onChange={(e) => setData('brand', e.target.value)}
                                            className="w-full rounded-md border-gray-300"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Short Description
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.short_description}
                                            onChange={(e) =>
                                                setData('short_description', e.target.value)
                                            }
                                            className="w-full rounded-md border-gray-300"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={data.description}
                                            onChange={(e) =>
                                                setData('description', e.target.value)
                                            }
                                            className="w-full rounded-md border-gray-300"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="mb-4 text-base font-semibold text-gray-900">
                                    Pricing
                                </h2>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="w-full rounded-md border-gray-300"
                                        />
                                        {errors.price && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.price}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Sale Price
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.sale_price}
                                            onChange={(e) =>
                                                setData('sale_price', e.target.value)
                                            }
                                            className="w-full rounded-md border-gray-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Cost Price
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.cost_price}
                                            onChange={(e) =>
                                                setData('cost_price', e.target.value)
                                            }
                                            className="w-full rounded-md border-gray-300"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="mb-4 text-base font-semibold text-gray-900">
                                    Inventory
                                </h2>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <label className="flex items-center gap-3 md:col-span-2">
                                        <input
                                            type="checkbox"
                                            checked={data.track_inventory}
                                            onChange={(e) =>
                                                setData('track_inventory', e.target.checked)
                                            }
                                            className="rounded border-gray-300 text-red-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                            Track inventory for this product
                                        </span>
                                    </label>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Stock Quantity
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.stock_quantity}
                                            disabled={!data.track_inventory}
                                            onChange={(e) =>
                                                setData(
                                                    'stock_quantity',
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-full rounded-md border-gray-300 disabled:bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Low Stock Threshold
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.low_stock_threshold}
                                            disabled={!data.track_inventory}
                                            onChange={(e) =>
                                                setData(
                                                    'low_stock_threshold',
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-full rounded-md border-gray-300 disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="mb-4 text-base font-semibold text-gray-900">
                                    SEO
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Meta Title
                                        </label>
                                        <input
                                            value={data.meta_title}
                                            onChange={(e) =>
                                                setData('meta_title', e.target.value)
                                            }
                                            className="w-full rounded-md border-gray-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Meta Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={data.meta_description}
                                            onChange={(e) =>
                                                setData('meta_description', e.target.value)
                                            }
                                            className="w-full rounded-md border-gray-300"
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Creating Product...' : 'Create Product'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}