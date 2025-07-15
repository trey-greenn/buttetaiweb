import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@/app/utils/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    // Get the origin for success/cancel URLs
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Get user from Supabase session
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // Check if user already has a subscription record
    const { data: subscriptionData } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();
    
    let stripeCustomerId = subscriptionData?.stripe_customer_id;
    
    // If no customer ID exists, create a new customer in Stripe
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: { supabase_uid: userId },
      });
      
      stripeCustomerId = customer.id;
      
      // Insert the new user subscription record
      await supabase.from('user_subscriptions').insert({
        user_id: userId,
        stripe_customer_id: stripeCustomerId,
        plan: 'free',
        status: 'active',
      });
    }
    
    // Create the checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
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
      success_url: `${origin}/dashboard?upgrade=success`,
      cancel_url: `${origin}/pricing`,
      metadata: { user_id: userId },
    });

    // Return the session ID
    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error: any) {
    console.error('Stripe API error:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating checkout session' },
      { status: 500 }
    );
  }
}