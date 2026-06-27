'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Fable App Error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-background text-foreground">
            <div className="max-w-md w-full p-8 border border-default shadow-2xl space-y-6">

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Oops! We lost the page.
                    </h2>
                    <p className="text-sm text-foreground">
                        Something went wrong while trying to load this chapter of Fable. Don&apos;t worry, it&apos;s not you, it&apos;s us.
                    </p>
                </div>

                
                <div className="bg-content1 border flex items-center justify-center p-3 text-left overflow-hidden">
                    <p className="text-md text-red-500 font-mono">
                        {error?.message || "An unknown error occurred"}
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                    <Button
                        variant="outline"
                        className="rounded-none font-medium w-full"
                        onPress={
                            
                            () => reset()
                        }
                    >
                        Try again
                    </Button>
                    <Link href='/' className='w-full'>
                        <Button
                            variant="outline"
                            className="rounded-none font-medium w-full"
                        >
                            Go Home
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}