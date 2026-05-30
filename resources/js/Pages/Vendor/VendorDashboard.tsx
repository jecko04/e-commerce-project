import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import VendorNav from '@/Components/VendorNav';

export default function VendorDashboard() {
    return (
        <AuthenticatedLayout
            header={<VendorNav />}
        >
            <Head title="Vendor Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-zinc-900">
                        <div className="p-6 text-gray-900 dark:text-white">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}