'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { createBrowserClient } from '@/app/utils/supabase-client';

// Define subscription types
export type SubscriptionPlan = 'free' | 'pro';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete';

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id?: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_end?: string;
  created_at: string;
  updated_at: string;
}

// Cache storage - persists across components but resets on page refresh
const subscriptionCache = new Map<string, { 
  data: Subscription | null; 
  timestamp: number;
}>();

// Cache expiry in milliseconds (5 minutes)
const CACHE_EXPIRY = 5 * 60 * 1000;

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user has active pro plan
  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';
  
  // Force refresh of subscription data
  const refresh = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (!error && data) {
        // Update state
        setSubscription(data as Subscription);
        
        // Update cache
        subscriptionCache.set(user.id, {
          data: data as Subscription,
          timestamp: Date.now()
        });
      } else {
        setSubscription(null);
        subscriptionCache.set(user.id, {
          data: null,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription(null);
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }
    
    // Check cache first
    const cached = subscriptionCache.get(user.id);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp < CACHE_EXPIRY)) {
      // Use cached data if it's still valid
      setSubscription(cached.data);
      setIsLoading(false);
    } else {
      // Fetch fresh data if no cache or cache expired
      refresh();
    }
  }, [user, refresh]);
  
  return {
    subscription,
    isLoading,
    isPro,
    refresh
  };
}