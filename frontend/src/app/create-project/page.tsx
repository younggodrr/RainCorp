"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, Users, MessageCircleQuestion, Settings, 
  Menu, X, FolderKanban, ArrowLeft, Search, MessageSquare, 
  LayoutDashboard, Upload
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateProjectPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-[#FDF8F5] font-sans text-[#444444] flex overflow-hidden">
      
      {/* THIN SIDEBAR (Desktop) */}
      <div className="w-[80px] bg-white border-r border-gray-100 flex-col items-center py-6 gap-8 z-20 hidden md:flex">
        <Link href="/feed" className="w-10 h-10 rounded-lg bg-[#E50914] flex items-center justify-center text-white mb-4 shadow-md hover:bg-[#cc0812] transition-colors">
           <span className="font-bold text-xl">M</span>
        </Link>

        <div className="flex flex-col gap-6 w-full items-center">
          <Link href="/feed" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <LayoutGrid size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Feed</span>
          </Link>
          
          <Link href="/friends" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <Users size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Friends</span>
          </Link>

          <Link href="/messages" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <MessageCircleQuestion size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Messages</span>
          </Link>
        </div>

        <div className="mt-auto flex flex-col gap-6 w-full items-center">
          <Link href="/settings" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <Settings size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Settings</span>
          </Link>
          
          <Link href="/user-profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-md transition-all">
            JD
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* TOP NAVIGATION BAR (Mobile Only) */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-4 flex items-center justify-between shadow-sm gap-4">
           <Link href="/feed" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E50914]">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
           </Link>
           
           <div className="flex-1 text-center font-bold text-lg">Create Project</div>

           <button 
              className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
           >
              <Menu size={24} />
           </button>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            <div className="absolute top-0 left-0 w-full h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
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
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 space-y-6 pb-20">
                <nav className="space-y-1">
                  <Link href="/feed" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <LayoutDashboard size={20} />
                      <span className="text-sm font-medium">Dashboard</span>
                    </div>
                  </Link>
                  <Link href="/friends" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <Users size={20} />
                      <span className="text-sm font-medium">Members</span>
                    </div>
                  </Link>
                  <Link href="/my-projects" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg text-[#E50914] bg-[#E50914]/5 font-bold transition-colors">
                      <FolderKanban size={20} />
                      <span className="text-sm font-medium">Projects</span>
                    </div>
                  </Link>
                  <Link href="/messages" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <MessageSquare size={20} />
                      <span className="text-sm font-medium">Messages</span>
                    </div>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto pt-20 md:pt-0">
          <div className="max-w-2xl mx-auto p-4 md:p-8">
            
            {/* HEADER */}
            <div className="mb-8">
              <button 
                onClick={() => router.back()} 
                className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors mb-4 md:hidden"
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-bold">Back</span>
              </button>
              <h1 className="text-3xl font-bold text-black mb-2">Create New Project</h1>
              <p className="text-gray-500">Share your idea and find the perfect team</p>
            </div>

            {/* FORM */}
            <form className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm space-y-6">
              
              {/* Project Title */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Project Title</label>
                <input 
                  type="text" 
                  placeholder="Enter project title" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400"
                />
              </div>

              {/* Attach Photo */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Attach Image / Logo</label>
                <div className="w-full px-4 py-8 rounded-xl bg-gray-50 border border-dashed border-gray-300 hover:border-[#E50914] transition-colors flex flex-col items-center justify-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={20} className="text-gray-400 group-hover:text-[#E50914]" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-[#E50914]">Click to upload image</span>
                  <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max. 2MB)</span>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Description</label>
                <textarea 
                  rows={4} 
                  placeholder="Describe your project..." 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400 resize-none"
                />
              </div>

              {/* Two Column Layout for Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Category</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium appearance-none cursor-pointer">
                      <option value="">Select Category</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="ai">AI/ML</option>
                      <option value="game">Game Development</option>
                      <option value="blockchain">Blockchain</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Difficulty Level */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Difficulty Level</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium appearance-none cursor-pointer">
                      <option value="">Select Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Tech Stack (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="React, Node.js, MongoDB..." 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400"
                />
              </div>

              {/* Team Size Needed */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Team Size Needed</label>
                <input 
                  type="number" 
                  min="1"
                  placeholder="e.g. 3" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col-reverse md:flex-row gap-4">
                 <Link href="/my-projects" className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors text-center">
                  Cancel
                </Link>
                <button type="submit" className="flex-1 py-3.5 bg-[#E50914] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#cc0812] transition-all active:scale-95">
                  Create Project
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 flex justify-between items-center pb-5 pt-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Link href="/feed" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
            <LayoutDashboard size={24} />
            <span className="text-[10px] font-medium">Feed</span>
          </Link>
          <Link href="/builders" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
            <Search size={24} />
            <span className="text-[10px] font-medium">Builders</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
            <MessageSquare size={24} />
            <span className="text-[10px] font-medium">Chat</span>
          </Link>
          <Link href="/user-profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-[10px]">
               JD
            </div>
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}