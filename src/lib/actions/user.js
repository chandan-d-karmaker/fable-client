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
        return data;
    } catch (error) {
        console.error("Auth API Error:", error); // ADD THIS
        throw error; // Rethrow so toast.error in your component catches it
    }
}

export const deleteUser = async (userId) => {
    const result = await serverMutation(`/api/admin/user/${userId}`, null, 'DELETE');
    revalidatePath('/dashboard/admin/manage-user');
    return result;
}

// export const changeRole = async (userId, data) => {
//     const result = await serverMutation(`/api/admin/user/role/${userId}`, data, 'PATCH');
//     revalidatePath('/dashboard/adim/manage-user');
//     return result;
// }
/// const data = await auth.api.setRole({
        //     body: {
        //         userId: userId,
        //         role: role
        //     },
        //     headers: await headers()
        // });