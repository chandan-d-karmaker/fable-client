import React from 'react';
import { getEbookById } from '@/lib/api/ebooks';
import EditEbookForm from '../EditBookForm';

export default async function EditPage({ params }) {
    const { id } = await params; 

    const ebookData = await getEbookById(id);

    if (!ebookData) {
        return <div className="p-10 text-center">Ebook not found.</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-foreground">Edit Ebook</h1>
            
            <EditEbookForm initialData={ebookData} ebookId={id} />
        </div>
    );
}