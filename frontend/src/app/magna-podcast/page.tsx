'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  Clock, 
  Calendar, 
  Headphones, 
  Share2, 
  Heart,
  User,
  MoreHorizontal,
  Search,
  Filter,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';
import { NavItem } from '@/components/NavItem';

// Mock Data for Podcasts
const PODCASTS = [
  {
    id: 1,
    title: "The Future of AI Development",
    host: "Sarah Chen",
    role: "AI Researcher",
    duration: "45 min",
    date: "Oct 24, 2023",
    listeners: "1.2k",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    description: "Discussing the latest trends in artificial intelligence and what it means for developers in 2024.",
    tags: ["AI", "Tech", "Future"]
  },
  {
    id: 2,
    title: "Building Scalable Systems",
    host: "Alex Rivera",
    role: "Senior Architect",
    duration: "52 min",
    date: "Oct 22, 2023",
    listeners: "850",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    description: "Deep dive into microservices architecture and how to scale your applications effectively.",
    tags: ["Architecture", "Backend", "Scaling"]
  },
  {
    id: 3,
    title: "Web3 & The Decentralized Web",
    host: "Michael Chang",
    role: "Blockchain Dev",
    duration: "38 min",
    date: "Oct 20, 2023",
    listeners: "2.1k",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    description: "Exploring the current state of Web3, DeFi, and what's next for blockchain technology.",
    tags: ["Web3", "Blockchain", "Crypto"]
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    host: "Emma Wilson",
    role: "Product Designer",
    duration: "41 min",
    date: "Oct 18, 2023",
    listeners: "1.5k",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    description: "Essential design principles every developer should know to build better user interfaces.",
    tags: ["Design", "UI/UX", "Frontend"]
  },
  {
    id: 5,
    title: "DevOps Best Practices",
    host: "David Kim",
    role: "DevOps Engineer",
    duration: "55 min",
    date: "Oct 15, 2023",
    listeners: "920",
    image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?auto=format&fit=crop&q=80&w=800",
    description: "Streamlining your deployment pipeline and managing infrastructure as code.",
    tags: ["DevOps", "Cloud", "CI/CD"]
  },
  {
    id: 6,
    title: "The Indie Hacker Journey",
    host: "Jessica Lee",
    role: "Founder",
    duration: "60 min",
    date: "Oct 12, 2023",
    listeners: "3.4k",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    description: "Real stories from indie hackers building profitable businesses alongside their day jobs.",
    tags: ["Startup", "Indie Hacker", "Business"]
  }
];

