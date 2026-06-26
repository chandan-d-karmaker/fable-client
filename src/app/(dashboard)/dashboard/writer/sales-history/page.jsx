import { getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import SalesHistoryTable from './SalesHistoryTable'; // Adjust path if needed

const SalesHistoryPage = async () => {
    const user = await getUserSession();
    // console.log(user);

    // Fetch data safely on the server
    const sales = await getPurchaseHistory(user.id) || [];
    // console.log(sales);

    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold text-foreground mb-10'>Ebook sale history</h1>
            </div>
            
            {/* Pass the server data directly into the Client Component */}
            <SalesHistoryTable sales={sales} />
        </div>
    );
};

export default SalesHistoryPage;