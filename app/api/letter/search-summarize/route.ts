import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
const serpApiKey = process.env.NEXT_PUBLIC_SERPAPI_KEY;
const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
const openai = new OpenAI({ apiKey: openaiApiKey });

const SERPAPI_URL = 'https://serpapi.com/search.json';

const RequestSchema = z.object({
  user_id: z.string().uuid(),
  letter_settings_id: z.string().uuid(),
  topic: z.string().min(1),
  prompt: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = RequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validation.error.format() },
        { status: 400 }
      );
    }
    
    const { user_id, letter_settings_id, topic, prompt } = validation.data;
    
    // Search for articles using SERPAPI
    const searchQuery = encodeURIComponent(topic);
    const serpUrl = `${SERPAPI_URL}?q=${searchQuery}&api_key=${serpApiKey}&num=5`;
    
    const serpRes = await fetch(serpUrl);
    if (!serpRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch search results' },
        { status: 500 }
      );
    }
    
    const serpData = await serpRes.json();
    const articles = serpData.organic_results?.slice(0, 5) || [];
    
    // Process and summarize each article
    const summaries = [];
    
    for (const article of articles) {
      const title = article.title || 'No title';
      const snippet = article.snippet || 'No description available';
      const url = article.link || '';
      
      // Skip if no meaningful content
      if (!snippet || snippet.length < 20) {
        continue;
      }
      
      // Create AI prompt with user context
      const aiPrompt = `
        You are writing a section for a personalized newsletter.
        
        USER INSTRUCTIONS: ${prompt}
        
        ARTICLE INFORMATION:
        Title: ${title}
        Snippet: ${snippet}
        URL: ${url}
        
        Based on the user's instructions and this article, write a concise, informative newsletter section.
        Format it properly for a newsletter with paragraphs, and make it engaging.
        Keep it under 300 words.
      `;
      
      // Get summary from OpenAI
      const openaiResponse = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant summarizing web content for a newsletter.' },
          { role: 'user', content: aiPrompt },
        ],
        temperature: 0.7,
      });
      
      const summary = openaiResponse.choices[0]?.message?.content || 'No summary generated.';
      
      // Save to Supabase
      const { data: section, error: sectionError } = await supabase
        .from('article_summaries')
        .insert({
          user_id,
          section_id: letter_settings_id,
          title,
          url,
          raw_snippet: snippet,
          summary_text: summary,
        })
        .select('id')
        .single();
        
      if (sectionError) {
        console.error('Error saving article summary:', sectionError);
      }
      
      summaries.push({
        id: section?.id,
        title,
        url,
        summary,
      });
    }
    
    return NextResponse.json({ topic, summaries });
  } catch (error) {
    console.error('Error in search-summarize API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}