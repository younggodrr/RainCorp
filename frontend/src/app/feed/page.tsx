"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  MessageSquare, 
  Briefcase, 
  Settings, 
  Plus, 
  Search, 
  BookOpen, 
  Image as ImageIcon, 
  Globe, 
  MoreHorizontal,
  MapPin,
  DollarSign,
  GraduationCap,
  BadgeCheck
} from 'lucide-react';
import Link from 'next/link';

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans text-[#444444] flex">
      {/* LEFT SIDEBAR - Fixed Width ~260px on Desktop, Icon-only on Tablet */}
      <aside className="w-[88px] lg:w-[260px] bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col z-20 hidden md:flex transition-all duration-300 overflow-y-auto pb-10">
        {/* Top Branding */}
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
            <div className="w-10 h-10 rounded-lg bg-black flex-shrink-0 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#E50914]">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight hidden lg:block">
              <span className="text-[#F4A261]">Magna</span>
              <span className="text-[#E50914]">Coders</span>
            </span>
          </Link>

          {/* User Profile Card */}
          <div className="flex items-center gap-3 p-0 lg:p-3 lg:bg-gray-50 rounded-xl mb-6 justify-center lg:justify-start">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0 hidden lg:block">
              <h3 className="text-sm font-bold text-black truncate">John Doe</h3>
              <p className="text-xs text-gray-500 truncate">Full Stack Dev</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
            <NavItem icon={<Users size={20} />} label="Members" active={activeTab === 'Members'} onClick={() => setActiveTab('Members')} />
            <NavItem icon={<FolderKanban size={20} />} label="Projects" badge="3" active={activeTab === 'Projects'} onClick={() => setActiveTab('Projects')} />
            <NavItem icon={<MessageSquare size={20} />} label="Messages" badge="12" active={activeTab === 'Messages'} onClick={() => setActiveTab('Messages')} />
            <NavItem icon={<Briefcase size={20} />} label="Opportunities" active={activeTab === 'Opportunities'} onClick={() => setActiveTab('Opportunities')} />
          </nav>

          {/* Groups */}
          <div className="mt-6 hidden lg:block">
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
          <div className="mt-6 hidden lg:block">
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
          <div className="mt-6 mb-6 hidden lg:block">
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
              <NavItem icon={<Settings size={20} />} label="Settings" />
            </Link>
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="px-6 mt-4 hidden lg:block">
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
        {/* Tablet Quick Actions (Icons only) */}
        <div className="px-2 mt-4 pb-8 flex flex-col items-center gap-4 lg:hidden">
            <button className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E50914] text-white flex items-center justify-center shadow-md">
              <Plus size={20} />
            </button>
            
            {/* Tablet Groups Icon */}
            <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 hover:text-[#E50914] hover:bg-white hover:shadow-sm transition-all flex items-center justify-center">
              <Users size={20} />
            </button>

            {/* Tablet School Icon */}
            <button className="w-10 h-10 rounded-xl bg-[#2ECC71]/10 text-[#2ECC71] hover:shadow-sm transition-all flex items-center justify-center">
              <GraduationCap size={20} />
            </button>

            {/* Tablet Verification Icon */}
            <button className="w-10 h-10 rounded-xl bg-[#E50914]/10 text-[#E50914] hover:shadow-sm transition-all flex items-center justify-center">
              <BadgeCheck size={20} />
            </button>
        </div>

        {/* Bottom Sidebar - Removed as Settings moved to nav */}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 w-full md:ml-[88px] lg:ml-[260px] p-4 pt-20 md:p-8 md:pt-8 max-w-5xl mx-auto transition-all duration-300 pb-24 md:pb-8">
        


        {/* Post Composer */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="What are you building today?" 
                className="w-full bg-[#FDF8F5] rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E50914]/20 transition-all"
              />
              <div className="flex gap-4 mt-4">
                <ActionButton icon={<ImageIcon size={18} />} label="Photo" />

                <ActionButton icon={<FolderKanban size={18} />} label="Project" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <FilterPill label="All" active />

          <FilterPill label="Projects" />
          <FilterPill label="Opportunities" />
          <FilterPill label="Designs" />
        </div>

        {/* Feed Card (Job Post Example) */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-black">John Doe</h3>
                  <span className="text-sm text-gray-500">CTO at Magna Coders</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                  <span>2 days ago</span>
                  <span>•</span>
                  <Globe size={12} />
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-black">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Post Body */}
          <div className="mb-4">
            <p className="font-bold text-black mb-1">Magna Coders is hiring! Senior Frontend Developer</p>
            <p className="text-gray-600">We are looking for an experienced Frontend Developer to join our team and build amazing user experiences.</p>
          </div>

          {/* Embedded Job Card */}
          <div className="border border-[#2ECC71]/30 rounded-xl p-3 md:p-5 bg-[#2ECC71]/5">
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#F4A261] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Briefcase size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-black leading-tight">Senior Frontend Developer</h4>
                <p className="text-sm text-gray-600">Magna Coders</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-gray-400" />
                Nairobi, Kenya (Remote)
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={16} className="text-gray-400" />
                Full-time
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign size={16} className="text-gray-400" />
                Ksh 150,000 – 250,000
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {['React', 'TypeScript', 'Tailwind CSS', 'Next.js'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white text-xs font-medium text-gray-600 border border-gray-100">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2 md:gap-3">
              <button className="flex-1 py-2 md:py-2.5 rounded-full bg-white border border-gray-200 text-xs md:text-sm font-semibold text-black hover:bg-gray-50 transition-all">
                View Details
              </button>
              <button className="flex-1 py-2 md:py-2.5 rounded-full bg-[#E50914] text-white text-xs md:text-sm font-semibold shadow-md hover:bg-[#cc0812] transition-all">
                Apply Now
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 flex justify-between items-center pb-5 pt-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveTab('Dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'Dashboard' ? 'text-[#E50914]' : 'text-gray-400 hover:text-[#E50914]'}`}
        >
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-medium">Feed</span>
        </button>

        <button 
          onClick={() => setActiveTab('Find Builders')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'Find Builders' ? 'text-[#E50914]' : 'text-gray-400 hover:text-[#E50914]'}`}
        >
          <Search size={24} />
          <span className="text-[10px] font-medium">Builders</span>
        </button>

        <button 
          onClick={() => setActiveTab('Messages')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'Messages' ? 'text-[#E50914]' : 'text-gray-400 hover:text-[#E50914]'}`}
        >
          <MessageSquare size={24} />
          <span className="text-[10px] font-medium">Chat</span>
        </button>

        <Link href="/settings" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
          <Settings size={24} />
          <span className="text-[10px] font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
}

// Subcomponents

function NavItem({ icon, label, badge, active, onClick }: { icon: React.ReactNode; label: string; badge?: string; active?: boolean; onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`relative w-full flex items-center justify-center lg:justify-between px-2 lg:px-4 py-3 rounded-full transition-all text-sm font-medium cursor-pointer ${
        active 
          ? 'bg-[#E50914] text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-0 lg:gap-3">
        {icon}
        <span className="hidden lg:block">{label}</span>
      </div>
      {badge && (
        <span className={`hidden lg:block px-2 py-0.5 rounded-full text-xs font-bold ${
          active ? 'bg-white text-[#E50914]' : 'bg-[#F4A261] text-white'
        }`}>
          {badge}
        </span>
      )}
      {/* Dot indicator for tablet mode if badge exists */}
      {badge && (
        <span className={`lg:hidden absolute top-2 right-2 w-2 h-2 rounded-full ${
          active ? 'bg-white' : 'bg-[#E50914]'
        }`}></span>
      )}
    </div>
  );
}



function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors text-sm font-medium">
      {icon}
      <span>{label}</span>
    </button>
  );
}

function FilterPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <button className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
      active
        ? 'bg-[#E50914] text-white shadow-md'
        : 'bg-white text-black hover:bg-gray-50'
    }`}>
      {label}
    </button>
  );
}
