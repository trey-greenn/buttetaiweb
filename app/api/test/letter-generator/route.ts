// app/api/test/letter-generator/route.ts
import { GET as letterGeneratorHandler } from '@/app/api/cron/letter-generator/route';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Add the authorization header that the cron job expects
  const headers = new Headers(request.headers);
  headers.set('authorization', `Bearer ${process.env.CRON_SECRET}`);
  
  const authRequest = new NextRequest(request.url, {
    headers,
    method: request.method,
  });
  
  return letterGeneratorHandler(authRequest);
}