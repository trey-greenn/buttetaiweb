'use client';

import Link from 'next/link';
import { useAuth } from '@/app/lib/auth-context';
import { useState } from 'react';

export default function Header() {
  const { user, signOut } = useAuth();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  return (
    <header className="bg-[#f5f0e1] shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="font-bold text-2xl text-[#5e503f]">
              BuffettAI
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <button 
                  onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                  className="text-[#5e503f] hover:text-[#403d39] flex items-center"
                >
                  Tools
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>
                
                {showToolsDropdown && (
                  <div className="absolute z-10 left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link 
                      href="/letter" 
                      className="block px-4 py-2 text-sm text-[#5e503f] hover:bg-[#f5f0e1]"
                      onClick={() => setShowToolsDropdown(false)}
                    >
                      Letter
                    </Link>
                    <Link 
                      href="/agent" 
                      className="block px-4 py-2 text-sm text-[#5e503f] hover:bg-[#f5f0e1]"
                      onClick={() => setShowToolsDropdown(false)}
                    >
                      Agent
                    </Link>
                    <Link 
                      href="/image" 
                      className="block px-4 py-2 text-sm text-[#5e503f] hover:bg-[#f5f0e1]"
                      onClick={() => setShowToolsDropdown(false)}
                    >
                      Image
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href="/pricing" className="text-[#5e503f] hover:text-[#403d39]">
                Pricing
              </Link>
              
              <Link href="/about" className="text-[#5e503f] hover:text-[#403d39]">
                About
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-[#5e503f] hover:text-[#403d39]">
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="text-[#5e503f] hover:text-[#403d39]"
                >
                  Sign Out
                </button>
                <Link href="/profile" className="block w-8 h-8 rounded-full bg-[#5e503f] text-white flex items-center justify-center">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[#5e503f] hover:text-[#403d39]">
                  Log In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-[#5e503f] text-white px-4 py-2 rounded hover:bg-[#403d39] transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
