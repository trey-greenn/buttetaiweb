import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The blog post you're looking for doesn't exist or may have been removed.
      </p>
      <Link 
        href="/blog" 
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Return to Blog
      </Link>
    </div>
  );
}