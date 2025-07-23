'use client';

import Link from 'next/link';
import { useSubscription } from '@/app/hooks/useSubscription';

interface ProFeatureProps {
  children: React.ReactNode;
  plusOnly?: boolean;
}

export default function ProFeature({ children, plusOnly = false }: ProFeatureProps) {
  const { subscription, isLoading } = useSubscription();
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }
  
  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';
  const isPlus = subscription?.plan === 'plus' && subscription?.status === 'active';
  
  // If plusOnly is true, only Plus subscribers can access
  // Otherwise, both Pro and Plus subscribers can access
  const hasAccess = plusOnly ? isPlus : (isPro || isPlus);
  
  if (!hasAccess) {
    const planNeeded = plusOnly ? 'Plus' : 'Pro';
    
    return (
      <div className="bg-yellow-100 border border-yellow-400 p-4 rounded text-center">
        <h3 className="font-medium text-yellow-800 mb-2">{planNeeded} Feature</h3>
        <p className="text-yellow-700 mb-4">
          This feature is available for {planNeeded} subscribers only.
        </p>
        <Link 
          href="/pricing" 
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition-colors"
        >
          Upgrade to {planNeeded}
        </Link>
      </div>
    );
  }
  
  return <>{children}</>;
}