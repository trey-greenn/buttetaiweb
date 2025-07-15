'use client';

import { useSubscription } from '@/app/hooks/useSubscription';

interface SubscriptionStatusProps {
  className?: string;
}

export default function SubscriptionStatus({ className = '' }: SubscriptionStatusProps) {
  const { subscription, isLoading } = useSubscription();
  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';
  
  if (isLoading) {
    return <div className={`text-sm text-gray-500 ${className}`}>Loading subscription...</div>;
  }
  
  return (
    <div className={`text-sm ${className} ${isPro ? 'text-green-600' : 'text-gray-600'}`}>
      {isPro ? 'Pro User – Full Access' : 'Free Plan – Limited Access'}
    </div>
  );
}