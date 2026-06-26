import { getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const page = async () => {

    const user = await getUserSession();
    console.log(user);

    const sales = await getPurchaseHistory(user.id);
    console.log(sales);
    return (
        <div>

        </div>
    );
};

export default page;