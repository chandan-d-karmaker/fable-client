import BookCard from '@/components/shared/BookCard';
import { getEbooks } from '@/lib/api/ebooks';
import React from 'react';
import * as motion from "motion/react-client";
import BooksContainer from '@/components/shared/BooksContainer';
import { getUserRole, getUserSession, getUserToken } from '@/lib/core/session';
import { getPurchaseHistory } from '@/lib/api/payments';

const AllEBooksPage = async ({ searchParams }) => {

    const filters = await searchParams;
    const user = await getUserSession();
    const filterObj = {
        ...filters,
        status: 'published'
    }

    const querySearch = new URLSearchParams(filterObj)
    const queryString = querySearch.toString()

    console.log('search Q', filters, queryString)

    const books = await getEbooks(queryString);

    let purchasedEbookIds = [];
    if (user?.id) {
        try {
            const userPurchases = await getPurchaseHistory(user.id);
            // Create a simple array of just the IDs they bought for easy checking
            purchasedEbookIds = userPurchases.map(purchase => purchase.ebookId);
        } catch (error) {
            console.error("Failed to fetch user purchases", error);
        }
    }

    const booksWithPurchaseStatus = books.map(book => ({
        ...book,
        isPurchased: purchasedEbookIds.includes(book._id) // Returns true or false
    }));


    return (
        <div className="w-full min-h-screen bg-background p-2 md:p-8 text-foreground">
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-bold tracking-tight">All Books</h1>
                <p className="text-zinc-400 mt-2">Discover your next Story.</p>
            </div>

            {/* Pass data to the Client Wrapper to handle filtering interactivity */}
            <BooksContainer filters={filterObj} books={booksWithPurchaseStatus || []} />
        </div>
    )
};

export default AllEBooksPage;