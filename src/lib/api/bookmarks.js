'use server';

import { protectedServerQuery, serverQuery } from "../core/server";

export const getBookmarksByUser = async (userId) => {
    return protectedServerQuery(`/api/ebooks/bookmark/${userId}`);
}