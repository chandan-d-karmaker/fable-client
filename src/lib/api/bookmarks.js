'use server';

import { protectedServerQuery, serverQuery } from "../core/server";

export const getBookmarksByUser = async (userId) => {
    return await protectedServerQuery(`/api/ebooks/bookmark/${userId}`);
}