import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@/app/utils/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PLAN_PRICES = {
  pro: {
    priceId: process.env.STRIPE_PRICE_ID_PRO,
    name: 'BuffettAI Pro Subscription',
    description: 'Annual subscription to BuffettAI Pro plan',
    unit_amount: 899, // $8.99 in cents
  },
  plus: {
    priceId: process.env.STRIPE_PRICE_ID_PLUS, 
    name: 'BuffettAI Plus Subscription',
    description: 'Annual subscription to BuffettAI Plus plan',
    unit_amount: 1899, // $18.99 in cents
  }
};

export async function POST(request: NextRequest) {
  try {
    // Get plan from request body
    const { plan = 'pro' } = await request.json();
    
    if (!['pro', 'plus'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }
    
    const planDetails = PLAN_PRICES[plan as keyof typeof PLAN_PRICES];
    
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

    // Use predefined price ID if available, otherwise use price_data
    const lineItems = planDetails.priceId 
  ? [{ price: planDetails.priceId, quantity: 1 }]
  : [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: planDetails.name,
          description: planDetails.description,
        },
        unit_amount: planDetails.unit_amount,
        recurring: {
          interval: 'year' as Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring.Interval,
        },
      },
      quantity: 1,
    }];
    
    // Create the checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${origin}/dashboard?upgrade=success`,
      cancel_url: `${origin}/pricing`,
      metadata: { 
        user_id: userId,
        plan: plan 
      },
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