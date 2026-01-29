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
  ChevronLeft,
  X,
  FileText,
  Bot,
  Send
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MagnaNewIcon from '@/components/MagnaNewIcon';
import { generateMockPosts, FeedPost, JobPost, ProjectPost, TechNewsPost, RegularPost, generateMockComments } from '@/utils/mockData';
import { NavItem } from '@/components/NavItem';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';
import PostInteractionBar from '@/components/PostInteractionBar';
import Toast from '@/components/Toast';

export default function FeedPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
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

  // Toast State
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

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
    <div className={`min-h-screen font-sans flex transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      <Toast 
        message={toastMessage} 
        isVisible={toastVisible} 
        onClose={() => setToastVisible(false)} 
      />

      {/* LEFT SIDEBAR */}
      <LeftPanel 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 min-w-0 w-full md:ml-[88px] ${isSidebarExpanded ? 'lg:ml-[260px]' : 'lg:ml-[88px]'} p-4 pt-24 md:p-8 md:pt-24 max-w-5xl mx-auto transition-all duration-300 pb-24 md:pb-8 relative`}>
        
        {/* TOP NAVIGATION BAR */}
        <TopNavigation 
          title="Feed" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          className={`md:left-[88px] ${isSidebarExpanded ? 'lg:left-[260px]' : 'lg:left-[88px]'}`}
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



        {/* Filter Pills */}
        <div className="flex gap-3 mb-2 overflow-x-auto pb-2 scrollbar-hide">
          <FilterPill label="All" active={activeFilter === 'All'} onClick={() => setActiveFilter('All')} isDarkMode={isDarkMode} />
          <FilterPill label="Projects" active={activeFilter === 'Projects'} onClick={() => setActiveFilter('Projects')} isDarkMode={isDarkMode} />
          <FilterPill label="Opportunities" active={activeFilter === 'Opportunities'} onClick={() => setActiveFilter('Opportunities')} isDarkMode={isDarkMode} />
          <FilterPill label="Posts" active={activeFilter === 'Posts'} onClick={() => setActiveFilter('Posts')} isDarkMode={isDarkMode} />
          <FilterPill label="Tech News" active={activeFilter === 'Tech News'} onClick={() => setActiveFilter('Tech News')} isDarkMode={isDarkMode} />
        </div>

        {filteredPosts.map((post, index) => {
          if (filteredPosts.length === index + 1) {
             return (
               <div ref={lastPostElementRef} key={post.id}>
                 <FeedItem post={post} onRequestJoin={(authorName) => showToast(post.type === 'job' ? `Application sent to ${authorName}!` : `Request sent. ${authorName} will review your request.`)} isDarkMode={isDarkMode} />
               </div>
             );
          } else {
             return (
               <div key={post.id}>
                 <FeedItem post={post} onRequestJoin={(authorName) => showToast(post.type === 'job' ? `Application sent to ${authorName}!` : `Request sent. ${authorName} will review your request.`)} isDarkMode={isDarkMode} />
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

        {/* Main FAB Container */}
        <div className="relative">
          {/* Main FAB */}
          <button 
            onClick={() => setIsFabOpen(!isFabOpen)}
            className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 hover:shadow-2xl ${isFabOpen ? 'bg-gray-800 rotate-45' : 'bg-[#E50914] hover:bg-[#cc0812]'}`}
          >
            <Plus size={28} strokeWidth={2.5} />
          </button>
          
          {/* Tiny Magna Icon Overlay */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50">
             <Link href="/magna-ai">
               <button className="w-8 h-8 rounded-lg bg-white text-[#E50914] shadow-md flex items-center justify-center border border-gray-100">
                  <MagnaNewIcon className="w-5 h-5" />
               </button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedItem({ post, onRequestJoin, isDarkMode }: { post: FeedPost, onRequestJoin?: (authorName: string) => void, isDarkMode?: boolean }) {
  const router = useRouter();
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // Move hooks to top level to avoid conditional hook calls
  const jobPost = post.type === 'job' ? post as JobPost : null;
  const projectPost = post.type === 'project' ? post as ProjectPost : null;
  
  // Job progress bar state
  const [progress, setProgress] = useState(jobPost?.deadlineProgress || 0);
  
  // Project live requests state
  const [liveRequests, setLiveRequests] = useState(projectPost?.requestsSent || 0);

  // Job progress effect
  useEffect(() => {
    if (jobPost && progress < 100) {
      const interval = setInterval(() => {
        if (Math.random() > 0.5) {
          setProgress(prev => Math.min(prev + 0.5, 100));
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [jobPost, progress]);

  // Project live requests effect
  useEffect(() => {
    if (projectPost) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setLiveRequests(prev => prev + 1);
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [projectPost]);

  const handleRequestJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRequestSent(true);
    onRequestJoin?.(post.author.name);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsApplied(true);
    // Add a small delay to ensure the toast shows after state update
    setTimeout(() => {
      onRequestJoin?.(post.author.name);
    }, 100);
  };

  const cardClassName = `block rounded-2xl p-4 md:p-6 shadow-sm mt-6 cursor-pointer hover:shadow-md transition-all text-left w-full ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20 shadow-[0_0_15px_rgba(231,0,8,0.1)]' : 'bg-white'}`;

  // Job Post
  if (post.type === 'job') {
    const job = post as JobPost;

    return (
        <Link href={`/post/${post.id}`} className={cardClassName}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{post.author.name}</h3>
                  <span className="text-sm text-gray-500">{post.author.role}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                  <span>{post.createdAt}</span>
                  <span>•</span>
                  <Globe size={12} />
                </div>
              </div>
            </div>
            <div role="button" className="text-gray-400 hover:text-black" onClick={e => e.preventDefault()}>
              <MoreHorizontal size={20} />
            </div>
          </div>

          <div className="mb-4">
            <p className={`font-bold mb-1 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{job.company} is hiring! {job.title}</p>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{job.description}</p>
          </div>

          <div className={`border rounded-xl p-3 md:p-5 ${isDarkMode ? 'border-[#2ECC71]/20 bg-[#2ECC71]/5' : 'border-[#2ECC71]/30 bg-[#2ECC71]/5'}`}>
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#F4A261] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Briefcase size={24} />
              </div>
              <div>
                <h4 className={`font-bold text-lg leading-tight ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Application Deadline</span>
                    <span className="text-[10px] font-bold text-[#E50914]">{job.timeLeft}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-[#F4A261] to-[#E50914] transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className={`flex flex-wrap gap-4 mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
                <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-[#222] text-gray-300 border-gray-700' : 'bg-white text-gray-600 border-gray-100'}`}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2 md:gap-3">
              <button 
                onClick={e => { e.preventDefault(); /* Logic */ }}
                className={`flex-1 py-2 md:py-2.5 rounded-full border text-xs md:text-sm font-semibold transition-all ${isDarkMode ? 'bg-transparent border-gray-700 text-gray-300 hover:bg-white/10' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}`}
              >
                View Details
              </button>
              <button 
                onClick={handleApply}
                disabled={isApplied}
                className={`flex-1 py-2 md:py-2.5 rounded-full text-white text-xs md:text-sm font-semibold shadow-md transition-all ${
                  isApplied
                    ? 'bg-gray-400 cursor-default'
                    : 'bg-[#E50914] hover:bg-[#cc0812]'
                }`}
              >
                {isApplied ? 'Applied' : 'Apply Now'}
              </button>
            </div>
          </div>
        </Link>
    );
  }

  if (post.type === 'project') {
    const project = post as ProjectPost;

    return (
        <Link href={`/post/${post.id}`} className={cardClassName}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                 <Image src="/api/placeholder/40/40" alt="User" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{post.author.name}</h3>
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
            <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{project.title}</h3>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {project.description}
            </p>
          </div>

          <div className={`flex flex-wrap gap-4 mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
             <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${isDarkMode ? 'bg-[#222] border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                <Users size={16} className="text-[#F4A261]" />
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.membersNeeded} builders needed</span>
             </div>
             <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${isDarkMode ? 'bg-[#222] border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                <Send size={16} className="text-[#E50914]" />
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                   {liveRequests} requests sent
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-1"></span>
             </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-[#F4A261] text-white text-xs font-bold">
                {tag}
              </span>
            ))}
          </div>

          <PostInteractionBar initialLikes={post.likes} initialComments={post.comments} postId={post.id}>
             <button 
                onClick={handleRequestJoin}
                disabled={isRequestSent}
                className={`w-full sm:w-auto px-6 py-2 rounded-full text-white text-sm font-bold shadow-md transition-all ${
                  isRequestSent 
                    ? 'bg-gray-400 cursor-default' 
                    : 'bg-[#E50914] hover:bg-[#cc0812]'
                }`}
             >
              {isRequestSent ? 'Request Sent' : 'Request to Join'}
            </button>
          </PostInteractionBar>
        </Link>
    );
  }

  // Tech News Post
  if (post.type === 'tech-news') {
    const news = post as TechNewsPost;
    return (
      <Link href={`/post/${post.id}`} className={`${cardClassName} ${isDarkMode ? 'border-[#E70008]/20' : 'border-gray-100'} border`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center gap-1">
              <Globe size={12} />
              {news.source}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{post.createdAt}</span>
          </div>
          <div role="button" className="text-gray-400 hover:text-black" onClick={e => e.preventDefault()}>
            <MoreHorizontal size={20} />
          </div>
        </div>

        <div className="mb-4">
          <h3 className={`font-bold text-xl mb-2 leading-tight hover:text-[#E50914] cursor-pointer transition-colors ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>
            {news.title}
          </h3>
          <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {news.summary}
          </p>
          
          {news.imageUrl && (
            <div className={`w-full h-48 md:h-64 rounded-xl overflow-hidden mb-4 relative group cursor-pointer ${isDarkMode ? 'bg-[#222]' : 'bg-gray-100'}`}>
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

        <PostInteractionBar 
           initialLikes={post.likes} 
           initialComments={post.comments} 
           initialCommentsData={generateMockComments(post.id, post.comments)}
           postId={post.id}
        >
             <button 
                onClick={e => { e.preventDefault(); router.push(`/post/${post.id}`); }}
                className="flex items-center gap-2 text-[#E50914] font-bold text-sm hover:underline"
             >
                Read Article
                <ChevronRight size={16} />
             </button>
        </PostInteractionBar>
      </Link>
    );
  }

  // Regular Post
  const regular = post as RegularPost;
  return (
        <Link href={`/post/${post.id}`} className={cardClassName}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                 <Image src="/api/placeholder/40/40" alt="User" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{post.author.name}</h3>
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
            <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{regular.title}</h3>
            <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {regular.content}
            </p>
            
            {regular.image && (
                <div className={`w-full h-64 md:h-80 rounded-xl overflow-hidden mb-2 border border-gray-100 relative ${isDarkMode ? 'bg-[#222] border-gray-700' : 'bg-gray-100 border-gray-100'}`}>
                   <Image src={regular.image} alt="Post Content" fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
            )}
          </div>

          <PostInteractionBar 
             initialLikes={post.likes} 
             initialComments={post.comments} 
             initialCommentsData={generateMockComments(post.id, post.comments)}
             postId={post.id} 
          />
        </Link>
  );
}

function FilterPill({ label, active, onClick, isDarkMode }: { label: string; active?: boolean; onClick?: () => void, isDarkMode?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
      active
        ? 'bg-[#E50914] text-white shadow-md'
        : isDarkMode 
          ? 'bg-[#111] text-gray-300 border border-gray-800 hover:bg-[#222]' 
          : 'bg-white text-black hover:bg-gray-50'
    }`}
    >
      {label}
    </button>
  );
}
