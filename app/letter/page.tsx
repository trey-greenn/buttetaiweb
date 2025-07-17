'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import { createClient } from '@supabase/supabase-js';
import { LetterSettings, NicheInterest } from '../utils/models';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { withAuth } from '@/app/lib/with-auth';
import TrialFeature from '@/app/components/subscriptions/TrialFeature';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

const subjects = [
  'Technology',
  'Politics',
  'Business',
  'War',
  'Art',
  'Health',
  'Medicine',
  'Science',
  'Education',
  'Finance',
  'Sports',
  'Entertainment',
  'Environment',
  'History'
];

function LetterPage() {
  const { user } = useAuth();
  const [letterName, setLetterName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  
  const [nicheInterests, setNicheInterests] = useState<NicheInterest[]>([]);
  const [interestInput, setInterestInput] = useState('');
  const [subjectForInterest, setSubjectForInterest] = useState('');
  
  const [prompt, setPrompt] = useState('');
  const [other, setOther] = useState('');
  
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [letterSettingsId, setLetterSettingsId] = useState<string | null>(null);

  // Load letter settings on component mount
  useEffect(() => {
    loadLetterSettings();
  }, []);

  const loadLetterSettings = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('letter_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        if (error.code !== 'PGRST116') { // PGRST116 is "No rows returned" which is expected for new users
          console.error('Error loading letter settings:', error);
          toast.error('Failed to load letter settings');
        }
        setIsEditing(true); // Allow editing for new users
      } else if (data) {
        // Populate form fields with data
        setLetterSettingsId(data.id);
        setLetterName(data.letter_name);
        setSelectedSubjects(data.subjects);
        setNicheInterests(data.niche_interests);
        setPrompt(data.prompt);
        setOther(data.other || '');
        setIsEditing(false); // Disable editing until user clicks Edit
      }
    } catch (err) {
      console.error('Error loading letter settings:', err);
      toast.error('Failed to load letter settings');
    } finally {
      setIsLoading(false);
    }
  };

  const addSubject = (subject: string) => {
    if (!selectedSubjects.includes(subject)) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
    setShowSubjectDropdown(false);
  };

  const removeSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
  };

  const addNicheInterest = () => {
    if (interestInput && subjectForInterest) {
      setNicheInterests([...nicheInterests, {
        interest: interestInput,
        subject: subjectForInterest
      }]);
      setInterestInput('');
      setSubjectForInterest('');
    }
  };

  const removeNicheInterest = (index: number) => {
    setNicheInterests(nicheInterests.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('You must be logged in to save letter settings');
      return;
    }
    
    setIsSaving(true);
    try {
      const letterData = {
        user_id: user.id,
        letter_name: letterName,
        subjects: selectedSubjects,
        niche_interests: nicheInterests,
        prompt: prompt,
        frequency: 'daily' as const,
        other: other,
        updated_at: new Date().toISOString(),
      };
      
      let response;
      
      if (letterSettingsId) {
        // Update existing record
        response = await supabase
          .from('letter_settings')
          .update(letterData)
          .eq('id', letterSettingsId);
      } else {
        // Insert new record
        response = await supabase
          .from('letter_settings')
          .insert({
            ...letterData,
            created_at: new Date().toISOString(),
          });
        
        // Get the new record's ID
        if (!response.error) {
          const { data } = await supabase
            .from('letter_settings')
            .select('id')
            .eq('user_id', user.id)
            .single();
            
          if (data) {
            setLetterSettingsId(data.id);
          }
        }
      }
      
      if (response.error) {
        throw response.error;
      }
      
      toast.success('Letter settings saved successfully');
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving letter settings:', err);
      toast.error('Failed to save letter settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#5e503f]" />
        <span className="ml-2 text-[#403d39]">Loading letter settings...</span>
      </div>
    );
  }

  return (
    <TrialFeature>
    <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen ">
      <h1 className="text-3xl font-bold mb-8 text-[#5e503f]">Letter Automation</h1>
      
      {/* Letter Name */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-[#ccc5b9]">
        <h2 className="text-xl font-semibold mb-4 text-[#5e503f]">Letter Name</h2>
        <input
          type="text"
          value={letterName}
          onChange={(e) => setLetterName(e.target.value)}
          placeholder="John Does Techno-Business Daily Letter"
          className="w-full p-3 border border-[#ccc5b9] rounded-md bg-white text-[#403d39] placeholder-[#bebab3]"
          disabled={!isEditing}
        />
      </div>
      
      {/* Subjects */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-[#ccc5b9]">
        <h2 className="text-xl font-semibold mb-4 text-[#5e503f]">Subjects</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSubjects.map(subject => (
            <div key={subject} className="bg-[#5e503f] px-3 py-1 rounded-full flex items-center text-white">
              <span>{subject}</span>
              {isEditing && (
                <button 
                  onClick={() => removeSubject(subject)}
                  className="ml-2 text-white hover:text-red-400"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        
        {isEditing && (
          <div className="relative">
            <div 
              className="flex items-center justify-between p-3 border border-[#ccc5b9] rounded-md cursor-pointer bg-white text-[#403d39]"
              onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
            >
              <span className="text-[#7e6551]">Select subjects...</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#7e6551]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            {showSubjectDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#ccc5b9] rounded-md shadow-lg max-h-60 overflow-auto">
                {subjects.filter(subject => !selectedSubjects.includes(subject)).map(subject => (
                  <div 
                    key={subject}
                    className="p-2 hover:bg-[#f5f0e1] cursor-pointer text-[#403d39]"
                    onClick={() => addSubject(subject)}
                  >
                    {subject}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Niche Interests */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-[#ccc5b9]">
        <h2 className="text-xl font-semibold mb-4 text-[#5e503f]">Niche Interests</h2>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {nicheInterests.map((item, index) => (
            <div key={index} className="bg-[#7e6551] px-3 py-1 rounded-full flex items-center text-white">
              <span>{item.subject}({item.interest})</span>
              {isEditing && (
                <button 
                  onClick={() => removeNicheInterest(index)}
                  className="ml-2 text-white hover:text-red-400"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        
        {isEditing && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1 text-[#403d39]">Interest</h3>
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="AI, ML"
                className="w-full p-3 border border-[#ccc5b9] rounded-md bg-white text-[#403d39] placeholder-[#bebab3]"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1 text-[#403d39]">Subject</h3>
              <select
                title="Subject"
                value={subjectForInterest}
                onChange={(e) => setSubjectForInterest(e.target.value)}
                className="w-full p-3 border border-[#ccc5b9] rounded-md bg-white text-[#403d39]"
              >
                <option value="">Select a subject</option>
                {selectedSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={addNicheInterest}
              className="bg-[#5e503f] text-white px-4 py-2 rounded-md hover:bg-[#403d39] disabled:bg-[#bebab3] disabled:cursor-not-allowed"
              disabled={!interestInput || !subjectForInterest}
            >
              Add Interest
            </button>
          </div>
        )}
      </div>
      
      {/* Prompt */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-[#ccc5b9]">
        <h2 className="text-xl font-semibold mb-4 text-[#5e503f]">Prompt</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="I want daily updates on what is happening in AI and ML markets. Essays and writing from Thomas Sowell. News updates on the Oil and Gas industry."
          className="w-full p-3 border border-[#ccc5b9] rounded-md bg-white text-[#403d39] placeholder-[#bebab3] h-32"
          disabled={!isEditing}
        />
      </div>
      
      {/* Frequency */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-[#ccc5b9]">
        <h2 className="text-xl font-semibold mb-4 text-[#5e503f]">Frequency</h2>
        <div className="bg-[#f5f0e1] p-3 rounded-md text-[#403d39] border border-[#ccc5b9]">
          Daily <span className="text-sm text-[#7e6551]">*Only option is daily for now. Email us otherwise.</span>
        </div>
      </div>
      
      {/* Other */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-[#ccc5b9]">
        <h2 className="text-xl font-semibold mb-4 text-[#5e503f]">Other</h2>
        <textarea
          value={other}
          onChange={(e) => setOther(e.target.value)}
          placeholder="You can attatch PDFS and other documents of writings. I want it written in a business oriented style..."
          className="w-full p-3 border border-[#ccc5b9] rounded-md bg-white text-[#403d39] placeholder-[#bebab3] h-24"
          disabled={!isEditing}
        />
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-[#5e503f] text-white px-6 py-2 rounded-md hover:bg-[#403d39] flex items-center"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : 'Save'}
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-[#5e503f] text-white px-6 py-2 rounded-md hover:bg-[#403d39]"
          >
            Edit
          </button>
        )}
      </div>
    </div>
    </TrialFeature>
  );
}

export default withAuth(LetterPage);