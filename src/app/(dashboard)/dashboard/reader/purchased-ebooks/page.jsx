import { getUserSession } from '@/lib/core/session';
import BookCard from '@/components/shared/BookCard'; 
import { getEbookById } from '@/lib/api/ebooks'; // Import your fetcher
// Import your purchases fetcher: import { getUserPurchases } from '@/lib/api/purchases';

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
                <p>You haven&apos;t purchased any books yet.</p>
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