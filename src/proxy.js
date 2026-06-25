import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers() // headers containing the user's session token
    });

    if (!session) {

        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

export const config = {
    matcher: ['/dashboard/:path'],
}