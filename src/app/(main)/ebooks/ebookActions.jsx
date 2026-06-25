'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

const EbookActions = ({ ebookId, handleBookmark, uploader, user, isPurchased }) => {
    // Add a loading state so the user can't click purchase twice
    const [isPurchasing, setIsPurchasing] = useState(false);
    const router = useRouter();

    const onBookmarkClick = async () => {

        if (!user) {
            toast.error("Please log in to add bookmarks.");
            router.push('/auth/login');
            return;
        }
        const result = await handleBookmark();

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    const onPurchaseClick = async () => {

        if (!user) {
            toast("Please log in to purchase this book.");
            // passed a callback URL so they return to this book after logging in
            router.push(`/auth/login?callbackUrl=/ebooks/${ebookId}`);
            return;
        }

        setIsPurchasing(true);
        try {
            // Call the dynamic API route we created in the previous step
            // Make sure the path matches your actual API route (e.g., '/api/checkout_sessions')
            const res = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Pass the ID to the backend so it can fetch the real price securely
                body: JSON.stringify({ ebookId }),
            });

            const data = await res.json();

            // If the API returns the Stripe URL successfully, redirect the user!
            if (res.ok && data.url) {
                window.location.href = data.url;
            } else {
                toast.error(data.error || "Failed to initialize checkout");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsPurchasing(false);
        }
    };

    return (
        <div className='flex gap-4 mt-4'>
            {/* Replaced the form with our custom onClick handler */}
            <Button
                onClick={onPurchaseClick}
                isLoading={isPurchasing}
                isDisabled={uploader === user?.id || isPurchased}
                className='text-background bg-primary' // Added a color so it stands out
            >
                {uploader === user?.id && 'You cannot buy your own book'}
                {isPurchased ? 'Already Purchased' : "Purchase"}
            </Button>

            <Button className='text-background'>Wishlist</Button>
            <Button onClick={onBookmarkClick} className='text-background'>Add to bookmark</Button>
        </div>
    );
};

export default EbookActions;