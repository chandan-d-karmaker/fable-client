'use client';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';

const EbookActions = ({ handleBookmark, uploader, user }) => {
    
    const onBookmarkClick = async () => {

        const result = await handleBookmark();
        
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className='flex gap-4 mt-4'>
            <Button isDisabled={uploader === user?.id} className='text-background'>
                {uploader === user?.id ? 'You cannot buy your own book' : 'Purchase'}
            </Button>
            <Button className='text-background'>Wishlist</Button>
            <Button onClick={onBookmarkClick} className='text-background'>Add to bookmark</Button>
        </div>
    );
};

export default EbookActions;