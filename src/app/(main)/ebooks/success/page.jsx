import { addPayment } from '@/lib/actions/payments'
import { getUserRole } from '@/lib/core/session'
import { stripe } from '@/lib/stripe'
import { Button } from '@heroui/react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    const role = await getUserRole();
    // console.log("user role in fn", role);

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        customer_details: { email: customerEmail },
        metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {

        const paymentInfo = {
            email: customerEmail,
            ebookId: metadata.ebookId,
            ebookPrice: metadata.ebookPrice,
            userId: metadata.userId,
            writerId: metadata.writerId,
            buyerName: metadata.buyerName,
            ebookTitle: metadata.ebookTitle
        }

        const res = await addPayment(paymentInfo);
        console.log(res);

        return (
            <section id="success">
                <div className="min-h-[70vh] flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-background border border-default-200 shadow-sm p-8 text-center space-y-6">

                        {/* Icon */}
                        <div className="flex justify-center">
                            <CheckCircle2 className="w-16 h-16 text-success" />
                        </div>

                        {/* Text Block */}
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-foreground playfair">Payment Successful!</h1>
                            <p className="text-default-500 text-sm md:text-base">
                                Thank you for your purchase. Your payment was processed safely, and the ebook is now yours.
                            </p>
                        </div>

                        {/* Order Details Box */}
                        {session_id && (
                            <div className="bg-default-50 p-4 border border-default-100 text-sm text-left">
                                <p className="text-default-400 text-xs uppercase font-semibold tracking-wider mb-1">Order Reference email</p>
                                <p className="font-mono text-default-600 truncate">{customerEmail}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="pt-4 flex flex-col gap-3">
                            <Link href={`/dashboard/${role}`} className="w-full">
                                <Button color="success" className="w-full font-medium text-white rounded-none">
                                    Go to My Dashboard <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/ebooks" className="w-full">
                                <Button variant="light" className="w-full rounded-none text-default-500 hover:text-foreground">
                                    Return to Store
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}