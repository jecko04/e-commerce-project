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
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}