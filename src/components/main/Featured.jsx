import { getFeatEbooks } from '@/lib/api/ebooks';
import React from 'react';
import BookCard from '../shared/BookCard';

const Featured = async () => {

    const books = await getFeatEbooks();
    console.log(books);
    return (
        <div className='my-10'>
            <h1 className='text-4xl font-semibold text-center'>Featured Ebooks</h1>
            <p className='text-muted text-center'>Highest purchased from last month</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10'>
                {
                    books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))
                }
            </div>
        </div>
    );
};

export default Featured;