'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import BooksFilters from './BookFilters';
import * as motion from "motion/react-client";
import BookCard from './BookCard';
import { Button, Pagination } from '@heroui/react';
import Link from 'next/link';

// ADDED 'total' to destructured props
const BooksContainer = ({ books, filters, total }) => { 
    const router = useRouter();
    
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [selectedGenre, setSelectedGenre] = useState(filters.genre || "all");
    const [selectedSort, setSelectedSort] = useState(filters.sort || "all");
    
    // ADDED missing page state
    const [page, setPage] = useState(filters.page ? parseInt(filters.page) : 1); 

    const totalItems = total || 0;
    const itemsPerPage = 8;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    
    useEffect(() => {
        //eslint-disable-next-line
        setPage(1);
    }, [searchQuery, selectedGenre, selectedSort]);

   
    useEffect(() => {
        const sp = new URLSearchParams();

        if (searchQuery) sp.set('search', searchQuery);
        if (selectedGenre !== 'all') sp.set('genre', selectedGenre);
        if (selectedSort !== 'all') sp.set('sort', selectedSort);
        sp.set('page', page);

        const path = `?${sp.toString()}`;
        router.push(path, { scroll: true });

    }, [router, searchQuery, selectedGenre, selectedSort, page]);

    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);
        if (page > 3) pages.push("ellipsis");
        
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        if (page < totalPages - 2) pages.push("ellipsis");
        if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);
        
        return pages;
    };

    const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

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
                {books.length === 0 ? (
                    <div className='p-6 text-center flex flex-col gap-4 border border-foreground'>
                        <h1 className='text-xl font-semibold'>No books found</h1>
                        <p className='text-muted'>Please Reset the filters</p>
                        <Button 
                            variant='primary' 
                            className='rounded-none mx-auto'
                            onPress={() => {
                                setSearchQuery("");
                                setSelectedGenre("all");
                                setSelectedSort("all");
                                setPage(1);
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10 bg-background'>
                            {books.map((book, index) => (
                                <motion.div key={book._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}>
                                    <BookCard book={book} isPurchased={book.isPurchased} />
                                </motion.div>
                            ))}
                        </div>
                        
                        <Pagination className="w-full max-w-7xl mx-auto mt-4">
                            <Pagination.Summary>
                                Showing {startItem}-{endItem} of {totalItems} results
                            </Pagination.Summary>
                            <Pagination.Content>
                                <Pagination.Item>
                                    <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                                        <Pagination.PreviousIcon />
                                        <span>Previous</span>
                                    </Pagination.Previous>
                                </Pagination.Item>
                                
                                {getPageNumbers().map((p, i) =>
                                    p === "ellipsis" ? (
                                        <Pagination.Item key={`ellipsis-${i}`}>
                                            <Pagination.Ellipsis />
                                        </Pagination.Item>
                                    ) : (
                                        <Pagination.Item key={p}>
                                            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                                {p}
                                            </Pagination.Link>
                                        </Pagination.Item>
                                    )
                                )}
                                
                                <Pagination.Item>
                                    <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                                        <span>Next</span>
                                        <Pagination.NextIcon />
                                    </Pagination.Next>
                                </Pagination.Item>
                            </Pagination.Content>
                        </Pagination>
                    </>
                )}
            </div>
        </div>
    );
};

export default BooksContainer;