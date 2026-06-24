import { addBookmark } from '@/lib/actions/ebooks';
import { getEbookById } from '@/lib/api/ebooks';
import { getUserSession } from '@/lib/core/session';
import { Button, Chip } from '@heroui/react';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';
import EbookActions from '../ebookActions';

const EbookDetailsPage = async ({ params }) => {

    const { id } = await params;
    console.log(id);
    const ebook = await getEbookById(id);
    console.log(ebook);
    const user = await getUserSession();
    console.log(user);

    const uploader = ebook.addedBy;


    const handleBookmark = async () => {
        'use server'
        const bookmarkData = {
            ...ebook,
            user: user.id
        }

        const res = await addBookmark(bookmarkData)
        if (res.insertedId) {
            return { success: true, message: `${ebook.title} added to your bookmark!` };
        } else {
            return { success: false, message: "Something went wrong!" };
        }

    }

    // const role = user?.role;
    // console.log(role);

    const formattedDate = format(new Date(ebook?.createdAt), 'd MMM yyyy').toUpperCase();

    return (
        <div className='max-w-7xl mx-auto gap-12 p-6 flex md:flex-row flex-col items-center justify-around border'>
            <div className='w-1/2'>
                <Image src={ebook.image} alt='ebook.title' width={100} height={100} className='max-h-screen w-full'></Image>
            </div>
            <div className='w-full space-y-4'>
                <div>
                    <h1 className='text-4xl font-bold! playfair'>{ebook.title}</h1>
                </div>

                {/* category */}
                <div>
                    <Chip color="success">{ebook.genre}</Chip>
                </div>
                
                <p className="text-md font-medium text-foreground-300">Price: ${ebook.price}</p>

                {/* review */}
                <div className='space-y-4'>
                    <p className='text-foreground'><span className='font-bold'>Description:</span> {ebook.description}</p>
                </div>

                <div>
                    <p>Date Uploaded: <span className='font-semibold'>{formattedDate}</span> </p>
                </div>

                {/* <div className='flex gap-4 mt-4'>
                    <Button isDisabled={uploader === user.id} className='text-background'>{uploader === user.id ? 'You can not buy your own book' : 'Purchase'}</Button>
                    <Button className='text-background'>Wishlist</Button>
                    <Button onClick={handleBookmark} className='text-background'>Add to bookmark</Button>
                </div> */}

                <EbookActions ebookId={id} handleBookmark={handleBookmark} uploader={uploader} user={user} />
            </div>
        </div >
    );
};

export default EbookDetailsPage;