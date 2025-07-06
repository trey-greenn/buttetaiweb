import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      title: 'Personalized Newsletter Sections',
      description: 'Select topics like "AI in Healthcare" or "Emerging Markets", write custom instructions, and choose your preferred frequency.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5e503f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Automatic Content Curation',
      description: 'Our system automatically pulls the latest articles on your topics using a cutting-edge News API.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5e503f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'AI-Powered Summarization',
      description: 'Using OpenAI technology, we generate concise, digestible insights from raw content so you get the essence without the fluff.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5e503f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Beautiful Email Delivery',
      description: 'Receive a beautifully formatted AI-generated newsletter via email, without needing to write or compile anything yourself.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5e503f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Flexible Delivery Options',
      description: 'Choose to Send Now for an instant preview or Schedule Later for automated future delivery on your preferred cadence.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5e503f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Set It and Forget It',
      description: 'Let the system run in the background with no ongoing work required — your personal AI assistant is always on duty.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5e503f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#f5f0e1] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5e503f] mb-6">
            BuffettAI: Personal AI-Powered Newsletter Platform
          </h1>
          <p className="text-xl text-[#403d39] max-w-3xl mx-auto leading-relaxed">
            A content mastery platform designed to help individuals control their information diet — by choosing exactly what topics they want to read, learn, and grow in.
          </p>
          <div className="mt-10">
            <Link 
              href="/signup" 
              className="inline-block bg-[#5e503f] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#403d39] transition mr-4"
            >
              Get Started
            </Link>
            <Link 
              href="/pricing" 
              className="inline-block bg-[#ebe3cd] text-[#5e503f] px-8 py-3 rounded-md text-lg font-medium hover:bg-[#d8ceb6] transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Tool Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#5e503f] mb-4">
              📬 Newsletter Tool: Automate Your Learning
            </h2>
            <p className="text-lg text-[#403d39] max-w-3xl mx-auto">
              The Newsletter Tool is BuffettAI's flagship product that puts you in control of your information consumption.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#f5f0e1] p-6 rounded-lg shadow-md border border-[#ebe3cd] hover:shadow-lg transition"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#5e503f] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#403d39]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#ebe3cd]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#5e503f] mb-6">
            🎯 Key Value Proposition
          </h2>
          <blockquote className="text-2xl italic text-[#403d39] mb-10">
            "BuffettAI helps you read with intention, not impulse."
          </blockquote>
          <p className="text-lg text-[#403d39] mb-8 leading-relaxed">
            Instead of being overwhelmed by endless newsfeeds or unfiltered content, BuffettAI lets you decide what you learn — and delivers clean, insightful, AI-curated newsletters straight to your inbox, on your schedule.
          </p>
          <p className="text-lg text-[#403d39] leading-relaxed">
            It's like having a private research assistant + newsletter editor, always working in the background.
          </p>
          <div className="mt-10">
            <Link 
              href="/letter" 
              className="inline-block bg-[#5e503f] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#403d39] transition"
            >
              Create Your First Letter
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-xl border border-[#ebe3cd]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#5e503f] mb-6">
              Ready to Transform Your Information Diet?
            </h2>
            <p className="text-lg text-[#403d39] mb-8 max-w-3xl mx-auto">
              Join thousands of users who have taken control of their learning and stay informed on the topics that matter most to them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup" 
                className="bg-[#5e503f] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#403d39] transition"
              >
                Sign Up Free
              </Link>
              <Link 
                href="/login" 
                className="bg-[#ebe3cd] text-[#5e503f] px-8 py-3 rounded-md text-lg font-medium hover:bg-[#d8ceb6] transition"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}