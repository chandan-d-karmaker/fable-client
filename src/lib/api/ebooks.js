'use server';

import { protectedServerQuery, serverQuery } from "../core/server";

export const getEbooks = async (queryString) => {
    return await serverQuery(`/api/ebooks?${queryString}`);
}
export const getFeatEbooks = async () => {
    return await serverQuery('/api/feat-ebooks');
}

export const getEbookByWriter = async (writerId) => {
    return await protectedServerQuery(`/api/ebooks/writer/${writerId}`);
}

export const getEbookById = async (ebookId) => {
    return await serverQuery(`/api/ebooks/${ebookId}`);
}

export const hasPurchased = async (ebookId, userId) =>{
    return await protectedServerQuery(`/api/purchases/check?userId=${userId}&ebookId=${ebookId}`);
}

