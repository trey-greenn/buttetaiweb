'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

interface LetterPost {
  id: string;
  title: string;
  summary: string;
  created_at: string;
}

export default function LetterPostPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<LetterPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<LetterPost | null>(null);

  useEffect(() => {
    if (user) {
      loadLetterPosts();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadLetterPosts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('article_summaries_simple')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setPosts(data || []);
    } catch (err) {
      console.error('Error loading letter posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPost = (post: LetterPost) => {
    setSelectedPost(post);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <span className="ml-2 text-gray-300">Loading your letters...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-900 min-h-screen text-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-white">Your Letters</h1>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <p className="text-gray-300">Please log in to view your letters.</p>
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 mt-4 inline-block">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-900 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-white">Your Letters</h1>
      
      {posts.length === 0 ? (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <p className="text-gray-300">You don't have any letters yet.</p>
          <Link href="/letter" className="text-indigo-400 hover:text-indigo-300 mt-4 inline-block">
            Go to Letter Settings to set up your first letter
          </Link>
        </div>
      ) : (
        <>
          {selectedPost ? (
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
              <div className="p-6">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-white mb-4 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to all letters
                </button>
                
                <h2 className="text-2xl font-bold mb-2 text-white">{selectedPost.title}</h2>
                <p className="text-gray-400 mb-6">
                  {format(new Date(selectedPost.created_at), 'MMMM d, yyyy')}
                </p>
                
                <div className="prose prose-invert max-w-none">
                  {selectedPost.summary.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map(post => (
                <div 
                  key={post.id}
                  className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden cursor-pointer hover:bg-gray-750 transition duration-200"
                  onClick={() => handleSelectPost(post)}
                >
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-2 text-white">{post.title}</h2>
                    <p className="text-gray-400 text-sm mb-3">
                      {format(new Date(post.created_at), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-gray-300 line-clamp-3">
                      {post.summary.substring(0, 150).replace(/\n/g, ' ')}...
                    </p>
                    <button 
                      className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                    >
                      Read full letter →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}