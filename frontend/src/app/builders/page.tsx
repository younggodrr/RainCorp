"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutGrid, Users, MessageSquare, Settings, Search, 
  MapPin, Github, Linkedin, MessageCircle, Globe,
  ChevronLeft, ChevronRight, UserPlus, UserCheck, X
} from 'lucide-react';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';

const LOOKING_FOR_OPTIONS = [
  'Team Member',
  'Accountability Partner',
  'Mentor',
  'Networking & Opportunities',
  'Investment Prospect',
  'Technical Co-founder',
  'Design Assistance',
  'UI/UX and product design'
];

// Mock Data for Builders
const MOCK_BUILDERS = Array.from({ length: 50 }).map((_, i) => {
  // Randomly select 1-3 looking for options
  const numLookingFor = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...LOOKING_FOR_OPTIONS].sort(() => 0.5 - Math.random());
  const lookingFor = shuffled.slice(0, numLookingFor);

  return {
    id: i + 1,
    name: i % 2 === 0 ? 'Ashwa' : 'abdijabar',
    email: i % 2 === 0 ? 'ashwaashard@gmail.com' : 'abdijabarmadeyteno@gmail.com',
    bio: i % 2 === 0 
      ? 'Ux Ui designer| Author | Deep Thinker | Content Creator | Artist 🎨 💻 📽️' 
      : 'Great mind with ambitions, flowing with destiny with submission.',
    roles: i % 2 === 0 
      ? ['UX Designer', 'Designer'] 
      : ['AI/ML Engineer', 'Backend Developer', 'Developer', 'Research/Analyst'],
    lookingFor,
    location: i % 2 === 0 ? 'Nairobi' : 'Mandera, Kenya (Home Address)',
    status: 'available',
    connected: i % 3 === 0,
    avatar: null // Will use initials or placeholder
  };
});

export default function BuildersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Members');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
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

  const itemsPerPage = 6; // Grid 3x2 or List
  
  const totalPages = Math.ceil(MOCK_BUILDERS.length / itemsPerPage);
  const currentBuilders = MOCK_BUILDERS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`min-h-screen font-sans flex overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      
      {/* LEFT SIDEBAR */}
      <LeftPanel 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col h-screen overflow-y-auto pt-24 relative md:ml-[88px] ${isSidebarExpanded ? 'lg:ml-[260px]' : 'lg:ml-[88px]'} transition-all duration-300`}>
        
        {/* TOP NAVIGATION BAR (Reused) */}
        <TopNavigation 
          title="Builders" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          className={`md:left-[88px] ${isSidebarExpanded ? 'lg:left-[260px]' : 'lg:left-[88px]'}`}
          searchPlaceholder="Search by name, category, role, location..."
          isDarkMode={isDarkMode}
        />

        {/* MOBILE DRAWER (Left Sidebar Content) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Drawer Content */}
            <div className={`absolute top-0 left-0 w-full h-full shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
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
                  className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#222] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
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

        {/* BUILDERS GRID / LIST */}
        <div className="px-4 md:px-10 py-8 pb-24 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBuilders.map((builder) => (
              <Link href={`/user-profile?id=${builder.id}`} key={builder.id} className={`rounded-2xl p-6 border transition-all flex flex-col gap-4 hover:shadow-md ${isDarkMode ? 'bg-[#111] border-[#E70008]/20 shadow-[0_0_15px_rgba(231,0,8,0.1)]' : 'bg-white border-black'}`}>
                {/* Header: Avatar & Info */}
                <div className="flex gap-4 items-start">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 font-bold text-xl relative ${isDarkMode ? 'bg-[#222] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                    {/* Placeholder Avatar */}
                    {builder.avatar ? (
                      <Image src={builder.avatar} alt={builder.name} fill sizes="56px" className="object-cover" />
                    ) : (
                      builder.name.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>{builder.name}</h3>
                    </div>
                    <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{builder.email}</p>
                    <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{builder.bio}</p>
                  </div>
                  
                  {/* Status & Actions Column */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-1">
                    <span className="px-2 py-0.5 bg-[#2ECC71]/10 text-[#2ECC71] rounded-full text-[10px] font-medium whitespace-nowrap">
                      {builder.status}
                    </span>
                  </div>
                </div>

                {/* Roles */}
                <div className="flex flex-wrap gap-2">
                  {builder.roles.slice(0, 2).map((role, idx) => (
                    <span key={idx} className={`px-3 py-1 rounded-full text-[10px] font-medium border ${idx === 0 ? 'bg-[#F4A261]/10 text-[#F4A261] border-[#F4A261]/20' : 'bg-[#E50914]/10 text-[#E50914] border-[#E50914]/20'}`}>
                      {role}
                    </span>
                  ))}
                  {builder.roles.length > 2 && (
                    <span className={`px-3 py-1 rounded-full text-[10px] font-medium border ${isDarkMode ? 'bg-[#222] text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                      +{builder.roles.length - 2}
                    </span>
                  )}
                </div>

                {/* Looking For */}
                <div className={`flex gap-3 p-3 rounded-xl ${isDarkMode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                  {/* Action Icons */}
                  <div className={`flex flex-col justify-center gap-2 border-r pr-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-[#333] text-gray-400 hover:text-white' : 'hover:bg-white text-gray-500 hover:text-[#E50914]'}`}
                    >
                      <UserPlus size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-[#333] text-gray-400 hover:text-white' : 'hover:bg-white text-gray-500 hover:text-[#E50914]'}`}
                    >
                      <MessageSquare size={16} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center justify-between gap-2">
                       <div className={`flex items-center gap-2 text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                         <span className="text-sm">👀</span>
                         <span>Looking for:</span>
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {builder.lookingFor.map((item, idx) => (
                        <span key={idx} className={`px-2 py-0.5 border rounded-md text-[10px] font-medium ${isDarkMode ? 'bg-[#E50914] border-[#E50914] text-black' : 'bg-[#E50914] border-[#E50914] text-black'}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mt-auto">
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                     <MapPin size={14} className="text-[#E50914]" />
                     <span className="truncate">{builder.location}</span>
                   </div>
                   <div className="flex items-center gap-3 text-gray-400">
                      <Globe size={16} className="text-[#F4A261] cursor-pointer transition-colors" />
                      <Github size={16} className={`${isDarkMode ? 'text-white' : 'text-black'} cursor-pointer transition-colors`} />
                      <Linkedin size={16} className="text-[#0077b5] cursor-pointer transition-colors" />
                      <MessageCircle size={16} className="text-[#25D366] cursor-pointer transition-colors" />
                   </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination (Mobile & Desktop) */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border disabled:opacity-50 hover:text-[#E50914] hover:border-[#E50914] transition-all shadow-sm ${isDarkMode ? 'bg-[#111] border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-400'}`}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-500">
              Page <span className="text-[#E50914] font-bold">{currentPage}</span> of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border disabled:opacity-50 hover:text-[#E50914] hover:border-[#E50914] transition-all shadow-sm ${isDarkMode ? 'bg-[#111] border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-400'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
