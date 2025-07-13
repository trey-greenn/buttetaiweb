import React from 'react';
import Image from 'next/image';

export default function ResearchAssistantPage() {
  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8 font-[family-name:var(--font-geist-sans)] relative">
      {/* Content behind the overlay */}
      <main className="max-w-4xl w-full flex flex-col items-center gap-12 py-16 z-0">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">AI Research Assistant</h1>
          <p className="text-xl md:text-2xl text-gray-700">Your personal knowledge companion</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🔍 Deep Research</h2>
            <p className="mb-4">Access comprehensive research across multiple domains with just a few prompts.</p>
            <div className="h-32 bg-gray-800 rounded-md flex items-center justify-center">
              <span className="text-gray-400">Research visualization</span>
            </div>
          </div>
          
          <div className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">📊 Data Analysis</h2>
            <p className="mb-4">Transform raw data into actionable insights with AI-powered analytics.</p>
            <div className="h-32 bg-gray-800 rounded-md flex items-center justify-center">
              <span className="text-gray-400">Analytics dashboard</span>
            </div>
          </div>
          
          <div className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">📚 Knowledge Base</h2>
            <p className="mb-4">Build your personal knowledge repository that grows with every interaction.</p>
            <div className="h-32 bg-gray-800 rounded-md flex items-center justify-center">
              <span className="text-gray-400">Knowledge graph</span>
            </div>
          </div>
          
          <div className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🤖 AI Assistance</h2>
            <p className="mb-4">Get instant answers to complex questions with accurate citations.</p>
            <div className="h-32 bg-gray-800 rounded-md flex items-center justify-center">
              <span className="text-gray-400">Chat interface</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Coming Soon Overlay - reduced z-index to be below the header dropdown (which is z-10) */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-[5]">
        <div className="text-center px-4">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Coming Soon</h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
            We're working on something extraordinary. Our AI Research Assistant will revolutionize how you discover and process information.
          </p>
          <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-gray-300">
            Stay tuned for the launch
          </p>
        </div>
      </div>
    </div>
  );
}