'use server';

import { protectedServerQuery, serverQuery } from "../core/server";

export const getEbooks = async (queryString) => {
    return serverQuery(`/api/ebooks?${queryString}`);
}
export const getFeatEbooks = async () => {
    return serverQuery('/api/feat-ebooks');
}

export const getEbookByWriter = async (writerId) => {
    return protectedServerQuery(`/api/ebooks/writer/${writerId}`);
}

export const getEbookById = async (ebookId) => {
    return protectedServerQuery(`/api/ebooks/${ebookId}`);
}

