import BookCard from '@/components/shared/BookCard';
import { getBookmarksByUser } from '@/lib/api/bookmarks';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import * as motion from "motion/react-client";

const BookMarkPage = async () => {

    const user = await getUserSession();
    console.log(user);

    const bookmarks = await getBookmarksByUser(user.id);
    console.log(bookmarks);

    return (
        <div className='my-10'>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h1 className='text-4xl font-semibold text-center'>Bookmarked Ebooks</h1>
                <p className='text-muted text-center'>Read now or later, all here!</p>
            </motion.div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10'>
                {
                    bookmarks.map((book, index) => (
                        <motion.div key={book._id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }} // Staggers each card by 0.1s
                            viewport={{ once: true }}>

                            <BookCard book={book} />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
};

export default BookMarkPage;