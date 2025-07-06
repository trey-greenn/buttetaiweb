import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl w-full flex flex-col items-center gap-12 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">BuffetAI</h1>
          <p className="text-xl md:text-2xl text-gray-700">Personal AI-Powered Newsletter Platform</p>
        </div>
        
        <div className="w-full text-center md:text-left">
          <p className="text-lg mb-8 text-black">
            Control your information diet — choose exactly what topics you want to read, learn, and grow in.
          </p>
          
          <div className="bg-black text-white p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-6">📬 Newsletter Tool</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Create personalized newsletter sections by selecting topics and frequency</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Automatically pull the latest articles using News API</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>AI-powered summarization for concise, digestible insights</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Receive beautifully formatted newsletters via email</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-black text-white p-8 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">🎯 Our Mission</h2>
          <blockquote className="text-center italic text-xl mb-4">
            "BuffetAI helps you read with intention, not impulse."
          </blockquote>
          <p className="text-center">
            Instead of being overwhelmed by endless newsfeeds or unfiltered content, 
            BuffetAI lets you decide what you learn — delivered straight to your inbox, on your schedule.
          </p>
        </div>
        
        <div className="flex gap-6 mt-8 w-full justify-center flex-col sm:flex-row">
          <a
            className="bg-black text-white px-8 py-4 rounded-md font-medium hover:bg-black/80 transition-colors text-center"
            href="/signup"
          >
            Get Started
          </a>
          <a
            className="border-2 border-black bg-black px-8 py-4 rounded-md font-medium hover:bg-black hover:text-white transition-colors text-center"
            href="/learn-more"
          >
            Learn More
          </a>
        </div>
      </main>
      
      <footer className="py-8 text-center text-gray-600">
        <p>© {new Date().getFullYear()} BuffetAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
