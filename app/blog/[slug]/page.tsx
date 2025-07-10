import { createBlogServerClient } from '@/app/utils/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';

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

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  console.log(`Fetching blog post with slug: ${slug}`);
  const supabase = createBlogServerClient();
  
  try {
    const { data, error } = await supabase
      .from('blog_posts_buffet')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
      
    console.log('Blog post data:', data);
    
    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
    
    return data;
  } catch (e) {
    console.error('Exception in getBlogPost:', e);
    return null;
  }
}

// Keep generateStaticParams for better static generation
export async function generateStaticParams() {
  const supabase = createBlogServerClient();
  const { data } = await supabase
    .from('blog_posts_buffet')
    .select('slug')
    .eq('is_published', true);
    
  return (data || []).map((post) => ({
    slug: post.slug,
  }));
}

// Updated component to properly await the params Promise
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params promise to get the actual slug
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  console.log(`Rendering BlogPostPage for slug: ${slug}`);
  const post = await getBlogPost(slug);
  
  if (!post) {
    console.log('Blog post not found, redirecting to 404');
    notFound();
  }
  
  return (
    <article className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((tag) => (
            <span 
              key={tag} 
              className="inline-block text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {post.published_at && (
          <time 
            dateTime={post.published_at}
            className="text-sm text-gray-600"
          >
            Published {format(new Date(post.published_at), 'MMMM d, yyyy')}
          </time>
        )}
      </div>
      
      {post.cover_image_url && (
        <div className="relative h-72 md:h-96 w-full mb-8 overflow-hidden rounded-lg">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      )}
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}