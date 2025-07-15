import { createBlogServerClient } from '@/app/utils/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

// Define the BlogPost type based on your database schema
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const revalidate = 3600; // Revalidate this page every hour

async function getBlogPosts(): Promise<BlogPost[]> {
  console.log('Starting getBlogPosts function');
  const supabase = createBlogServerClient();
  console.log('Supabase client created');
  
  try {
    console.log('Executing query for blog_posts_buffet table');
    const { data, error } = await supabase
      .from('blog_posts_buffet')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
      
    console.log('Query completed');
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
    
    console.log(`Found ${data?.length || 0} blog posts`);
    return data || [];
  } catch (e) {
    console.error('Exception in getBlogPosts:', e);
    return [];
  }
}

export default async function BlogPage() {
  console.log('Rendering BlogPage component');
  const blogPosts = await getBlogPosts();
  console.log(`BlogPage received ${blogPosts.length} posts`);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      
      {blogPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No blog posts available yet.</p>
          <p className="text-sm text-gray-500 mt-2">Check the server console for debugging information.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id}
              className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              {post.cover_image_url && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.cover_image_url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-105"
                    priority={index < 3} // Set priority for the first 3 images that are likely above the fold
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold line-clamp-2 mb-2">{post.title}</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-block text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {post.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                </p>
                <div className="text-xs text-gray-500">
                  {post.published_at && (
                    <time dateTime={post.published_at}>
                      {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                    </time>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}