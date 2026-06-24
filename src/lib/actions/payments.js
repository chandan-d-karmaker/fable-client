'use server';

import { serverMutation } from "../core/server"

export const addPayment = async (paydata) => {
    return serverMutation('/api/payments', paydata)
}