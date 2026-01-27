'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  Plus, 
  Search, 
  BookOpen, 
  Globe, 
  MoreHorizontal,
  MapPin,
  DollarSign,
  FolderKanban,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Heart,
  Share2,
  Bell,
  Menu,
  ChevronRight,
  X,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { generateMockPosts, FeedPost, JobPost, ProjectPost, TechNewsPost, RegularPost } from '@/utils/mockData';
import { NavItem } from '@/components/NavItem';
import LeftPanel from '@/components/LeftPanel';

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  // Infinite Scroll State
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initial Load
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        const initialPosts = generateMockPosts(1, 5);
        setPosts(initialPosts);
        setLoading(false);
    }, 1000);
  }, []);

  // Load More
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        const newPosts = generateMockPosts(page + 1, 5);
        setPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
        setLoading(false);
        if (page > 10) setHasMore(false); // Limit for demo
    }, 1500);
  }, [loading, hasMore, page]);

  // Observer
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMorePosts]);

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Projects') return post.type === 'project';
    if (activeFilter === 'Opportunities') return post.type === 'job';
    if (activeFilter === 'Posts') return post.type === 'post';
    if (activeFilter === 'Tech News') return post.type === 'tech-news';
    return true;
  });

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
            <Link href="/feed">
              <div className={`relative w-full flex items-center justify-center lg:justify-between px-2 lg:px-4 py-3 rounded-full transition-all text-sm font-medium cursor-pointer ${activeTab === 'Dashboard' ? 'bg-[#E50914] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={20} />
                  <span className="hidden lg:block">Dashboard</span>
                </div>
              </div>
            </Link>
            <Link href="/builders">
              <div className={`relative w-full flex items-center justify-center lg:justify-between px-2 lg:px-4 py-3 rounded-full transition-all text-sm font-medium cursor-pointer ${activeTab === 'Members' ? 'bg-[#E50914] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                <div className="flex items-center gap-3">
                  <Users size={20} />
                  <span className="hidden lg:block">Members</span>
                </div>
              </div>
            </Link>
            <div className={`relative w-full flex items-center justify-center lg:justify-between px-2 lg:px-4 py-3 rounded-full transition-all text-sm font-medium cursor-pointer ${activeTab === 'Projects' ? 'bg-[#E50914] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('Projects')}>
                <div className="flex items-center gap-3">
                  <FolderKanban size={20} />
                  <span className="hidden lg:block">Projects</span>
                </div>
                <span className="hidden lg:flex w-5 h-5 bg-[#F4A261] text-white text-[10px] font-bold rounded-full items-center justify-center">3</span>
            </div>
            <Link href="/messages">
              <div className={`relative w-full flex items-center justify-center lg:justify-between px-2 lg:px-4 py-3 rounded-full transition-all text-sm font-medium cursor-pointer ${activeTab === 'Messages' ? 'bg-[#E50914] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} />
                  <span className="hidden lg:block">Messages</span>
                </div>
                <span className="hidden lg:flex w-5 h-5 bg-[#E50914] text-white text-[10px] font-bold rounded-full items-center justify-center">12</span>
              </div>
            </Link>
            <div className={`relative w-full flex items-center justify-center lg:justify-between px-2 lg:px-4 py-3 rounded-full transition-all text-sm font-medium cursor-pointer ${activeTab === 'Opportunities' ? 'bg-[#E50914] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('Opportunities')}>
                <div className="flex items-center gap-3">
                  <Briefcase size={20} />
                  <span className="hidden lg:block">Opportunities</span>
                </div>
            </div>
          </nav>

          {/* Quick Actions */}
          <div className="mt-6 hidden lg:block">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 px-2">Quick Actions</h4>
            <div className="space-y-3">
              <Link href="/create-post" className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E50914] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Plus size={18} />
                Create Post
              </Link>
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
              <Link href="/magna-school" className="block w-full py-2 rounded-lg bg-white text-[#2ECC71] text-xs font-bold shadow-sm hover:shadow-md transition-all text-center">
                Start Learning
              </Link>
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
              <Link href="/get-verification" className="block w-full py-2 rounded-lg bg-[#E50914] text-white text-xs font-bold shadow-sm hover:bg-[#cc0812] transition-all text-center">
                Apply for Verification
              </Link>
            </div>
          </div>

          <nav className="space-y-1">
            <Link href="/settings" className="w-full block">
              <NavItem icon={<Settings size={20} />} label="Settings" />
            </Link>
          </nav>
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
            <Link href="/magna-school" className="w-10 h-10 rounded-xl bg-[#2ECC71]/10 text-[#2ECC71] hover:shadow-sm transition-all flex items-center justify-center">
              <GraduationCap size={20} />
            </Link>

            {/* Tablet Verification Icon */}
            <Link href="/get-verification" className="w-10 h-10 rounded-xl bg-[#E50914]/10 text-[#E50914] hover:shadow-sm transition-all flex items-center justify-center">
              <BadgeCheck size={20} />
            </Link>
        </div>

        {/* Bottom Sidebar - Removed as Settings moved to nav */}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 w-full md:ml-[88px] lg:ml-[260px] p-4 pt-24 md:p-8 md:pt-24 max-w-5xl mx-auto transition-all duration-300 pb-24 md:pb-8 relative">
        
        {/* TOP NAVIGATION BAR */}
        <div className="fixed top-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300 left-0 md:left-[88px] lg:left-[260px]">
          <div>
            <h1 className="text-xl font-bold text-black hidden md:block">Feed</h1>
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2 md:hidden">
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
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-gray-50 border border-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E50914] w-64 transition-all"
              />
            </div>

            {/* Notification Icon */}
            <Link href="/notifications" className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
              <Bell size={24} />
              <div className="absolute top-1 right-1 w-5 h-5 bg-[#E50914] rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm">
                3
              </div>
            </Link>
            
            {/* Mobile Menu Icon */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
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



        {/* Filter Pills */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <FilterPill label="All" active={activeFilter === 'All'} onClick={() => setActiveFilter('All')} />
          <FilterPill label="Projects" active={activeFilter === 'Projects'} onClick={() => setActiveFilter('Projects')} />
          <FilterPill label="Opportunities" active={activeFilter === 'Opportunities'} onClick={() => setActiveFilter('Opportunities')} />
          <FilterPill label="Posts" active={activeFilter === 'Posts'} onClick={() => setActiveFilter('Posts')} />
          <FilterPill label="Tech News" active={activeFilter === 'Tech News'} onClick={() => setActiveFilter('Tech News')} />
        </div>

        {filteredPosts.map((post, index) => {
          if (filteredPosts.length === index + 1) {
             return (
               <div ref={lastPostElementRef} key={post.id}>
                 <FeedItem post={post} />
               </div>
             );
          } else {
             return (
               <div key={post.id}>
                 <FeedItem post={post} />
               </div>
             );
          }
        })}
        
        {loading && (
          <div className="py-8 text-center flex flex-col items-center justify-center text-gray-400">
             <div className="w-8 h-8 border-4 border-gray-200 border-t-[#E50914] rounded-full animate-spin mb-2"></div>
             <span className="text-sm font-medium">Loading more updates...</span>
          </div>
        )}
        
        {!hasMore && filteredPosts.length > 0 && (
           <div className="py-8 text-center text-gray-400 text-sm font-medium">
              You&apos;re all caught up!
           </div>
        )}

      </main>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-40 flex flex-col items-end gap-4">
        {/* FAB Menu Options */}
         <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${isFabOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
            {/* Project Option */}
            <Link href="/create-project" className="flex items-center gap-3 group">
               <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Create Project</span>
               <div className="w-12 h-12 rounded-full bg-white text-[#F4A261] shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all">
                 <FolderKanban size={24} />
               </div>
            </Link>
            
            {/* Job Option */}
            <Link href="/create-job" className="flex items-center gap-3 group">
               <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Post Job</span>
               <div className="w-12 h-12 rounded-full bg-white text-[#2ECC71] shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all">
                 <Briefcase size={24} />
               </div>
            </Link>
 
            {/* Post Option */}
            <Link href="/create-post" className="flex items-center gap-3 group">
               <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Create Post</span>
               <div className="w-12 h-12 rounded-full bg-white text-[#E50914] shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all">
                 <FileText size={24} /> 
               </div>
            </Link>
         </div>

        {/* Main FAB */}
        <button 
          onClick={() => setIsFabOpen(!isFabOpen)}
          className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 hover:shadow-2xl ${isFabOpen ? 'bg-gray-800 rotate-45' : 'bg-[#E50914] hover:bg-[#cc0812]'}`}
        >
          <Plus size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 flex justify-between items-center pb-5 pt-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link href="/feed" className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'Dashboard' ? 'text-[#E50914]' : 'text-gray-400 hover:text-[#E50914]'}`}>
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-medium">Feed</span>
        </Link>

        <Link href="/builders" className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'Find Builders' ? 'text-[#E50914]' : 'text-gray-400 hover:text-[#E50914]'}`}>
          <Search size={24} />
          <span className="text-[10px] font-medium">Builders</span>
        </Link>

        <Link href="/messages" className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'Messages' ? 'text-[#E50914]' : 'text-gray-400 hover:text-[#E50914]'}`}>
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
  );
}

// Subcomponents

function FeedItem({ post }: { post: FeedPost }) {
  // Job Post
  if (post.type === 'job') {
    const job = post as JobPost;
    return (
        <Link href={`/post/${post.id}`} className="block bg-white rounded-2xl p-4 md:p-6 shadow-sm mt-6 cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-black">{post.author.name}</h3>
                  <span className="text-sm text-gray-500">{post.author.role}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                  <span>{post.createdAt}</span>
                  <span>•</span>
                  <Globe size={12} />
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-black">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="mb-4">
            <p className="font-bold text-black mb-1">{job.company} is hiring! {job.title}</p>
            <p className="text-gray-600">{job.description}</p>
          </div>

          <div className="border border-[#2ECC71]/30 rounded-xl p-3 md:p-5 bg-[#2ECC71]/5">
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#F4A261] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Briefcase size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-black leading-tight">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-gray-400" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={16} className="text-gray-400" />
                {job.jobType}
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign size={16} className="text-gray-400" />
                {job.salary}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {job.tags.map((tag) => (
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
        </Link>
    );
  }

  // Project Post
  if (post.type === 'project') {
    const project = post as ProjectPost;
    return (
        <Link href={`/post/${post.id}`} className="block bg-white rounded-2xl p-4 md:p-6 shadow-sm mt-6 cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                 <Image src="/api/placeholder/40/40" alt="User" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-black">{post.author.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{post.createdAt}</span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
              Project
            </span>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-lg text-black mb-2">{project.title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-[#F4A261] text-white text-xs font-bold">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100 gap-4 sm:gap-0">
            <div className="flex items-center justify-between sm:justify-start gap-6 w-full sm:w-auto">
              <button className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors group">
                <Heart size={20} className="group-hover:fill-[#E50914]" />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors">
                <MessageSquare size={20} />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors">
                <Share2 size={20} />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
            
            <button className="w-full sm:w-auto px-6 py-2 rounded-full bg-[#E50914] text-white text-sm font-bold shadow-md hover:bg-[#cc0812] transition-all">
              Join Project
            </button>
          </div>
        </Link>
    );
  }

  // Tech News Post
  if (post.type === 'tech-news') {
    const news = post as TechNewsPost;
    return (
      <Link href={`/post/${post.id}`} className="block bg-white rounded-2xl p-4 md:p-6 shadow-sm mt-6 border border-gray-100 cursor-pointer hover:shadow-md transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center gap-1">
              <Globe size={12} />
              {news.source}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{post.createdAt}</span>
          </div>
          <button className="text-gray-400 hover:text-black">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-xl text-black mb-2 leading-tight hover:text-[#E50914] cursor-pointer transition-colors">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {news.summary}
          </p>
          
          {news.imageUrl && (
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden bg-gray-100 mb-4 relative group cursor-pointer">
              <Image 
                src={news.imageUrl} 
                alt={news.title} 
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors group">
              <Heart size={20} className="group-hover:fill-[#E50914]" />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors">
              <Share2 size={20} />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
          
          <button className="flex items-center gap-2 text-[#E50914] font-bold text-sm hover:underline">
            Read Article
            <ChevronRight size={16} />
          </button>
        </div>
      </Link>
    );
  }

  // Regular Post
  const regular = post as RegularPost;
  return (
        <Link href={`/post/${post.id}`} className="block bg-white rounded-2xl p-4 md:p-6 shadow-sm mt-6 cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                 <Image src="/api/placeholder/40/40" alt="User" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-black">{post.author.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{post.createdAt}</span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">
              Post
            </span>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-lg text-black mb-2">{regular.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {regular.content}
            </p>
            
            {regular.image && (
                <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 mb-2 border border-gray-100 relative">
                   <Image src={regular.image} alt="Post Content" fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors group">
                <Heart size={20} className="group-hover:fill-[#E50914]" />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors">
                <MessageSquare size={20} />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors">
                <Share2 size={20} />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </Link>
  );
}

function NavItem({ icon, label, badge, active, onClick, isMobile }: { icon: React.ReactNode; label: string; badge?: string; active?: boolean; onClick?: () => void; isMobile?: boolean }) {
  return (
    <div 
      onClick={onClick}
      className={`relative w-full flex items-center ${isMobile ? 'justify-start px-4' : 'justify-center lg:justify-between px-2 lg:px-4'} py-3 rounded-full transition-all text-sm font-medium cursor-pointer ${
        active 
          ? 'bg-[#E50914] text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <div className={`flex items-center ${isMobile ? 'gap-3' : 'gap-0 lg:gap-3'}`}>
        {icon}
        <span className={isMobile ? 'block' : 'hidden lg:block'}>{label}</span>
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

function FilterPill({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
      active
        ? 'bg-[#E50914] text-white shadow-md'
        : 'bg-white text-black hover:bg-gray-50'
    }`}
    >
      {label}
    </button>
  );
}
