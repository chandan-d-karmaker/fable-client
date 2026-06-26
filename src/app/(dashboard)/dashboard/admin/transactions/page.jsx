import { getAllPurcheseHistory, getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import TransactionHistoryTable from './transactionHistoryTable';

const TransactionHistoryPage = async () => {
    const user = await getUserSession();
    // console.log(user);

    // Fetch data safely on the server
    const sales = await getAllPurcheseHistory() || [];
    // console.log(sales);

    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold text-foreground mb-6'>Ebook sale history</h1>
            </div>
            
            <TransactionHistoryTable sales={sales} />
        </div>
    );
};

export default TransactionHistoryPage;