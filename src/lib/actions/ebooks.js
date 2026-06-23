'use server';

import { redirect } from "next/navigation";
import { serverMutation } from "../core/server";
import { revalidatePath } from "next/cache";

export const publishEbook = async (ebookData) => {
    return serverMutation('/api/ebooks', ebookData);
}

export const updateEbook = async (ebookId, ebookData) => {
    const result = serverMutation(`/api/ebooks/${ebookId}`, ebookData, 'PATCH');
    revalidatePath('/dashboard/writes/manage-ebook');
    redirect('/dashboard/write/manage-ebook');
    return result;
}