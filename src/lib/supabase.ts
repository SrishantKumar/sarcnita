import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Custom types for better TypeScript support
export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  role: 'admin' | 'student';
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  space?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  media?: PostMedia[];
  profiles?: Profile;
  comments?: Comment[];
  likes?: Like[];
}

export interface PostMedia {
  id: string;
  post_id: string;
  media_url: string;
  media_type: 'image' | 'video';
  display_order: number;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: Profile;
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Newsletter {
  id: string;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
}
