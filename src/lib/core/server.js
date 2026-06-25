'use server';

import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverQuery = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return handleStatusCode(res);
}

export const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const protectedServerQuery = async (path) => {
    const res = await fetch(`${baseUrl}${path}`,
        {
            headers: await authHeader()
        }
    );
    console.log(res);
    return handleStatusCode(res);
}

// export const serverMutation = async (path, data, method ='POST') => {
//     const res = await fetch(`${baseUrl}${path}`, {
//         method: method,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });

//     return res.json();
// }

export const serverMutation = async (path, data = {}, method = 'POST') => {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const res = await fetch(`${baseUrl}${path}`, options);

    if (res.status === 204) {
        return { success: true };
    }

    return res.json();
}

const handleStatusCode = res => {
    console.log("status codee:", res.statusCode);
    if (res.statusCode === 401) {
        redirect('/unauthorized')

    }
    else if (res.statusCode === 403) {
        redirect('/auth/login');
    }

    return res.json();
}