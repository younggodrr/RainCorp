"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, Users, MessageCircleQuestion, Settings, 
  Menu, X, FolderKanban, ArrowLeft, Search, MessageSquare, 
  LayoutDashboard, Briefcase, Upload
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';

export default function CreateJobPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Jobs');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    window.dispatchEvent(new Event('themeChanged'));
  };

  return (
    <div className={`h-screen font-sans flex overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      
      {/* TOP NAVIGATION BAR */}
      <TopNavigation 
        title="Post Job" 
        onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
        isDarkMode={isDarkMode}
      />

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            <div className={`absolute top-0 left-0 w-full h-full shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left ${isDarkMode ? 'bg-black border-r border-[#E70008]/20' : 'bg-white'}`}>
              <div className={`p-4 border-b flex items-center justify-between sticky top-0 z-10 ${isDarkMode ? 'bg-black border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                <Link href="/" className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E50914]">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                   </div>
                   <span className="text-lg font-bold tracking-tight">
                      <span className="text-[#F4A261]">Magna</span>
                      <span className="text-[#E50914]">Coders</span>
                   </span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-full hover:bg-gray-100 ${isDarkMode ? 'text-gray-400 hover:bg-[#E70008]/10' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 space-y-6 pb-20">
                <LeftPanel 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  closeMenu={() => setIsMobileMenuOpen(false)} 
                  isMobile={true}
                  isDarkMode={isDarkMode}
                  toggleTheme={toggleTheme}
                />
              </div>
            </div>
          </div>
        )}

      {/* LEFT PANEL (Desktop) */}
      <div className={`w-[240px] border-r hidden md:block flex-shrink-0 ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
         <div className="p-6 h-full overflow-y-auto">
            <LeftPanel 
               activeTab={activeTab} 
               setActiveTab={setActiveTab}
               isDarkMode={isDarkMode}
               toggleTheme={toggleTheme}
            />
         </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative pt-[65px] md:pt-[71px]">
        
        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto pb-24 md:pb-0">
          <div className="max-w-2xl mx-auto p-4 md:p-8">
            
            {/* HEADER */}
            <div className="mb-6 md:mb-8">
              <button 
                onClick={() => router.back()} 
                className={`flex items-center gap-2 hover:text-[#E50914] transition-colors mb-4 md:hidden ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-bold">Back</span>
              </button>
              <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Post Job Opportunity</h1>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Find the best talent for your team</p>
            </div>

            {/* FORM */}
            <form className={`rounded-2xl md:rounded-[24px] p-5 md:p-8 shadow-sm space-y-6 ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
              
              {/* Job Title */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Senior Frontend Developer" 
                  className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Magna Coders" 
                  className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Description</label>
                <textarea 
                  rows={6} 
                  placeholder="Describe the role, responsibilities, and requirements..." 
                  className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium resize-none ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
                />
              </div>

              {/* Two Column Layout for Location and Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Nairobi, Kenya (Remote)" 
                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
                  />
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Type</label>
                  <div className="relative">
                    <select className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium appearance-none cursor-pointer ${isDarkMode ? 'bg-[#222] border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}>
                      <option value="">Select Type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Salary Range</label>
                <input 
                  type="text" 
                  placeholder="e.g. Ksh 150,000 – 250,000" 
                  className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
                />
              </div>

              {/* Skills/Tags */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Skills Required (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. React, TypeScript, Tailwind CSS, Next.js" 
                  className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
                />
              </div>

              {/* Attach Photo */}
              <div className="space-y-2">
                <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Attach Image / Logo</label>
                <div className={`w-full px-4 py-8 rounded-xl border border-dashed transition-colors flex flex-col items-center justify-center cursor-pointer group ${isDarkMode ? 'bg-[#222] border-gray-700 hover:border-[#E50914]' : 'bg-gray-50 border-gray-300 hover:border-[#E50914]'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-[#333]' : 'bg-white'}`}>
                    <Upload size={20} className="text-gray-400 group-hover:text-[#E50914]" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-[#E50914]">Click to upload image</span>
                  <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max. 2MB)</span>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col-reverse md:flex-row gap-4">
                 <button 
                  type="button"
                  onClick={() => router.back()} 
                  className={`flex-1 py-3.5 border rounded-xl font-bold text-sm transition-colors text-center ${isDarkMode ? 'bg-[#222] border-gray-700 text-gray-300 hover:bg-[#333]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3.5 bg-[#E50914] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#cc0812] transition-all active:scale-95">
                  Post Opportunity
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}