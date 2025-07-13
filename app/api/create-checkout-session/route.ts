import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Make sure stripe is properly typed
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    // Get the origin for success/cancel URLs
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Use price_data instead of price to avoid needing a pre-created price ID
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'BuffettAI Pro Subscription',
              description: 'Annual subscription to BuffettAI Pro plan',
            },
            unit_amount: 899, // $8.99 in cents
            recurring: {
              interval: 'year',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    // Return the session ID
    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe API error:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating checkout session' },
      { status: 500 }
    );
  }
}