import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/app/utils/supabase';

// Define response headers for this API route
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes

// Create a simple handler for the route
export async function GET(request: NextRequest) {
  try {
    // Log the Supabase connection details (without exposing the key)
    console.log('Supabase URL:', process.env.SUPABASE_URL ? 'Defined' : 'Undefined');
    console.log('Supabase Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Defined' : 'Undefined');
    
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

    console.log('Starting timestamp insertion...');
    
    // Create the client inside the function
    const supabaseAdmin = createServerClient();
    
    // Insert current timestamp into the correct table
    const { data, error } = await supabaseAdmin
      .from('cron_heartbeat')
      .insert([{ timestamp: new Date().toISOString() }]);

    if (error) {
      console.error('Detailed Supabase error:', JSON.stringify(error));
      return NextResponse.json(
        { success: false, message: error.message, details: error },
        { status: 500 }
      );
    }

    console.log('Timestamp inserted successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Timestamp updated successfully'
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: String(error) },
      { status: 500 }
    );
  }
}