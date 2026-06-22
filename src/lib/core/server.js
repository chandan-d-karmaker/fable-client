'use server';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverQuery = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}