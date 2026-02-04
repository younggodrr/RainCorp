'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { generateMockPosts, FeedPost } from '@/utils/mockData';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';
import Toast from '@/components/Toast';
import FeedItem from '@/components/FeedItem';
import MobileDrawer from '@/components/MobileDrawer';
import InactiveAccountAlert from '@/components/InactiveAccountAlert';
import FeedFab from '@/components/FeedFab';
import FeedFilters from '@/components/FeedFilters';

export default function FeedPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [showInactiveAlert, setShowInactiveAlert] = useState(true);
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = () => {
    setIsResending(true);
    // Simulate API call to resend verification email
    setTimeout(() => {
      setIsResending(false);
      showToast('Verification email has been resent to your inbox.');
    }, 1500);
  };

  useEffect(() => {
    console.log('Feed page mounted');
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

        {/* MOBILE DRAWER */}
        <MobileDrawer 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        {/* Filter Pills */}
        <FeedFilters 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          isDarkMode={isDarkMode} 
        />

        {/* Notification Bars */}
        <div className="space-y-2 mb-6">
          <InactiveAccountAlert 
            show={showInactiveAlert} 
            onClose={() => setShowInactiveAlert(false)} 
            onResendEmail={handleResendEmail} 
            isResending={isResending}
            isDarkMode={isDarkMode}
          />
        </div>

        {filteredPosts.map((post, index) => {
          if (filteredPosts.length === index + 1) {
             return (
               <div ref={lastPostElementRef} key={post.id}>
                 <FeedItem 
                   post={post} 
                   onRequestJoin={(authorName) => showToast(post.type === 'job' ? `Application sent to ${authorName}!` : `Request sent. ${authorName} will review your request.`)} 
                   isDarkMode={isDarkMode} 
                 />
               </div>
             );
          } else {
             return (
               <div key={post.id}>
                 <FeedItem 
                   post={post} 
                   onRequestJoin={(authorName) => showToast(post.type === 'job' ? `Application sent to ${authorName}!` : `Request sent. ${authorName} will review your request.`)} 
                   isDarkMode={isDarkMode} 
                 />
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
      <FeedFab />
    </div>
  );
}
