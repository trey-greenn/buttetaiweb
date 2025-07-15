import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@/app/utils/supabase';

// Initialize Stripe with API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  
  // Check if signature exists
  if (!sig) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }
  
  const body = await req.text();

  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = createServerClient();
  
  try {
    // Handle subscription events
    if (event.type === 'customer.subscription.created' || 
        event.type === 'customer.subscription.updated') {
      
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      
      // Get the price nickname from subscription data to determine the plan
      const priceId = subscription.items.data[0].price.id;
      const price = await stripe.prices.retrieve(priceId);
      const plan = (price.nickname?.toLowerCase() || 'free') as 'free' | 'pro';
      
      // Check if subscription record exists
      const { data: existingSubscription } = await supabase
        .from('user_subscriptions')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();
      
      if (existingSubscription) {
        // Update existing subscription
        await supabase
          .from('user_subscriptions')
          .update({
            plan,
            status: subscription.status,
            stripe_subscription_id: subscription.id,
            current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);
      } else {
        // Get user ID from customer metadata
        const customer = await stripe.customers.retrieve(customerId);
        const userId = !('deleted' in customer) ? customer.metadata?.supabase_uid : undefined;

        if (userId) {
          // Create new subscription record
          await supabase.from('user_subscriptions').insert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            plan,
            status: subscription.status,
            current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        } else {
          console.error('Customer metadata missing supabase_uid:', customerId);
        }
      }
    } 
    // Handle subscription deletion or cancellation
    else if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      
      await supabase
        .from('user_subscriptions')
        .update({
          status: 'canceled',
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id);
    }
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}