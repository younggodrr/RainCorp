"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, Users, MessageCircleQuestion, Settings, Search, MoreVertical, Filter, ChevronLeft, ChevronRight, Bell, Menu, X, FolderKanban, Briefcase, Plus, BookOpen, GraduationCap, BadgeCheck, LayoutDashboard, MessageSquare } from 'lucide-react';

// Mock Data
const MOCK_FRIENDS = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `Friend ${i + 1}`,
  role: ['Full Stack Developer', 'UI/UX Designer', 'Backend Engineer', 'DevOps Specialist'][i % 4],
  company: ['Tech Corp', 'Startup Inc', 'Freelance', 'Global Systems'][i % 4],
  status: i % 3 === 0 ? 'online' : 'offline',
  mutual: Math.floor(Math.random() * 20) + 1
}));

export default function FriendsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(MOCK_FRIENDS.length / itemsPerPage);
  const currentFriends = MOCK_FRIENDS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          
          <button className="p-3 rounded-xl text-[#E50914] bg-red-50 relative group">
            <Users size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Friends</span>
          </button>

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
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-md transition-all">
            JD
          </div>
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
           
           {/* Mobile Search Bar */}
           <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search friends..." 
                className="w-full bg-gray-50 border border-gray-100 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E50914] transition-all"
              />
           </div>

           <button 
              className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
           >
              <Menu size={24} />
           </button>
        </div>

        {/* MOBILE DRAWER (Left Sidebar Content) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Drawer Content */}
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

              {/* Drawer Scrollable Content */}
              <div className="p-4 space-y-6 pb-20">
                
                {/* User Profile Card */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm">
                      JD
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-black truncate">John Doe</h3>
                    <p className="text-xs text-gray-500 truncate">Full Stack Dev</p>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1">
                  <Link href="/feed" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <LayoutDashboard size={20} />
                      <span className="text-sm font-medium">Dashboard</span>
                    </div>
                  </Link>
                  <Link href="/friends" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50 text-[#E50914] font-medium transition-colors">
                      <Users size={20} />
                      <span className="text-sm">Members</span>
                    </div>
                  </Link>
                  <Link href="/projects" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
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
                  <Link href="/opportunities" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <Briefcase size={20} />
                      <span className="text-sm font-medium">Opportunities</span>
                    </div>
                  </Link>
                </nav>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 px-2">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E50914] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Plus size={18} />
                      Create Post
                    </button>
                    <button className="w-full py-2.5 px-4 rounded-full bg-white border border-gray-200 text-black text-sm font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                      <Search size={18} />
                      Find Collaborators
                    </button>
                    <button className="w-full py-2.5 px-4 rounded-full bg-white border border-gray-200 text-black text-sm font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                      <BookOpen size={18} />
                      Resources
                    </button>
                  </div>
                </div>

                {/* Groups */}
                <div>
                  <div className="flex items-center justify-between mb-3 px-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase">Your Groups</h4>
                    <button className="text-[#E50914] text-xs font-medium hover:underline">See All</button>
                  </div>
                  <div className="space-y-1">
                    {[
                      { name: 'React Developers', members: '12k members' },
                      { name: 'Startup Founders', members: '5k members' },
                      { name: 'UI/UX Designers', members: '8.5k members' }
                    ].map((group) => (
                      <button key={group.name} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                          <Users size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-medium text-black truncate">{group.name}</h5>
                          <p className="text-xs text-gray-500 truncate">{group.members}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Magna School */}
                <div>
                  <div className="bg-gradient-to-br from-[#2ECC71]/10 to-[#2ECC71]/20 rounded-xl p-4 border border-[#2ECC71]/20">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#2ECC71] flex items-center justify-center text-white shadow-sm">
                        <GraduationCap size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-black text-sm">Magna School</h4>
                        <p className="text-xs text-gray-600 leading-tight mt-0.5">Upskill with top tech courses</p>
                      </div>
                    </div>
                    <button className="w-full py-2 rounded-lg bg-white text-[#2ECC71] text-xs font-bold shadow-sm hover:shadow-md transition-all">
                      Start Learning
                    </button>
                  </div>
                </div>

                {/* Verification Badge */}
                <div>
                  <div className="bg-gradient-to-br from-[#E50914]/5 to-[#F4A261]/10 rounded-xl p-4 border border-[#E50914]/10">
                    <div className="flex items-center gap-3 mb-2">
                      <BadgeCheck size={20} className="text-[#E50914]" />
                      <h4 className="font-bold text-black text-sm">Get Verified</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      Boost your credibility and unlock exclusive features.
                    </p>
                    <button className="w-full py-2 rounded-lg bg-[#E50914] text-white text-xs font-bold shadow-sm hover:bg-[#cc0812] transition-all">
                      Apply for Verification
                    </button>
                  </div>
                </div>

                <nav className="space-y-1">
                  <Link href="/settings" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <Settings size={20} />
                      <span className="text-sm font-medium">Settings</span>
                    </div>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pt-20 md:pt-0 pb-20 md:pb-0">
            {/* Header - Hidden on Mobile */}
            <div className="hidden md:flex bg-white px-8 py-10 border-b border-gray-100 flex-row items-center justify-between gap-4 sticky top-0 z-10 shadow-none">
                <div>
                    <h1 className="text-3xl font-bold text-black mb-2">Connected Friends</h1>
                    <p className="text-gray-500">Stay connected with your coding community</p>
                </div>
                
                {/* Search / Filter Actions */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search friends..." 
                            className="w-64 bg-gray-50 border border-gray-100 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#E50914] transition-all"
                        />
                    </div>
                    <button className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
                {/* Grid/List - Responsive */}
                <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-6 mb-12">
                    {currentFriends.map(friend => (
                        <div key={friend.id} className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-row md:flex-col items-center text-left md:text-center group relative gap-4 md:gap-0">
                            {/* Status Dot */}
                            <div className={`absolute top-4 right-4 md:top-6 md:right-6 w-3 h-3 rounded-full border-2 border-white ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} title={friend.status}></div>
                            
                            {/* Avatar */}
                            <div className="w-14 h-14 md:w-24 md:h-24 flex-shrink-0 rounded-full bg-gray-50 md:mb-4 overflow-hidden relative border-4 border-gray-50 group-hover:border-[#E50914]/10 transition-colors">
                                 <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-lg md:text-2xl font-bold text-gray-400 group-hover:text-[#E50914] transition-colors">
                                    {friend.name.split(' ')[1][0]}
                                 </div>
                            </div>

                            <div className="flex-1 min-w-0 md:w-full">
                                <h3 className="font-bold text-base md:text-lg text-gray-900 mb-0.5 md:mb-1 truncate">{friend.name}</h3>
                                <p className="text-xs md:text-sm text-[#E50914] font-medium mb-0.5 md:mb-1 truncate">{friend.role}</p>
                                <p className="text-xs text-gray-400 mb-0 md:mb-6 truncate">{friend.company}</p>
                                
                                {/* Mobile Action Buttons */}
                                <div className="flex md:hidden gap-2 mt-2">
                                     <button className="flex-1 py-1.5 text-xs font-bold text-white bg-black rounded-lg">
                                        Message
                                     </button>
                                     <button className="flex-1 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 rounded-lg">
                                        Profile
                                     </button>
                                </div>
                            </div>
                            
                            {/* Desktop Action Buttons */}
                            <div className="w-full mt-auto space-y-2 hidden md:block">
                                 <button className="w-full py-2.5 text-sm font-bold text-white bg-black rounded-xl hover:bg-[#E50914] transition-colors shadow-sm">
                                    Message
                                 </button>
                                 <button className="w-full py-2.5 text-sm font-semibold text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    View Profile
                                 </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 pb-12">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-3 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all bg-white/50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex items-center gap-2 px-2 md:px-4 overflow-x-auto max-w-[200px] md:max-w-none no-scrollbar">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`min-w-[40px] h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                    currentPage === i + 1 
                                        ? 'bg-[#E50914] text-white shadow-lg shadow-red-200 scale-110' 
                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all bg-white/50"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>

        {/* MOBILE BOTTOM NAVIGATION */}
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
