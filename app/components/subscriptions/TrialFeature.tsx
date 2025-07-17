'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSubscription } from '@/app/hooks/useSubscription';

interface TrialFeatureProps {
  children: React.ReactNode;
}

export default function TrialFeature({ children }: TrialFeatureProps) {
  const { subscription, isLoading } = useSubscription();
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [trialEnded, setTrialEnded] = useState(false);
  
  useEffect(() => {
    if (!isLoading && subscription) {
      if (subscription.plan === 'pro') {
        // Pro users don't need trial tracking
        setTrialEnded(false);
        return;
      }
      
      const trialStartDate = new Date(subscription.created_at);
      const trialEndDate = new Date(trialStartDate);
      trialEndDate.setDate(trialEndDate.getDate() + 7);
      
      const currentDate = new Date();
      const timeRemaining = trialEndDate.getTime() - currentDate.getTime();
      const daysLeft = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
      
      setDaysRemaining(daysLeft);
      setTrialEnded(daysLeft <= 0);
    }
  }, [subscription, isLoading]);
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }
  
  if (trialEnded) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Your Trial Has Ended</h2>
          <p className="mb-6">
            Your 7-day free trial has expired. Upgrade to Pro to continue accessing all features.
          </p>
          <Link 
            href="/pricing" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-center text-white py-3 px-4 rounded-md transition-colors font-medium"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative">
      {daysRemaining !== null && daysRemaining > 0 && (
        <div className="bg-blue-100 border border-blue-300 p-3 rounded text-center mb-4">
          <p className="text-blue-800">
            Trial ends in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}
          </p>
        </div>
      )}
      {children}
    </div>
  );
}