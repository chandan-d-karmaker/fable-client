'use server';

import { serverQuery } from "../core/server";

export const getUsers = async () => {
    return serverQuery('/api/users');
}

export const getWriters = async () => {
    return serverQuery('/api/writers');
}