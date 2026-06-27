import { getBookmarksByUser } from '@/lib/api/bookmarks';
import { getEbooks } from '@/lib/api/ebooks';
import { fetchRevenue, getAllPurcheseHistory, getPurchaseHistory, totalRevenue } from '@/lib/api/payments';
import { getUsers, getWriters } from '@/lib/api/users';
import { getUserSession } from '@/lib/core/session';
import { Card } from '@heroui/react';
import React from 'react';
import AdminCharts from './AdminCharts';

const AdminHomePage = async () => {

    const user = await getUserSession();
    const users  = await getUsers();
    const {ebooks} = await getEbooks();
    // console.log(ebooks);
    const writers = await getWriters();
    const totalrevenue = await totalRevenue();
    // console.log(totalrevenue)
    const totalSold = await getAllPurcheseHistory();
    // console.log(totalSold);
    

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
                        <h1 className='text-xl'>Total Ebook Sold</h1>
                        <h1 className='text-2xl font-bold'>{totalSold.length}</h1>
                    </Card.Content>
                </Card>
                <Card
                    ispressable='true'
                    ishoverable='true'
                    className="bg-content1 rounded-none border border-foreground hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm"
                >
                    <Card.Content className='bg-content1 p-4 space-y-4 text-center'>
                        <h1 className='text-xl'>Total Users</h1>
                        <h1 className='text-2xl font-bold'>{users.length}</h1>
                    </Card.Content>
                </Card>
                <Card
                    ispressable='true'
                    ishoverable='true'
                    className="bg-content1 rounded-none border border-foreground hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm"
                >
                    <Card.Content className='bg-content1 p-4 space-y-4 text-center'>
                        <h1 className='text-xl'>Total Writers</h1>
                        <h1 className='text-2xl font-bold'>{writers.length}</h1>
                    </Card.Content>
                </Card>
                <Card
                    ispressable='true'
                    ishoverable='true'
                    className="bg-content1 rounded-none border border-foreground hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm"
                >
                    <Card.Content className='bg-content1 p-4 space-y-4 text-center'>
                        <h1 className='text-xl'>Total Revenue</h1>
                        <h1 className='text-2xl font-bold'>${totalrevenue}</h1>
                    </Card.Content>
                </Card>

            </div>

            { totalSold && Array.isArray(totalSold) && ebooks && Array.isArray(ebooks) &&
             <AdminCharts sales={totalSold} ebooks={ebooks} />}
        </div>
    );
};

export default AdminHomePage;