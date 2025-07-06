'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/app/components/auth/signup-form';
import { useAuth } from '@/app/lib/auth-context';

export default function SignupPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignupForm />
    </div>
  );
}
