'use server';

import { serverQuery } from "../core/server";

export const getEbooks = async () => {
    return serverQuery('/api/ebooks');
}
export const getFeatEbooks = async () => {
    return serverQuery('/api/feat-ebooks');
}

export const getEbookByWriter = async (writerId) => {
    return serverQuery(`/api/ebooks/writer/${writerId}`);
}

export const getEbookById = async (ebookId) => {
    return serverQuery(`/api/ebooks/${ebookId}`);
}