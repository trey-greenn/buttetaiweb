// app/api/cron/letter-generator/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { LetterSettings, NicheInterest } from '@/app/utils/models';

// Environment variables
const serpApiKey = process.env.SERPER_API_KEY;
const SERPAPI_URL = 'https://serpapi.com/search.json';
const openaiApiKey = process.env.OPENAI_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const cronSecret = process.env.CRON_SECRET;

// Initialize clients
const openai = new OpenAI({ apiKey: openaiApiKey });
const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

// Define interface for article summaries
interface ArticleSummary {
  id?: string;
  title: string;
  url: string;
  raw_snippet?: string;
  summary: string;
  created_at?: string;
}

export async function GET(request: NextRequest) {
    // Check if it's a Vercel cron job or verify using secret
    const isVercelCron = request.headers.get('x-vercel-cron') === '1';
    const hasValidAuth = request.headers.get('authorization') === `Bearer ${cronSecret}`;
    
    if (!isVercelCron && !hasValidAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
  try {
    // Validate environment variables
    if (!serpApiKey || !openaiApiKey || !supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing required environment variables' },
        { status: 500 }
      );
    }

    // Get all letter settings from Supabase
    const { data: letterSettings, error: settingsError } = await supabase
      .from('letter_settings')
      .select('*');
      
    if (settingsError) {
      throw settingsError;
    }
    
    if (!letterSettings || letterSettings.length === 0) {
      return NextResponse.json({ message: 'No letter settings found' });
    }
    
    console.log(`Found ${letterSettings.length} letter settings to process`);
    
    const results = [];
    
    // Process each letter settings
    for (const settings of letterSettings) {
      try {
        const user_id = settings.user_id;
        const letter_settings_id = settings.id;
        
        console.log(`Processing letter settings for user ${user_id}`);
        
        // Topics to search for (combine subjects and niche interests)
        const topics = [...settings.subjects];
        
        // Add niche interests to topics if they exist
        if (settings.niche_interests && settings.niche_interests.length > 0) {
          for (const nicheInterest of settings.niche_interests) {
            if (nicheInterest.subject && nicheInterest.interest) {
              topics.push(`${nicheInterest.subject} ${nicheInterest.interest}`);
            }
          }
        }
        
        console.log(`Topics to search: ${topics.join(', ')}`);
        
        const allSummaries = [];
        
        // Process each topic
        for (const topic of topics) {
          // Search for articles on the topic
          const searchQuery = encodeURIComponent(topic);
          const serpUrl = `${SERPAPI_URL}?q=${searchQuery}&api_key=${serpApiKey}&num=5`;
          
          const serpResponse = await fetch(serpUrl);
          
          if (!serpResponse.ok) {
            console.error(`Failed to fetch search results for topic ${topic}:`, serpResponse.statusText);
            continue;
          }
          
          const serpData = await serpResponse.json();
          const articles = serpData.organic_results?.slice(0, 3) || [];
          
          // Skip if no articles found
          if (articles.length === 0) {
            console.log(`No articles found for topic ${topic}`);
            continue;
          }
          
          // Process each article
          for (const article of articles) {
            const title = article.title || 'No title';
            const snippet = article.snippet || 'No description available';
            const url = article.link || '';
            
            // Generate summary with OpenAI using the user's prompt
            const articlesContent = `Title: ${title}\nSnippet: ${snippet}\nURL: ${url}\n`;
            
            // Use the user's custom prompt if available, otherwise use a default one
            // const systemPrompt = settings.prompt 
            //   ? `You are writing a newsletter section based on the user's preferences. Their custom prompt is: ${settings.prompt}`
            //   : 'You are a helpful assistant that summarizes web content for a newsletter.';

              const systemPrompt = `
              You are writing a newsletter section based on the user's preferences. 
              Write 5 concise, but information-packed bullet points for each section based on the newsletter's subjects and niche interests. 
              Each bullet point should be between 3–6 sentences. 
              All technical jargon should be thoroughly explained in simple terms — as if you're teaching a 3rd grader. 
              Use clear structure and avoid fluff. Prioritize value, clarity, and accuracy.
              `.trim();
            
            const openaiResponse = await openai.chat.completions.create({
              model: 'gpt-4-turbo',
              messages: [
                { 
                  role: 'system', 
                  content: systemPrompt
                },
                {
                  role: 'user',
                  content: `You are a professional blog writer. Please provide a concise, informative, and well-structured summary of the following article about "${topic}". 
                
                Your summary should include:
                1. A brief introduction to the topic.
                2. Key points and insights from the article (use bullet points if helpful).
                3. Any notable quotes, data, or perspectives mentioned.
                4. A short conclusion or takeaway.
                
                Here is the article:\n\n${articlesContent}`
                }
              ],
              temperature: 0.7,
            });
            
            const summary = openaiResponse.choices[0]?.message?.content || 'No summary generated.';
            
            // Save to Supabase
            const articleSummary: ArticleSummary = {
            title,
              url,
              raw_snippet: snippet,
              summary: summary,
              created_at: new Date().toISOString(),
            };
            
            const { data: savedSummary, error: summaryError } = await supabase
              .from('article_summaries_simple')
              .insert(articleSummary)
              .select('id')
              .single();
              
            if (summaryError) {
              console.error('Error saving article summary:', summaryError);
              continue;
            }
            
            allSummaries.push({
              id: savedSummary.id,
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
        } else {
          console.log(`No summaries generated for user ${user_id}`);
        }
      } catch (err) {
        console.error(`Error processing letter settings ${settings.id}:`, err);
      }
    }
    
    return NextResponse.json({
      success: true,
      processed: letterSettings.length,
      results,
    });
    
  } catch (error) {
    console.error('Error in letter generator cron job:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: String(error) },
      { status: 500 }
    );
  }
}

async function generateLetterContent(settings: LetterSettings, summaries: any[]) {
  // Group summaries by topic
  const topicGroups: Record<string, any[]> = {};
  
  for (const summary of summaries) {
    if (!topicGroups[summary.topic]) {
      topicGroups[summary.topic] = [];
    }
    topicGroups[summary.topic].push(summary);
  }
  
  // Generate letter content with custom prompt if available
  try {
    const summaryContent = Object.entries(topicGroups).map(([topic, topicSummaries]) => {
      return {
        topic,
        articles: topicSummaries.map(s => ({
          title: s.title,
          summary: s.summary,
          url: s.url
        }))
      };
    });
    
    // If user has a custom prompt, use OpenAI to generate a more tailored letter
    if (settings.prompt && settings.prompt.trim().length > 0) {
      const letterStructure = JSON.stringify(summaryContent, null, 2);
      
      const openaiResponse = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [
          { 
            role: 'system', 
            content: `You are writing a personalized newsletter. The user's preferences: ${settings.prompt}`
          },
          { 
            role: 'user', 
            content: `Create a well-formatted newsletter letter using the following topics and summaries:\n\n${letterStructure}\n\nThe letter should have a greeting, sections for each topic, and a closing. Use Markdown formatting.`
          }
        ],
        temperature: 0.7,
      });
      
      return openaiResponse.choices[0]?.message?.content || createDefaultLetter(settings, topicGroups);
    } else {
      return createDefaultLetter(settings, topicGroups);
    }
  } catch (error) {
    console.error('Error generating letter content:', error);
    return createDefaultLetter(settings, topicGroups);
  }
}

function createDefaultLetter(settings: LetterSettings, topicGroups: Record<string, any[]>) {
  // Create a default letter format
  let content = `# ${settings.letter_name} - ${new Date().toLocaleDateString()}\n\n`;
  content += `Dear Reader,\n\n`;
  content += `Welcome to your personalized newsletter. Here are today's updates:\n\n`;
  
  // Add each topic section
  for (const [topic, topicSummaries] of Object.entries(topicGroups)) {
    content += `## ${topic}\n\n`;
    
    for (const summary of topicSummaries) {
      content += `### ${summary.title}\n\n`;
      content += `${summary.summary}\n\n`;
      content += `[Read more](${summary.url})\n\n`;
    }
  }
  
  content += `Thank you for reading today's letter. We'll be back with more updates tailored to your interests.\n\n`;
  content += `Best regards,\nYour AI Letter Assistant`;
  
  return content;
} 