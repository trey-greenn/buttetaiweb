import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase';

// Define response headers for this API route
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes

// Create a simple handler for the route
export async function GET(request: NextRequest) {
  try {
    // Verify request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Insert current timestamp into the Supabase table
    const { data, error } = await supabaseAdmin
      .from('timestamps')
      .insert([{ timestamp: new Date().toISOString() }])
      .select();

    if (error) {
      console.error('Error inserting timestamp:', error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Timestamp updated successfully',
      data
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}