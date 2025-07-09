import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createServerClient } from '@/app/utils/supabase';

// Don't initialize clients at the top level
const serpApiKey = process.env.SERPER_API_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;
const cronSecret = process.env.CRON_SECRET;

const SERPAPI_URL = 'https://serpapi.com/search.json';

export async function GET(request: NextRequest) {
  // Verify cron secret to ensure this endpoint is only called by the cron job
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Initialize Supabase client inside the handler function
    const supabase = createServerClient();
    
    // Initialize OpenAI client
    if (!openaiApiKey) {
      throw new Error('Missing OpenAI API key');
    }
    const openai = new OpenAI({ apiKey: openaiApiKey });

    // Get all active letter settings
    const { data: letterSettings, error: settingsError } = await supabase
      .from('letter_settings')
      .select('*');
    
    if (settingsError) {
      throw settingsError;
    }
    
    if (!letterSettings || letterSettings.length === 0) {
      return NextResponse.json({ message: 'No letter settings found' });
    }
    
    const results = [];
    
    // Process each letter settings
    for (const settings of letterSettings) {
      try {
        const { user_id, id: letter_settings_id, subjects, niche_interests, prompt } = settings;
        
        // Generate search topics from subjects and niche interests
        const searchTopics = [];
        
        // Add subjects as topics
        for (const subject of subjects) {
          searchTopics.push(subject);
        }
        
        // Add subject + niche interest combinations
        for (const nicheInterest of niche_interests) {
          searchTopics.push(`${nicheInterest.subject} ${nicheInterest.interest}`);
        }
        
        const allSummaries = [];
        
        // Search and summarize for each topic
        for (const topic of searchTopics) {
          // Search for articles
          const searchQuery = encodeURIComponent(topic);
          const serpUrl = `${SERPAPI_URL}?q=${searchQuery}&api_key=${serpApiKey}&num=3`;
          
          const serpRes = await fetch(serpUrl);
          if (!serpRes.ok) {
            console.error(`Failed to fetch search results for topic: ${topic}`);
            continue;
          }
          
          const serpData = await serpRes.json();
          const articles = serpData.organic_results?.slice(0, 3) || [];
          
          // Process and summarize each article
          for (const article of articles) {
            const title = article.title || 'No title';
            const snippet = article.snippet || 'No description available';
            const url = article.link || '';
            
            // Skip if no meaningful content
            if (!snippet || snippet.length < 20) {
              continue;
            }
            
            // Create AI prompt
            const aiPrompt = `
              You are writing a section for a personalized newsletter.
              
              USER INSTRUCTIONS: ${prompt}
              
              ARTICLE INFORMATION:
              Title: ${title}
              Snippet: ${snippet}
              URL: ${url}
              Topic: ${topic}
              
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
              .from('article_summaries_simple')
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
              continue;
            }
            
            allSummaries.push({
              id: section?.id,
              title,
              url,
              summary,
              topic,
            });
          }
        }
        
        // If we found summaries, generate a letter
        if (allSummaries.length > 0) {
          // Format letter content
          const letterContent = await generateLetterContent(settings, allSummaries);
          
          // Save letter post
          const { data: letterPost, error: letterError } = await supabase
            .from('letter_posts')
            .insert({
              user_id,
              letter_settings_id,
              title: `${settings.letter_name} - ${new Date().toLocaleDateString()}`,
              content: letterContent,
              published_at: new Date().toISOString(),
              created_at: new Date().toISOString(),
            })
            .select('id')
            .single();
            
          if (letterError) {
            throw letterError;
          }
          
          results.push({
            user_id,
            letter_settings_id,
            letter_post_id: letterPost?.id,
            summaries_count: allSummaries.length,
          });
        }
      } catch (err) {
        console.error(`Error processing letter settings ${settings.id}:`, err);
      }
    }
    
    return NextResponse.json({ 
      message: 'Letter generation complete', 
      generated: results.length,
      results 
    });
  } catch (error) {
    console.error('Error in generate-letters cron job:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

async function generateLetterContent(settings: any, summaries: any[]) {
  // Group summaries by topic
  const topicGroups: Record<string, any[]> = {};
  
  for (const summary of summaries) {
    if (!topicGroups[summary.topic]) {
      topicGroups[summary.topic] = [];
    }
    topicGroups[summary.topic].push(summary);
  }
  
  // Create the letter content with sections for each topic
  let content = `Dear Reader,\n\n`;
  content += `Welcome to your personalized ${settings.letter_name}. Here are today's updates:\n\n`;
  
  // Add each topic section
  for (const [topic, topicSummaries] of Object.entries(topicGroups)) {
    content += `## ${topic}\n\n`;
    
    for (const summary of topicSummaries) {
      content += `### ${summary.title}\n\n`;
      content += `${summary.summary}\n\n`;
      content += `[Read more](${summary.url})\n\n`;
    }
  }
  
  content += `Thank you for reading today's letter. We'll be back tomorrow with more updates tailored to your interests.\n\n`;
  content += `Best regards,\nYour AI Letter Assistant`;
  
  return content;
} 