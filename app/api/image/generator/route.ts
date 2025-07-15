import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { requireProPlan } from '@/app/utils/pro-middleware';

// Initialize OpenAI API key
const openaiApiKey = process.env.OPENAI_API_KEY;

// Request validation schema
const RequestSchema = z.object({
  prompt: z.string().min(1).max(1000),
  size: z.enum(['1024x1024', '1024x1792', '1792x1024']).default('1024x1024'),
  quality: z.enum(['standard', 'hd']).default('standard'),
  style: z.enum(['vivid', 'natural']).default('vivid'),
  n: z.number().int().min(1).max(4).default(1),
});

// Actual image generation handler
async function generateImageHandler(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validation = RequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      );
    }
    
    // Check OpenAI API key
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }
    
    const openai = new OpenAI({ apiKey: openaiApiKey });
    const { prompt, size, quality, style, n } = validation.data;
    
    // Call OpenAI API to generate image
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n,
      size,
      quality,
      style,
    });
    
    return NextResponse.json({
      images: response.data,
      created: response.created
    });
    
  } catch (error: any) {
    console.error('Error generating image:', error);
    
    // Handle rate limiting or quota errors
    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: error.status || 500 }
    );
  }
}

// Export the POST handler with Pro subscription check
export async function POST(request: NextRequest) {
  // Use the middleware to check for Pro access before processing the request
  return requireProPlan(request, generateImageHandler);
}