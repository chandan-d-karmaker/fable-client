import { getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import SalesHistoryTable from './SalesHistoryTable'; 

const SalesHistoryPage = async () => {
    const user = await getUserSession();
    console.log(user);

    const sales = await getPurchaseHistory(user.id) || [];
    // console.log(sales);

    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold text-foreground mb-6'>Ebook sale history</h1>
            </div>
            
           
            <SalesHistoryTable sales={sales} />
        </div>
    );
};

export default SalesHistoryPage;