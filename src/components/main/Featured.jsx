import { getFeatEbooks } from '@/lib/api/ebooks';
import React from 'react';
import BookCard from '../shared/BookCard';
import * as motion from "motion/react-client";
import { getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';

const Featured = async () => {

    const books = await getFeatEbooks();
    // console.log(books);
    const user = await getUserSession();

    let purchasedEbookIds = [];
    if (user?.id) {
        try {
            const userPurchases = await getPurchaseHistory(user.id);
            purchasedEbookIds = userPurchases.map(purchase => purchase.ebookId);
        } catch (error) {
            console.error("Failed to fetch user purchases", error);
        }
    }

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
                    books.map((book, index) => {
        
                        const isPurchased = purchasedEbookIds.includes(book._id);

                        return (
                            <motion.div
                                key={book._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Pass the book AND the purchase status to the card */}
                                <BookCard book={book} isPurchased={isPurchased} />
                            </motion.div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Featured;