'use server';

import { protectedServerQuery, serverQuery } from "../core/server";

export const getUsers = async () => {
    return await protectedServerQuery('/api/users');
}

export const getWriters = async () => {
    return await protectedServerQuery('/api/writers');
}
export const getTopWriters = async () => {
    return await serverQuery('/api/top-writers');
}