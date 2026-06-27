'use server';
import { serverMutation } from "../core/server";


import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export const updateUserRole = async (userId, role) => {
    console.log("Action triggered for:", userId, role); 
    try {
        const res = await serverMutation(`/api/admin/user/role/${userId}`, role, "PATCH");
        revalidatePath('/dashboard/admin/manage-user');
        return res;
    } catch (error) {
        console.error("Auth API Error:", error); 
        throw error; 
    }
}

export const deleteUser = async (userId) => {
    const result = await serverMutation(`/api/admin/user/${userId}`, null, 'DELETE');
    revalidatePath('/dashboard/admin/manage-user');
    return result;
}