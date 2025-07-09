'use client';

import { useState } from 'react';
import { withAuth } from '@/app/lib/with-auth';
import { toast } from 'react-hot-toast';

type ImageSize = '1024x1024' | '1024x1792' | '1792x1024';
type ImageQuality = 'standard' | 'hd';
type ImageStyle = 'vivid' | 'natural';

interface GeneratedImage {
  url: string;
  revised_prompt?: string;
}

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1024x1024');
  const [quality, setQuality] = useState<ImageQuality>('standard');
  const [style, setStyle] = useState<ImageStyle>('vivid');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [revisedPrompt, setRevisedPrompt] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setRevisedPrompt(null);
    
    try {
      const response = await fetch('/api/image/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
          quality,
          style,
          n: 1, // Generate one image at a time
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }
      
      setGeneratedImages(data.images);
      
      // Set revised prompt if available
      if (data.images[0]?.revised_prompt) {
        setRevisedPrompt(data.images[0].revised_prompt);
      }
      
      toast.success('Image generated successfully!');
    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(err.message || 'Failed to generate image. Please try again.');
      toast.error('Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#5e503f] mb-6">AI Image Generation</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#ebe3cd] mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-lg font-medium text-[#403d39] mb-2">
              Enter your prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5e503f] focus:border-[#5e503f] min-h-32"
              placeholder="Describe the image you want to generate..."
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-[#403d39] mb-1">
                Image Size
              </label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value as ImageSize)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5e503f] focus:border-[#5e503f]"
              >
                <option value="1024x1024">Square (1024x1024)</option>
                <option value="1024x1792">Portrait (1024x1792)</option>
                <option value="1792x1024">Landscape (1792x1024)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="quality" className="block text-sm font-medium text-[#403d39] mb-1">
                Quality
              </label>
              <select
                id="quality"
                value={quality}
                onChange={(e) => setQuality(e.target.value as ImageQuality)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5e503f] focus:border-[#5e503f]"
              >
                <option value="standard">Standard</option>
                <option value="hd">HD</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-[#403d39] mb-1">
                Style
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value as ImageStyle)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5e503f] focus:border-[#5e503f]"
              >
                <option value="vivid">Vivid</option>
                <option value="natural">Natural</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5e503f] text-white py-3 px-4 rounded-md hover:bg-[#403d39] transition disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </button>
        </form>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {revisedPrompt && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6">
          <p className="font-semibold mb-1">Revised prompt used by DALL-E:</p>
          <p>{revisedPrompt}</p>
        </div>
      )}
      
      {generatedImages.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#5e503f] mb-4">Generated Image</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {generatedImages.map((image, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-[#ebe3cd]">
                <div className="relative aspect-square md:aspect-auto rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={image.url}
                    alt={`Generated image for: ${prompt}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
                  <a 
                    href={image.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5e503f] hover:text-[#403d39] font-medium"
                  >
                    Open Original
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(image.url);
                      toast.success('Image URL copied to clipboard!');
                    }}
                    className="mt-2 sm:mt-0 text-[#5e503f] hover:text-[#403d39] font-medium"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(ImageGeneration);