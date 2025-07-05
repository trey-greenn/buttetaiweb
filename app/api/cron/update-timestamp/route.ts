import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase';

// Define response headers for this API route
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes

// Create a simple handler for the route
export async function GET(request: NextRequest) {
  try {
    // Log the Supabase connection details (without exposing the key)
    console.log('Supabase URL:', process.env.NEXT_SUPABASE_URL ? 'Defined' : 'Undefined');
    console.log('Supabase Key:', process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY ? 'Defined' : 'Undefined');
    
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
    
    // Test connection with a simple query first
    const { data: testData, error: testError } = await supabaseAdmin
      .from('timestamps')
      .select('*')
      .limit(1);
      
    console.log('Test query result:', testData ? 'Data received' : 'No data');
    console.log('Test query error:', testError ? JSON.stringify(testError) : 'No error');
    
    // Now try the insertion
    const timestamp = new Date().toISOString();
    console.log('Inserting timestamp:', timestamp);
    
    const { data, error } = await supabaseAdmin
      .from('timestamps')
      .insert([{ timestamp }]);

    if (error) {
      console.error('Detailed Supabase error:', JSON.stringify(error));
      return NextResponse.json(
        { success: false, message: error.message, details: error },
        { status: 500 }
      );
    }

    console.log('Insertion response:', data ? JSON.stringify(data) : 'No data returned');
    
    return NextResponse.json({
      success: true,
      message: 'Timestamp updated successfully',
      timestamp
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: String(error) },
      { status: 500 }
    );
  }
}