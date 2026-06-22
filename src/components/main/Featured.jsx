import { getFeatEbooks } from '@/lib/api/ebooks';
import React from 'react';
import BookCard from '../shared/BookCard';
import * as motion from "motion/react-client";

const Featured = async () => {

    const books = await getFeatEbooks();
    console.log(books);
    return (
        <div className='my-10'>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h1 className='text-4xl font-semibold text-center'>Featured Ebooks</h1>
                <p className='text-muted text-center'>Highest purchased from last month</p>
            </motion.div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10'>
                {
                    books.map((book, index) => (
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

export default Featured;