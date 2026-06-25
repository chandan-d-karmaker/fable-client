'use server';

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

    return session?.user || null;
}

export const getUserToken = async () => {
    const token = await auth.api.getToken({
        headers: await headers()
    })

    return token?.token|| null;
}

export const getUserRole = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.user?.role || null;
}

export const requireRole = async(role) =>{
    const user = await getUserSession()
    if(!user){
        redirect('/auth/login')
    }
    if(user?.role !== role){
        redirect('/unauthorized')
    }
    return user;
}