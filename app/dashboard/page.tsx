'use client';

import { useState } from 'react';
import { useAuth } from '@/app/lib/auth-context';
import Link from 'next/link';
import { withAuth } from '@/app/lib/with-auth';

function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#5e503f] mb-4">Profile Settings</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#ebe3cd]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#403d39] mb-1">Name</label>
                  <input 
                    title={user?.name || 'John Doe'}
                    placeholder={user?.name || 'John Doe'}
                    type="text" 
                    defaultValue={user?.name || ''} 
                    className="w-full p-2 border border-[#ccc5b9] rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#403d39] mb-1">Email</label>
                  <input 
                    title={user?.email || 'john.doe@example.com'}
                    placeholder={user?.email || 'john.doe@example.com'}
                    type="email" 
                    defaultValue={user?.email || ''} 
                    className="w-full p-2 border border-[#ccc5b9] rounded-md"
                    readOnly
                  />
                </div>
                <button 
                  className="px-4 py-2 bg-[#5e503f] text-white rounded-md hover:bg-[#403d39] transition disabled:opacity-50"
                  disabled
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        );
      case 'letter':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#5e503f] mb-4">Letter Management</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#ebe3cd]">
              <p className="text-[#403d39] mb-4">Manage your personalized AI newsletters here.</p>
              <Link 
                href="/letter" 
                className="px-4 py-2 bg-[#5e503f] text-white rounded-md hover:bg-[#403d39] inline-block transition"
              >
                Create New Letter
              </Link>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#5e503f] mb-4">Image Generation</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#ebe3cd]">
              <p className="text-[#403d39] mb-4">Generate AI images for your content.</p>
              <button 
                className="px-4 py-2 bg-[#5e503f] text-white rounded-md hover:bg-[#403d39] transition disabled:opacity-50"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
        );
      case 'agent':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#5e503f] mb-4">AI Agents</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#ebe3cd]">
              <p className="text-[#403d39] mb-4">Configure your AI assistants to help with research and content creation.</p>
              <button 
                className="px-4 py-2 bg-[#5e503f] text-white rounded-md hover:bg-[#403d39] transition disabled:opacity-50"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e1] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#ebe3cd]">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-1/5 bg-[#ebe3cd] p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'profile'
                      ? 'bg-[#5e503f] text-white'
                      : 'text-[#403d39] hover:bg-[#d8ceb6]'
                  }`}
                >
                  Personal Settings
                </button>
                <button
                  onClick={() => setActiveTab('letter')}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'letter'
                      ? 'bg-[#5e503f] text-white'
                      : 'text-[#403d39] hover:bg-[#d8ceb6]'
                  }`}
                >
                  Letter
                </button>
                <button
                  onClick={() => setActiveTab('image')}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'image'
                      ? 'bg-[#5e503f] text-white'
                      : 'text-[#403d39] hover:bg-[#d8ceb6]'
                  }`}
                >
                  Image Generation
                </button>
                <button
                  onClick={() => setActiveTab('agent')}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'agent'
                      ? 'bg-[#5e503f] text-white'
                      : 'text-[#403d39] hover:bg-[#d8ceb6]'
                  }`}
                >
                  AI Agents
                </button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-4/5 p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);