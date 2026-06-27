// app/api/checkout/route.js (or wherever this file lives)
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../lib/stripe'; // Ensure this path is correct
import { getEbookById } from '@/lib/api/ebooks'; // Import your DB function
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

export async function POST(req) {

    try {
        const headersList = await headers();
        const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_BASE_URL;

        const body = await req.json();
        const { ebookId } = body;

        if (!ebookId) {
            return NextResponse.json({ error: "Ebook ID is required" }, { status: 400 });
        }

        const ebook = await getEbookById(ebookId);

        const user = await getUserSession();

        if (!user || !user.id) {
            return NextResponse.json(
                { error: "Unauthorized", redirectUrl: "/auth/login" },
                { status: 401 }
            );
        }

        if (!ebook) {
            return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
        }

        const priceInCents = Math.round(parseFloat(ebook.price) * 100);

        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: ebook.title,
                            images: [ebook.image], 
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/ebooks/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/ebooks/cancel`,
            metadata: {
                ebookId: ebook._id.toString(),
                ebookTitle: ebook.title,
                ebookPrice: ebook.price,
                userId: user?.id,
                buyerName: user?.name,
                writerId: ebook.addedBy
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (err) {
        console.error("Stripe API Error:", err);
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}