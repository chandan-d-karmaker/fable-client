import { getBookmarksByUser } from '@/lib/api/bookmarks';
import { getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { getEbookById } from '@/lib/api/ebooks';
import { Card } from '@heroui/react';

export const metadata = {
  title: "Reader Dashboard",
};


const ReaderHomePage = async () => {

    const user = await getUserSession();
    const sales = await getPurchaseHistory(user.id);
    console.log(sales);

    const purchasedBooks = await Promise.all(
        sales.map(async (purchase) => {
            const bookDetails = await getEbookById(purchase.ebookId);
            return bookDetails;
        })
    );

    const bookmarks = await getBookmarksByUser(user.id);


    return (
        <div>
            <h2 className='text-2xl font-bold'>Welcome, {user.name}!</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-10'>
                <Card
                    ispressable='true'
                    ishoverable='true'
                    className="bg-content1 rounded-none border border-foreground hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm"
                >
                    <Card.Content className='bg-content1 p-4 space-y-4 text-center'>
                        <h1 className='text-xl'>Ebook Bought</h1>
                        <h1 className='text-2xl font-bold'>{purchasedBooks.length}</h1>
                    </Card.Content>
                </Card>

                <Card
                    ispressable='true'
                    ishoverable='true'
                    className="bg-content1 rounded-none border border-foreground hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm"
                >
                    <Card.Content className='bg-content1 p-4 space-y-4 text-center'>
                        <h1 className='text-xl'>Bookmarks</h1>
                        <h1 className='text-2xl font-bold'>{bookmarks.length}</h1>
                    </Card.Content>
                </Card>

            </div>
        </div>
    );
};

export default ReaderHomePage;