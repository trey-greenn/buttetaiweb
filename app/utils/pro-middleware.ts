import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from './supabase';

export async function checkProAccess(userId: string) {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('plan, status')
    .eq('user_id', userId)
    .single();
    
  if (error || !data || data.status !== 'active' || data.plan !== 'pro') {
    return false;
  }
  
  return true;
}

export async function requireProPlan(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const hasPro = await checkProAccess(session.user.id);
  
  if (!hasPro) {
    return NextResponse.json({ error: 'Pro subscription required' }, { status: 403 });
  }
  
  return handler(req);
}