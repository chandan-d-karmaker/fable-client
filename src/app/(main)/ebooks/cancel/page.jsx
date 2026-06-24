import { getUserRole } from '@/lib/core/session';
import { Button } from '@heroui/react';
import { XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function CheckoutCancelPage() {

    const role = await getUserRole();
    // console.log("user role in fn", role);

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-background border border-default-200 shadow-sm p-8 text-center space-y-6">

                {/* Icon */}
                <div className="flex justify-center">
                    <XCircle className="w-16 h-16 text-danger" />
                </div>

                {/* Text Block */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground playfair">Checkout Canceled</h1>
                    <p className="text-default-500 text-sm md:text-base">
                        You&apos;ve canceled the checkout process. Don&apos;t worry—you have not been charged anything.
                    </p>
                </div>

                {/* Info Box */}
                <div className="bg-default-50 p-4 border border-default-100 text-sm">
                    <p className="text-default-500">
                        Changed your mind? You can always come back and purchase this book later when you are ready.
                    </p>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col gap-3">
                    <Link href={`/dashboard/${role}`} className="w-full">
                        {/* Using a flat or bordered variant here feels less aggressive than a solid colored button */}
                        <Button color="primary" variant="flat" className="w-full font-medium rounded-none">
                            Go Back <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}