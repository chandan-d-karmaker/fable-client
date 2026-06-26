'use client'
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import BooksFilters from './BookFilters';
import * as motion from "motion/react-client";
import BookCard from './BookCard';
import { Button } from '@heroui/react';
import Link from 'next/link';

const BooksContainer = ({ books, filters }) => {
    const [searchQuery, setSearchQuery] = useState(filters.search);
    const [selectedGenre, setSelectedGenre] = useState(filters.genre || "all");
    const [selectedSort, setSelectedSort] = useState(filters.sort || "all");

    const router = useRouter();
    // console.log(books);

    useEffect(() => {
        const sp = new URLSearchParams()

        if (searchQuery) {
            sp.set('search', searchQuery);
        }

        if (selectedGenre !== 'all') {
            sp.set('genre', selectedGenre)
        }
        if (selectedSort !== 'all') {
            sp.set('sort', selectedSort)
        }

        console.log('search params', sp.toString());

        const path = `?${sp.toString()}`
        router.push(path);

    }, [router, searchQuery, selectedGenre, selectedSort])
    return (
        <div>

            <BooksFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}

            />

            <div className='bg-background'>
                {
                    books.length === 0 && <div className='p-6 text-center flex flex-col gap-4 border border-foreground'>
                        <h1 className='text-xl font-semibold'>No books found</h1>
                        <p className='text-muted'>Please Reset the filters</p>
                        <Link href='/ebooks'>
                            <Button variant='primary' className='rounded-none'>Reset Filters</Button>
                        </Link>
                    </div>
                }
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10 bg-background'>
                    {
                        books.map((book, index) => (
                            <motion.div key={book._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }} // Staggers each card by 0.1s
                                viewport={{ once: true }}>

                                <BookCard book={book} isPurchased={book.isPurchased} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>


        </div>
    );
};

export default BooksContainer;