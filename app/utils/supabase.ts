import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Export a function instead of an initialized client
export function createServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase server credentials');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    }
  });
}

// Create a separate client for blog functionality
export function createBlogServerClient() {
  const blogSupabaseUrl = process.env.BLOG_SUPABASE_URL;
  const blogSupabaseServiceKey = process.env.BLOG_SUPABASE_SERVICE_ROLE_KEY;
  
  if (!blogSupabaseUrl || !blogSupabaseServiceKey) {
    throw new Error('Missing Blog Supabase server credentials');
  }
  
  return createClient(blogSupabaseUrl, blogSupabaseServiceKey, {
    auth: {
      persistSession: false,
    }
  });
}