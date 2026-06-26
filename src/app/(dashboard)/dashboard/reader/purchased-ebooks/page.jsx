import BookCard from '@/components/shared/BookCard';
import { getEbookById } from '@/lib/api/ebooks';
import { getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default async function MyPurchasedBooksPage() {
    const user = await getUserSession();

    if (!user) {
        return <div>Please log in.</div>;
    }

    // 1. Fetch the array of purchases (just the IDs)
    const sales = await getPurchaseHistory(user.id);
    console.log(sales);

    // 2. Fetch the full book details for every purchased ID in parallel!
    const purchasedBooks = await Promise.all(
        sales.map(async (purchase) => {
            const bookDetails = await getEbookById(purchase.ebookId);
            return bookDetails;
        })
    );

    // 3. Filter out any null values (just in case an author deleted a book)
    const validBooks = purchasedBooks.filter((book) => book !== null);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">My Library</h1>

            {validBooks.length === 0 ? (
                <div className='bg-contain1 flex flex-col items-center justify-center p-6 border space-y-4'>
                    <h1 className='text-xl'>No books purchased yet!</h1>
                    <Link href='/ebooks'>
                        <Button>Browse Now</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* 4. Map over the fully hydrated books and pass them to BookCard */}
                    {validBooks.map((book) => (
                        <BookCard
                            key={book._id}
                            book={book}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}