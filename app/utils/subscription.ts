import { createServerClient } from './supabase';

// Get user subscription plan
export async function getUserPlan(userId: string): Promise<'free' | 'pro' | 'plus'> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('plan, status')
    .eq('user_id', userId)
    .single();

  if (error || !data || data.status !== 'active') {
    return 'free';
  }
  
  return data.plan as 'free' | 'pro' | 'plus';
}

// Get full subscription details
export async function getUserSubscription(userId: string) {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    return null;
  }
  
  return data;
}