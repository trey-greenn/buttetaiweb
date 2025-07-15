'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { useSubscription } from '@/app/hooks/useSubscription';

export default function SubscriptionDetails() {
  const { subscription, isLoading, refresh } = useSubscription();
  
  if (isLoading) {
    return <div className="p-4">Loading subscription details...</div>;
  }
  
  if (!subscription) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-[#5e503f] mb-4">Subscription</h2>
        <p className="text-gray-600 mb-4">No subscription information found.</p>
        <Link 
          href="/pricing" 
          className="bg-[#5e503f] hover:bg-[#403d39] text-white px-4 py-2 rounded-md transition-colors"
        >
          View Plans
        </Link>
      </div>
    );
  }
  
  const isPro = subscription.plan === 'pro' && subscription.status === 'active';
  const renewalDate = subscription.current_period_end 
    ? format(new Date(subscription.current_period_end), 'MMMM d, yyyy')
    : 'N/A';
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#5e503f] mb-4">Subscription</h2>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="font-medium text-gray-700 mr-2">Plan:</span>
          <span className={`${isPro ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
            {subscription.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
          </span>
        </div>
        
        <div className="flex items-center mb-2">
          <span className="font-medium text-gray-700 mr-2">Status:</span>
          <span className={`${
            subscription.status === 'active' ? 'text-green-600' : 
            subscription.status === 'past_due' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </span>
        </div>
        
        {isPro && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Renews on:</span>
            <span className="text-gray-600">{renewalDate}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-3">
        {!isPro && (
          <Link 
            href="/pricing" 
            className="bg-[#5e503f] hover:bg-[#403d39] text-white px-4 py-2 rounded-md transition-colors"
          >
            Upgrade to Pro
          </Link>
        )}
        
        <button
          onClick={refresh}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}