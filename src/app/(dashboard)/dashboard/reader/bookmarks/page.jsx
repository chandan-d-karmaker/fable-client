import BookCard from '@/components/shared/BookCard';
import { getBookmarksByUser } from '@/lib/api/bookmarks';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import * as motion from "motion/react-client";
import { Button } from '@heroui/react';
import Link from 'next/link';

const BookMarkPage = async () => {

    const user = await getUserSession();
    console.log(user);

    const bookmarks = await getBookmarksByUser(user.id);
    console.log(bookmarks);

    return (
        <div className='max-w-7xl mx-auto p-6 my-10'>

            <div className='mb-8'>
                <h1 className='text-4xl font-semibold text-center'>Bookmarked Ebooks</h1>
                <p className='text-muted text-center'>Read now or later, all here!</p>

            </div>

            <div>

                {bookmarks.length === 0 ? (
                    <div className='bg-contain1 p-6 border space-y-4'>
                        <h1>No bookmarks yet!</h1>
                        <Link href='/ebooks'>
                            <Button>Browse Now</Button>
                        </Link>
                    </div>

                ) : (<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10'>
                    {
                        bookmarks.map((book, index) => (
                            <motion.div key={book._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}>

                                <BookCard book={book} />
                            </motion.div>
                        ))
                    }
                </div>)}

            </div>
        </div>
    );
};

export default BookMarkPage;