'use server';

import { serverQuery } from "../core/server";

export const getBookmarksByUser = async (userId) => {
    return serverQuery(`/api/ebooks/bookmark/${userId}`);
}