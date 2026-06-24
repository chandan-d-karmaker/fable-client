import BookCard from '@/components/shared/BookCard';
import { getEbooks } from '@/lib/api/ebooks';
import React from 'react';
import * as motion from "motion/react-client";
import BooksContainer from '@/components/shared/BooksContainer';
import { getUserRole } from '@/lib/core/session';

const AllEBooksPage = async ({ searchParams }) => {

    const filters = await searchParams;
    const filterObj = {
        ...filters
    }

    const querySearch = new URLSearchParams(filters)
    const queryString = querySearch.toString()

    console.log('search Q', filters, queryString)

    const books = await getEbooks(queryString);

    return (
        <div className="w-full min-h-screen bg-background p-2 md:p-8 text-foreground">
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-bold tracking-tight">All Books</h1>
                <p className="text-zinc-400 mt-2">Discover your next Story.</p>
            </div>

            {/* Pass data to the Client Wrapper to handle filtering interactivity */}
            <BooksContainer filters={filterObj} books={books || []} />
        </div>
    )
};

export default AllEBooksPage;