import { getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import PurchaseHistoryTable from './PurchaseHistoryTable';

export const metadata = {
  title: "Purchase History",
};


const page = async () => {
    const user = await getUserSession();
    // console.log(user);

    const sales = await getPurchaseHistory(user.id);
    // console.log(sales);

    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold text-foreground mb-10'>Ebook purchase history</h1>
            </div>
            
            <PurchaseHistoryTable sales={sales} />
        </div>
    );
};

export default page;