export default function MagnaPodcastPage() {
  const [activeTab, setActiveTab] = useState('Magna Podcast');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

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

  const togglePlay = (id: number) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <div className={`min-h-screen font-sans flex transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
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
      <main className={`flex-1 min-w-0 w-full md:ml-[88px] ${isSidebarExpanded ? 'lg:ml-[260px]' : 'lg:ml-[88px]'} p-4 pt-24 md:p-8 md:pt-24 max-w-7xl mx-auto transition-all duration-300 pb-24 md:pb-8 relative`}>
        
        {/* TOP NAVIGATION BAR */}
        <TopNavigation 
          title="Magna Podcast" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          className={`md:left-[88px] ${isSidebarExpanded ? 'lg:left-[260px]' : 'lg:left-[88px]'}`}
          isDarkMode={isDarkMode}
          showSearch={true}
          searchPlaceholder="Search episodes..."
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

        {/* HERO SECTION - JOIN PODCAST */}
        <div className={`w-full rounded-3xl overflow-hidden mb-10 relative ${isDarkMode ? 'bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] border border-[#E70008]/20' : 'bg-gradient-to-r from-[#222] to-[#111] text-white shadow-xl'}`}>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#E50914] rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#F4A261] rounded-full blur-[100px] opacity-20"></div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/30 text-[#E50914] text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse"></span>
                        Live Now
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                        Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4A261] to-[#E50914]">Magna Podcast</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-xl">
                        Connect with industry leaders, discuss cutting-edge tech, and share your journey with the global developer community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button className="px-8 py-3.5 rounded-full bg-[#E50914] text-white font-bold hover:bg-[#cc0812] transition-all shadow-lg hover:shadow-[#E50914]/30 flex items-center justify-center gap-2 group">
                            <Mic size={20} />
                            Start Listening
                        </button>
                        <button className={`px-8 py-3.5 rounded-full font-bold border-2 transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white' : 'border-white/20 text-white hover:bg-white/10'}`}>
                            <User size={20} />
                            Become a Guest
                        </button>
                    </div>
                </div>
                <div className="relative w-full max-w-sm aspect-square md:aspect-auto md:h-80 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                         <div className="absolute inset-0 rounded-full border-2 border-[#E50914]/30 animate-[spin_10s_linear_infinite]"></div>
                         <div className="absolute inset-4 rounded-full border-2 border-[#F4A261]/30 animate-[spin_15s_linear_infinite_reverse]"></div>
                         <div className="absolute inset-0 rounded-full flex items-center justify-center bg-gradient-to-br from-[#111] to-[#222] shadow-2xl border border-gray-800">
                             <Mic size={80} className="text-white drop-shadow-[0_0_15px_rgba(229,9,20,0.5)]" />
                         </div>
                         
                         {/* Floating Avatars */}
                         <div className="absolute top-0 right-10 w-12 h-12 rounded-full border-2 border-[#111] overflow-hidden shadow-lg animate-bounce delay-75">
                            <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User" width={48} height={48} className="object-cover" />
                         </div>
                         <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full border-2 border-[#111] overflow-hidden shadow-lg animate-bounce delay-150">
                            <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="User" width={40} height={40} className="object-cover" />
                         </div>
                         <div className="absolute bottom-10 right-0 w-14 h-14 rounded-full border-2 border-[#111] overflow-hidden shadow-lg animate-bounce delay-300">
                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="User" width={56} height={56} className="object-cover" />
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* FILTERS & TITLE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Latest Episodes</h2>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${isDarkMode ? 'bg-[#E50914] text-white' : 'bg-[#E50914] text-white shadow-md'}`}>All Episodes</button>
                <button className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${isDarkMode ? 'border-gray-800 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>Tech Talk</button>
                <button className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${isDarkMode ? 'border-gray-800 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>Developer Stories</button>
                <button className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${isDarkMode ? 'border-gray-800 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>Career Growth</button>
            </div>
        </div>

        {/* PODCAST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PODCASTS.map((podcast) => (
                <div key={podcast.id} className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${isDarkMode ? 'bg-[#111] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-100 hover:shadow-gray-200/50'}`}>
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden">
                        <Image 
                            src={podcast.image} 
                            alt={podcast.title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        
                        <div className="absolute top-4 left-4 flex gap-2">
                            {podcast.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wide border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button 
                            onClick={() => togglePlay(podcast.id)}
                            className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all transform group-hover:scale-110 shadow-lg ${playingId === podcast.id ? 'bg-[#E50914] text-white' : 'bg-white text-black'}`}
                        >
                            {playingId === podcast.id ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                        </button>

                        <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center gap-2 text-xs font-medium opacity-80 mb-1">
                                <Clock size={12} />
                                <span>{podcast.duration}</span>
                                <span>•</span>
                                <Calendar size={12} />
                                <span>{podcast.date}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5">
                        <h3 className={`text-xl font-bold mb-2 line-clamp-1 group-hover:text-[#E50914] transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {podcast.title}
                        </h3>
                        <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {podcast.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200/20">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                    {podcast.host.charAt(0)}
                                </div>
                                <div>
                                    <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{podcast.host}</p>
                                    <p className="text-[10px] text-gray-500">{podcast.role}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-gray-400">
                                <button className="hover:text-[#E50914] transition-colors"><Heart size={18} /></button>
                                <button className="hover:text-[#F4A261] transition-colors"><Share2 size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </main>
    </div>
  );
}
