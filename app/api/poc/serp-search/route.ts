// app/api/poc/serp-search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// Environment variables
const serpApiKey = process.env.SERPER_API_KEY;
const SERPAPI_URL = 'https://serpapi.com/search.json';
const openaiApiKey = process.env.OPENAI_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Initialize clients
const openai = new OpenAI({ apiKey: openaiApiKey });
const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

// Define interface for our simplified table
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
    // Get the subject from URL parameters
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');

    // Validate input
    if (!subject) {
      return NextResponse.json(
        { error: 'Subject parameter is required' },
        { status: 400 }
      );
    }

    // Debug environment variables
    console.log('Environment check:');
    console.log('- SERPER_API_KEY:', serpApiKey ? 'Defined' : 'Undefined');
    console.log('- OPENAI_API_KEY:', openaiApiKey ? 'Defined' : 'Undefined');
    console.log('- SUPABASE_URL:', supabaseUrl ? 'Defined' : 'Undefined');
    console.log('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Defined' : 'Undefined');

    if (!serpApiKey) {
      return NextResponse.json(
        { error: 'SerpAPI key is not configured' },
        { status: 500 }
      );
    }

    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase configuration is missing' },
        { status: 500 }
      );
    }

    // Search for articles on the subject
    const searchQuery = encodeURIComponent(subject);
    const serpUrl = `${SERPAPI_URL}?q=${searchQuery}&api_key=${serpApiKey}&num=5`;
    
    const serpResponse = await fetch(serpUrl);
    
    if (!serpResponse.ok) {
      return NextResponse.json(
        { 
          error: 'Failed to fetch search results',
          status: serpResponse.status,
          statusText: serpResponse.statusText
        },
        { status: 500 }
      );
    }
    
    const serpData = await serpResponse.json();
    const articles = serpData.organic_results?.slice(0, 5) || [];
    
    // Extract and format the article data
    const formattedArticles = articles.map((article: any) => ({
      title: article.title || 'No title',
      snippet: article.snippet || 'No description available',
      url: article.link || '',
      position: article.position || 0,
      source: article.source || 'Unknown source'
    }));

    // Generate summary with OpenAI
    const articlesContent = formattedArticles
      .map((article: { title: string; snippet: string; url: string }) => 
        `Title: ${article.title}\nSnippet: ${article.snippet}\nURL: ${article.url}\n`)
      .join('\n');

    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful assistant that summarizes web content.' 
        },
        { 
          role: 'user', 
          content: `Summarize the following articles about "${subject}":\n\n${articlesContent}`
        }
      ],
      temperature: 0.7,
    });

    const summary = openaiResponse.choices[0]?.message?.content || 'No summary generated.';
    
    // Log the summary
    console.log('Generated Summary:', summary);
    
    // Store article summary in Supabase
    const savedSummaries = [];
    
    // Debug: Test Supabase connection with the new table
    try {
      console.log('Testing Supabase connection...');
      const { data: tableInfo, error: tableError } = await supabase
        .from('article_summaries_simple')
        .select('*')
        .limit(1);
        
      if (tableError) {
        console.error('Error connecting to article_summaries_simple table:', tableError);
      } else {
        console.log('Successfully connected to article_summaries_simple table');
      }
    } catch (supabaseError) {
      console.error('Supabase connection test error:', supabaseError);
    }
    
    // Try to insert a summary record for the search results
    try {
      console.log('Attempting to insert summary...');
      
      // Use the first article's info if available
      const firstArticle = formattedArticles[0] || { 
        title: subject, 
        url: '', 
        snippet: 'No article details available' 
      };
      
      // Create article summary object for our simplified table
      const articleSummary: ArticleSummarySimple = {
        title: firstArticle.title,
        url: firstArticle.url,
        raw_snippet: firstArticle.snippet,
        summary: summary
      };
      
      console.log('Inserting article summary:', articleSummary);
      
      const { data, error } = await supabase
        .from('article_summaries_simple')
        .insert(articleSummary)
        .select('id')
        .single();
        
      if (error) {
        console.error('Error saving summary:', error);
        
        // Check for specific error types
        if (error.code === '23502') { // not_null_violation
          console.error('Not null violation. Check required fields.');
        } else if (error.code === '42P01') { // undefined_table
          console.error('Table does not exist.');
        }
      } else {
        console.log('Successfully saved summary with ID:', data.id);
        savedSummaries.push({
          id: data.id,
          title: firstArticle.title,
          url: firstArticle.url,
        });
      }
    } catch (insertError) {
      console.error('Insert operation error:', insertError);
    }
    
    return NextResponse.json({
      subject,
      articles: formattedArticles,
      totalFound: formattedArticles.length,
      summary,
      savedSummaries,
      debug: {
        supabaseUrl: supabaseUrl ? 'Defined' : 'Undefined',
        supabaseKey: supabaseServiceKey ? 'Defined' : 'Undefined',
      }
    });
    
  } catch (error) {
    console.error('Error in SerpAPI POC:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: String(error) },
      { status: 500 }
    );
  }
}

// Add POST endpoint for direct summary insertion
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
    console.error('Error in SerpAPI POC (POST):', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: String(error) },
      { status: 500 }
    );
  }
}