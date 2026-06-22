'use server';

import { serverQuery } from "../core/server";

export const getEbooks = async () => {
    return serverQuery('/api/ebooks');
}
export const getFeatEbooks = async () => {
    return serverQuery('/api/feat-ebooks');
}