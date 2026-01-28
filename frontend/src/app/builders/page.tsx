"use client";

import React, { useState } from 'react';
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
  const itemsPerPage = 6; // Grid 3x2 or List
  
  const totalPages = Math.ceil(MOCK_BUILDERS.length / itemsPerPage);
  const currentBuilders = MOCK_BUILDERS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans text-[#444444] flex overflow-hidden">
      
      {/* DESKTOP SIDEBAR (Reused structure) */}
      <div className="w-[80px] bg-white border-r border-gray-100 flex-col items-center py-6 gap-8 z-20 hidden md:flex">
        <Link href="/feed" className="w-10 h-10 rounded-lg bg-[#E50914] flex items-center justify-center text-white mb-4 shadow-md hover:bg-[#cc0812] transition-colors">
           <span className="font-bold text-xl">M</span>
        </Link>

        <div className="flex flex-col gap-6 w-full items-center">
          <Link href="/feed" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <LayoutGrid size={24} />
            <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Feed</span>
          </Link>
          
          <Link href="/builders" className="p-3 rounded-xl text-[#E50914] bg-red-50 relative group">
            <Users size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Builders</span>
          </Link>

          <Link href="/messages" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <MessageSquare size={24} />
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
      <div className="flex-1 flex flex-col h-screen overflow-y-auto pt-24 relative">
        
        {/* TOP NAVIGATION BAR (Reused) */}
        <TopNavigation 
          title="Builders" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          className="md:left-[80px] lg:left-[80px]"
          searchPlaceholder="Search by name, category, role, location..."
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
                <LeftPanel 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  closeMenu={() => setIsMobileMenuOpen(false)} 
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* BUILDERS GRID / LIST */}
        <div className="px-4 md:px-10 py-8 pb-24 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBuilders.map((builder) => (
              <Link href={`/user-profile?id=${builder.id}`} key={builder.id} className="bg-white rounded-2xl p-6 border border-black hover:shadow-md transition-all flex flex-col gap-4">
                {/* Header: Avatar & Info */}
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 text-gray-500 font-bold text-xl relative">
                    {/* Placeholder Avatar */}
                    {builder.avatar ? (
                      <Image src={builder.avatar} alt={builder.name} fill sizes="56px" className="object-cover" />
                    ) : (
                      builder.name.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-black truncate">{builder.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{builder.email}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{builder.bio}</p>
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
                    <span className="px-3 py-1 rounded-full text-[10px] font-medium border bg-gray-100 text-gray-600 border-gray-200">
                      +{builder.roles.length - 2}
                    </span>
                  )}
                </div>

                {/* Looking For */}
                <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between gap-2">
                     <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                       <span className="text-sm">👀</span>
                       <span>Looking for:</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <button className={`p-1.5 rounded-full transition-all ${builder.connected ? 'bg-[#F4A261]/10 text-[#F4A261]' : 'bg-black text-white hover:bg-gray-800'}`}>
                          {builder.connected ? <UserCheck size={16} /> : <UserPlus size={16} />}
                        </button>
                        <button className="p-1.5 rounded-full bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all">
                          <MessageSquare size={16} />
                        </button>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {builder.lookingFor.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white border border-gray-200 text-gray-600 rounded-md text-[10px] font-medium">
                        {item}
                      </span>
                    ))}
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
                      <Github size={16} className="text-black cursor-pointer transition-colors" />
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
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-400 disabled:opacity-50 hover:text-[#E50914] hover:border-[#E50914] transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-500">
              Page <span className="text-[#E50914] font-bold">{currentPage}</span> of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-400 disabled:opacity-50 hover:text-[#E50914] hover:border-[#E50914] transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 flex justify-between items-center pb-5 pt-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link href="/feed" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
          <LayoutGrid size={24} />
          <span className="text-[10px] font-medium">Feed</span>
        </Link>
        <Link href="/builders" className="flex flex-col items-center gap-1 text-[#E50914] transition-colors">
          <Search size={24} />
          <span className="text-[10px] font-medium">Builders</span>
        </Link>
        <Link href="/messages" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
          <MessageSquare size={24} />
          <span className="text-[10px] font-medium">Chat</span>
        </Link>
        <Link href="/user-profile?from=nav" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-[10px]">
             JD
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>

    </div>
  );
}
