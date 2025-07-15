'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSubscription } from '@/app/hooks/useSubscription';

interface ProFeatureProps {
  children: React.ReactNode;
}

export default function ProFeature({ children }: ProFeatureProps) {
  const { isPro, isLoading } = useSubscription();
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }
  
  if (!isPro) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 p-4 rounded text-center">
        <h3 className="font-medium text-yellow-800 mb-2">Pro Feature</h3>
        <p className="text-yellow-700 mb-4">
          This feature is available for Pro subscribers only.
        </p>
        <Link 
          href="/pricing" 
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition-colors"
        >
          Upgrade to Pro
        </Link>
      </div>
    );
  }
  
  return <>{children}</>;
}