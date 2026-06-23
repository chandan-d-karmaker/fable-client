'use client'
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import BooksFilters from './BookFilters';
import * as motion from "motion/react-client";
import BookCard from './BookCard';

const BooksContainer = ({ books, filters }) => {
    const [searchQuery, setSearchQuery] = useState(filters.search);
    const [selectedGenre, setSelectedGenre] = useState(filters.genre || "all");
    const [selectedSort, setSelectedSort] = useState(filters.sort || "all");

    const router = useRouter();

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

            <div className='my-10 bg-background'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 bg-background'>
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


        </div>
    );
};

export default BooksContainer;