import { getEbookByWriter } from '@/lib/api/ebooks';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import WriterEbooksTable from './WriterEbooksTable'; 

export const metadata = {
  title: "Manage Ebook",
};


const WriterEbooksPage = async () => {
    const user = await getUserSession();
    
    const ebooks = await getEbookByWriter(user.id) || [];
    // console.log(ebooks);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-foreground">My Ebooks</h1>
            </div>

           
            <div>
                <WriterEbooksTable ebooks={ebooks} />
            </div>
        </div>
    );
};

export default WriterEbooksPage;