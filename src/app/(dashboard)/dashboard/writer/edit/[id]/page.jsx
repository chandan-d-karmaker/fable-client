// app/dashboard/writer/books/[id]/edit/page.jsx

import React from 'react';
import { getEbookById } from '@/lib/api/ebooks'; // You'll need to create this function
import EditEbookForm from '../EditBookForm';

// Next.js automatically passes the URL params to this component
export default async function EditPage({ params }) {
    // Grab the ID from the URL (e.g., if URL is /books/123/edit, id = "123")
    const { id } = await params; 

    // Fetch the latest data for this specific ebook
    const ebookData = await getEbookById(id);

    // Handle case where book doesn't exist
    if (!ebookData) {
        return <div className="p-10 text-center">Ebook not found.</div>;
    }

    // Pass the fetched data down to your client-side form component
    return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-foreground">Edit Ebook</h1>
            
            {/* Pass the data as a prop so your form can pre-fill the inputs */}
            <EditEbookForm initialData={ebookData} ebookId={id} />
        </div>
    );
}