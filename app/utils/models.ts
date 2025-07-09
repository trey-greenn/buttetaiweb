// Database models and types

export interface Profile {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface NicheInterest {
  interest: string;
  subject: string;
}

export interface LetterSettings {
  id: string;
  user_id: string;
  letter_name: string;
  subjects: string[];
  niche_interests: NicheInterest[];
  prompt: string;
  frequency: string;
  other?: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleSummary {
  id: string;
  user_id: string;
  section_id: string;
  title: string;
  url: string;
  raw_snippet: string;
  summary_text: string;
  created_at: string;
}

export interface ArticleSummarySimple {
  id: string;
  title: string;
  url: string;
  raw_snippet: string;
  summary: string;
  created_at: string;
}



export interface LetterPost {
  id: string;
  user_id: string;
  letter_settings_id: string;
  title: string;
  content: string;
  published_at: string;
  created_at: string;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
} 