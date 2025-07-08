// app/api/poc/db-test/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

// Define types for our simplified table
interface ArticleSummarySimple {
  id?: string;
  title: string;
  url: string;
  raw_snippet?: string;
  summary: string;
  created_at?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get parameters from URL
    const searchParams = request.nextUrl.searchParams;
    const operation = searchParams.get('operation') || 'test'; // test, insert, select

    // Debug environment variables
    console.log('Environment check:');
    console.log('- SUPABASE_URL:', supabaseUrl ? 'Defined' : 'Undefined');
    console.log('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Defined' : 'Undefined');

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase configuration is missing' },
        { status: 500 }
      );
    }

    // Test Supabase connection
    try {
      console.log('Testing Supabase connection...');
      const { data: tables, error: tablesError } = await supabase
        .from('article_summaries_simple')
        .select('*')
        .limit(1);
        
      if (tablesError) {
        console.error('Error connecting to article_summaries_simple table:', tablesError);
        return NextResponse.json(
          { 
            error: 'Failed to connect to Supabase table',
            details: tablesError
          },
          { status: 500 }
        );
      } else {
        console.log('Successfully connected to article_summaries_simple table');
      }
    } catch (error) {
      console.error('Supabase connection test error:', error);
      return NextResponse.json(
        { error: 'Failed to test Supabase connection', details: String(error) },
        { status: 500 }
      );
    }
    
    // If operation is 'insert', try to insert a test record
    if (operation === 'insert') {
      try {
        // Create test data
        const testArticle: ArticleSummarySimple = {
          title: 'Test Article',
          url: 'https://example.com/test-article',
          raw_snippet: 'This is a test article snippet for database testing.',
          summary: 'This is a test summary generated for database testing purposes.',
        };
        
        console.log('Inserting test record:', testArticle);
        
        const { data, error } = await supabase
          .from('article_summaries_simple')
          .insert(testArticle)
          .select('id')
          .single();
          
        if (error) {
          console.error('Error inserting test record:', error);
          
          // Check for specific error types
          if (error.code === '23502') { // not_null_violation
            console.error('Not null violation. Check required fields.');
            return NextResponse.json(
              { 
                error: 'Database not_null_violation', 
                details: error,
                message: 'A required field is missing. Check the table structure.' 
              },
              { status: 400 }
            );
          } else if (error.code === '42P01') { // undefined_table
            console.error('Table does not exist.');
            return NextResponse.json(
              { 
                error: 'Database undefined_table', 
                details: error,
                message: 'The article_summaries_simple table does not exist.' 
              },
              { status: 500 }
            );
          } else {
            return NextResponse.json(
              { error: 'Database error', details: error },
              { status: 500 }
            );
          }
        }
        
        console.log('Successfully inserted test record with ID:', data.id);
        return NextResponse.json({
          success: true,
          operation: 'insert',
          record_id: data.id,
          message: 'Test record successfully inserted'
        });
      } catch (error) {
        console.error('Insert operation error:', error);
        return NextResponse.json(
          { error: 'Failed to insert test record', details: String(error) },
          { status: 500 }
        );
      }
    }
    
    // If operation is 'select', retrieve records
    if (operation === 'select') {
      try {
        const { data, error } = await supabase
          .from('article_summaries_simple')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (error) {
          console.error('Error selecting records:', error);
          return NextResponse.json(
            { error: 'Failed to retrieve records', details: error },
            { status: 500 }
          );
        }
        
        return NextResponse.json({
          success: true,
          operation: 'select',
          records: data,
          count: data.length
        });
      } catch (error) {
        console.error('Select operation error:', error);
        return NextResponse.json(
          { error: 'Failed to retrieve records', details: String(error) },
          { status: 500 }
        );
      }
    }
    
    // Default operation is 'test' - just return success
    return NextResponse.json({
      success: true,
      operation: 'test',
      message: 'Successfully connected to Supabase',
      debug: {
        supabaseUrl: supabaseUrl ? 'Defined' : 'Undefined',
        supabaseKey: supabaseServiceKey ? 'Defined' : 'Undefined'
      }
    });
    
  } catch (error) {
    console.error('Error in DB test API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: String(error) },
      { status: 500 }
    );
  }
}

// Also support POST requests for more complex testing
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.url || !body.summary) {
      return NextResponse.json(
        { error: 'title, url, and summary are required fields' },
        { status: 400 }
      );
    }
    
    // Create article summary object
    const articleSummary: ArticleSummarySimple = {
      title: body.title,
      url: body.url,
      raw_snippet: body.raw_snippet || 'No snippet provided',
      summary: body.summary
    };
    
    // Insert the record
    const { data, error } = await supabase
      .from('article_summaries_simple')
      .insert(articleSummary)
      .select('id')
      .single();
      
    if (error) {
      console.error('Error inserting record:', error);
      return NextResponse.json(
        { error: 'Failed to insert record', details: error },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      record_id: data.id,
      message: 'Record successfully inserted'
    });
    
  } catch (error) {
    console.error('Error in DB test API (POST):', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: String(error) },
      { status: 500 }
    );
  }
}