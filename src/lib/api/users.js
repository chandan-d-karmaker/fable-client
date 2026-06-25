'use server';

import { protectedServerQuery, serverQuery } from "../core/server";

export const getUsers = async () => {
    return protectedServerQuery('/api/users');
}

export const getWriters = async () => {
    return protectedServerQuery('/api/writers');
}
export const getTopWriters = async () => {
    return serverQuery('/api/top-writers');
}