import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;

// Create a single supabase client for server-side usage
export const supabaseAdmin = createClient(
    supabaseUrl || '', 
    supabaseServiceKey || '', 
    {
      auth: {
        persistSession: false,
      }
    }
  );