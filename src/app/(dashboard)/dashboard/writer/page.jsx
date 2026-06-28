import { getBookmarksByUser } from '@/lib/api/bookmarks';
import { getEbookByWriter } from '@/lib/api/ebooks';
import { fetchRevenue, getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';
import { Card } from '@heroui/react';
import React from 'react';

export const metadata = {
  title: "Writer Dashboard",
};


const WriterHomePage = async () => {

    const user = await getUserSession();
    const sales = await getPurchaseHistory(user?.id);
    const ebooks = await getEbookByWriter(user?.id);
    const totalIncome = await fetchRevenue(user?.id)
    const bookmark = await getBookmarksByUser(user.id)
    // const type = (typeof(totalIncome));
    // console.log(type);
    // const avg = (totalIncome/ sales.length).toFixed(2) || 0;
    // console.log(avg);

    console.log(totalIncome);

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
                        <h1 className='text-xl'>Ebook Published</h1>
                        <h1 className='text-2xl font-bold'>{ebooks.length}</h1>
                    </Card.Content>
                </Card>
                <Card
                    ispressable='true'
                    ishoverable='true'
                    className="bg-content1 rounded-none border border-foreground hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm"
                >
                    <Card.Content className='bg-content1 p-4 space-y-4 text-center'>
                        <h1 className='text-xl'>Total Sale</h1>
                        <h1 className='text-2xl font-bold'>{sales.length}</h1>
                    </Card.Content>
                </Card>
                <Card
                    ispressable='true'
                    ishoverable='true'
                    className="bg-content1 rounded-none border border-foreground hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm"
                >
                    <Card.Content className='bg-content1 p-4 space-y-4 text-center'>
                        <h1 className='text-xl'>Total Revenue</h1>
                        <h1 className='text-2xl font-bold'>${totalIncome.toFixed(2)}</h1>
                    </Card.Content>
                </Card>
                <Card
                    ispressable='true'
                    ishoverable='true'
                    className="bg-content1 rounded-none border border-foreground hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm"
                >
                    <Card.Content className='bg-content1 p-4 space-y-4 text-center'>
                        <h1 className='text-xl'>Bookmarks</h1>
                        <h1 className='text-2xl font-bold'>{bookmark.length}</h1>
                    </Card.Content>
                </Card>

            </div>
        </div>
    );
};

export default WriterHomePage;