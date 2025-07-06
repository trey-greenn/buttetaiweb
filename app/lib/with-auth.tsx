'use client';

import { useAuth } from '@/app/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/app/components/ui/loading';

export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function ProtectedComponent(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

    useEffect(() => {
      // Only redirect if we've finished the auth check
      if (!isLoading) {
        if (!user) {
          router.push('/login');
        }
        setHasCheckedAuth(true);
      }
    }, [isLoading, user, router]);

    if (isLoading || !hasCheckedAuth) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      );
    }

    if (!user) {
      return null; // Will redirect in useEffect
    }

    return <Component {...props} />;
  };
}