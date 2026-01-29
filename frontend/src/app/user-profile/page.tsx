"use client";

import React, { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  LayoutGrid, Users, MessageCircleQuestion, Settings, Search, 
  Menu, X, FolderKanban, Plus, BadgeCheck, LayoutDashboard, MessageSquare, MapPin, 
  Github, Linkedin, ExternalLink, MoreHorizontal, Edit, Bell
} from 'lucide-react';
import TopNavigation from '@/components/TopNavigation';
import LeftPanel from '@/components/LeftPanel';

function UserProfileContent() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const searchParams = useSearchParams();
  const isFromNav = searchParams?.get('from') === 'nav';

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

  // Mock User Data
  const user = {
    name: "Ashwa",
    username: "@ashwa",
    role: "UX Designer",
    secondaryRole: "Designer",
    location: "Nairobi",
    status: "available",
    bio: "Ux Ui designer | Author | Deep Thinker | Content Creator | Artist 🎨 📓 📽️",
    stats: {
      connections: 42,
      mutualConnections: 12,
      projects: 15,
      skills: 8
    },
    socials: [
      { name: "GitHub", icon: Github, url: "#", color: "text-gray-800" },
      { name: "LinkedIn", icon: Linkedin, url: "#", color: "text-blue-600" },
      { name: "WhatsApp", icon: MessageSquare, url: "#", color: "text-green-500" }
    ],
    skillsList: [
      { name: "UI/UX Design", level: "Expert" },
      { name: "Figma", level: "Expert" },
      { name: "Adobe XD", level: "Advanced" },
      { name: "Prototyping", level: "Expert" },
      { name: "User Research", level: "Advanced" },
      { name: "HTML/CSS", level: "Intermediate" },
      { name: "React", level: "Beginner" }
    ],
    projectsList: [
      { title: "E-commerce App Redesign", description: "Complete overhaul of a mobile shopping experience focused on conversion optimization.", image: null, tags: ["UI/UX", "Mobile"] },
      { title: "Finance Dashboard", description: "Web-based analytics dashboard for personal finance tracking.", image: null, tags: ["Web", "Dashboard"] },
      { title: "Travel Booking Platform", description: "User-centered design for a flight and hotel booking service.", image: null, tags: ["Product Design"] }
    ],
    activitiesList: [
      { type: "project", text: "Published a new project: E-commerce App Redesign", time: "2 days ago" },
      { type: "connection", text: "Connected with Sarah Jenkins", time: "1 week ago" },
      { type: "comment", text: "Commented on 'Future of AI in Design' post", time: "2 weeks ago" }
    ],
    connectionsList: [
      { name: "Sarah Jenkins", role: "Product Designer", initials: "SJ", color: "from-purple-500 to-pink-500" },
      { name: "Michael Chen", role: "Full Stack Developer", initials: "MC", color: "from-blue-500 to-cyan-500" },
      { name: "Jessica Wu", role: "Frontend Engineer", initials: "JW", color: "from-green-500 to-emerald-500" },
      { name: "David Miller", role: "UX Researcher", initials: "DM", color: "from-orange-500 to-red-500" },
      { name: "Alex Thompson", role: "Product Manager", initials: "AT", color: "from-indigo-500 to-purple-500" }
    ]
  };

  const tabs = ['Overview', 'Skills', 'Projects', 'Activities', 'Connections'];

  return (
    <div className={`h-screen font-sans flex overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      
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
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* TOP NAVIGATION BAR */}
        <TopNavigation 
          title="Profile" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          className="md:!left-0 lg:!left-0"
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

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto pt-[65px] md:pt-[71px]">
            <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
                
                {/* 1. PROFILE HEADER CARD */}
                <div className={`rounded-2xl p-6 md:p-8 shadow-sm border relative ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                    {/* Background Pattern/Banner (Optional) */}
                    <div className={`absolute top-0 left-0 w-full h-32 opacity-50 rounded-t-2xl ${isDarkMode ? 'bg-gradient-to-r from-[#222] to-[#333]' : 'bg-gradient-to-r from-gray-50 to-gray-100'}`}></div>

                    <div className="relative flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-end text-center md:text-left">
                        {/* Avatar */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black p-1 shadow-xl -mt-12 md:-mt-0 z-10 relative group mx-auto md:mx-0">
                             <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] overflow-hidden">
                                {/* Placeholder for user image */}
                                <div className="w-full h-full flex items-center justify-center text-4xl text-white font-bold">A</div>
                             </div>
                             <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 pt-2 w-full">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{user.name}</h1>
                                <BadgeCheck className="text-[#E50914]" size={24} fill={isDarkMode ? 'black' : 'white'} />
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-500 mb-3">
                                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-green-900/20 text-green-400 border-green-900/30' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                    {user.status}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {user.location}
                                </span>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                                <span className="px-3 py-1 bg-[#F4A261]/10 text-[#d98236] rounded-lg text-xs font-bold border border-[#F4A261]/20">
                                    {user.role}
                                </span>
                                <span className="px-3 py-1 bg-[#E50914]/10 text-[#E50914] rounded-lg text-xs font-bold border border-[#E50914]/20">
                                    {user.secondaryRole}
                                </span>
                            </div>

                            <p className={`text-sm md:text-base max-w-2xl line-clamp-2 mb-2 mx-auto md:mx-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {user.bio}
                            </p>
                            
                            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 font-medium">
                                <span className="hover:text-[#E50914] cursor-pointer transition-colors">
                                    <span className={`font-bold ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{user.stats.connections}</span> connections
                                </span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="hover:text-[#E50914] cursor-pointer transition-colors">
                                    <span className={`font-bold ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{user.stats.mutualConnections}</span> mutual connections
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <button className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-[#F4A261] to-[#E50914] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95">
                                Connect
                            </button>
                            <button className={`flex-1 md:flex-none px-6 py-2.5 border rounded-xl font-bold text-sm transition-all active:scale-95 ${isDarkMode ? 'bg-[#222] border-gray-700 text-white hover:bg-[#333]' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}`}>
                                Message
                            </button>
                            {isFromNav && (
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className={`p-2.5 border rounded-xl transition-all ${isDarkMode ? 'bg-[#222] border-gray-700 text-gray-400 hover:bg-[#333]' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>
                                    
                                    {isMenuOpen && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-10" 
                                                onClick={() => setIsMenuOpen(false)}
                                            ></div>
                                            <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg border z-20 py-2 animate-in fade-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                                                <Link 
                                                    href="/settings" 
                                                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#E50914]'}`}
                                                >
                                                    <Edit size={16} />
                                                    Edit Details
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. TABS NAVIGATION */}
                <div className={`flex items-center gap-1 md:gap-8 border-b overflow-x-auto no-scrollbar ${isDarkMode ? 'border-[#E70008]/20' : 'border-gray-200'}`}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-1 py-4 text-sm font-medium relative whitespace-nowrap transition-colors ${
                                activeTab === tab ? 'text-[#E50914]' : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E50914] rounded-t-full"></span>
                            )}
                            <span className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}>
                                {tab}
                            </span>
                        </button>
                    ))}
                </div>

                {/* 3. TAB CONTENT */}
                <div className="min-h-[300px]">
                    {activeTab === 'Overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* LEFT COLUMN */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* About Card */}
                                <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                                    <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>About</h3>
                                    <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {user.bio}
                                    </p>
                                </div>

                                {/* Social Links Card */}
                                <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                                    <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Social Links</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {user.socials.map(social => (
                                            <a 
                                                key={social.name}
                                                href={social.url}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors group ${isDarkMode ? 'bg-[#222] hover:bg-[#333]' : 'bg-gray-50 hover:bg-gray-100'}`}
                                            >
                                                <social.icon size={18} className={`${social.color}`} />
                                                <span className={`text-sm font-medium ${social.color}`}>{social.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="space-y-6">
                                {/* Stats Card */}
                                <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                                    <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Stats</h3>
                                    <div className="space-y-4">
                                        <div className={`flex items-center justify-between p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}>
                                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Connections</span>
                                            <span className="font-bold text-[#F4A261]">{user.stats.connections}</span>
                                        </div>
                                        <div className={`flex items-center justify-between p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}>
                                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects</span>
                                            <span className="font-bold text-[#E50914]">{user.stats.projects}</span>
                                        </div>
                                        <div className={`flex items-center justify-between p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}>
                                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Skills</span>
                                            <span className="font-bold text-blue-500">{user.stats.skills}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Availability Card */}
                                <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                                    <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Availability</h3>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${isDarkMode ? 'bg-green-900/20 text-green-400 border-green-900/30' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        Available for work
                                    </span>
                                </div>

                                {/* Mutual Connections Card */}
                                <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                                    <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Mutual Connections</h3>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm italic">
                                        Coming soon...
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Skills' && (
                        <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                            <h3 className={`font-bold text-lg mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Skills & Expertise</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.skillsList.map((skill, index) => (
                                    <div key={index} className={`flex items-center justify-between p-4 rounded-xl border hover:border-[#F4A261]/30 transition-all ${isDarkMode ? 'bg-[#222] border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm text-[#F4A261] ${isDarkMode ? 'bg-[#333]' : 'bg-white'}`}>
                                                <BadgeCheck size={20} />
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{skill.name}</h4>
                                                <p className="text-xs text-gray-500">{skill.level}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Projects' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.projectsList.map((project, index) => (
                                <div key={index} className={`rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-all group ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                                    <div className={`h-48 relative overflow-hidden ${isDarkMode ? 'bg-[#222]' : 'bg-gray-100'}`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br flex items-center justify-center ${isDarkMode ? 'from-[#222] to-[#333] text-gray-600' : 'from-gray-100 to-gray-200 text-gray-300'}`}>
                                            <FolderKanban size={48} />
                                        </div>
                                        <div className={`absolute top-4 right-4 backdrop-blur-sm p-2 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-[#E50914] ${isDarkMode ? 'bg-black/90 text-white' : 'bg-white/90'}`}>
                                            <ExternalLink size={18} />
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-[#E50914]/5 text-[#E50914] rounded-md text-[10px] font-bold uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className={`font-bold text-lg mb-2 group-hover:text-[#E50914] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            Completed
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Add New Project Card (Optional) */}
                            <button className={`h-full min-h-[300px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 hover:text-[#E50914] hover:border-[#E50914]/50 hover:bg-[#E50914]/5 transition-all ${isDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                                <div className={`w-16 h-16 rounded-full shadow-sm flex items-center justify-center ${isDarkMode ? 'bg-[#222]' : 'bg-white'}`}>
                                    <Plus size={32} />
                                </div>
                                <span className="font-bold text-sm">Add New Project</span>
                            </button>
                        </div>
                    )}

                    {activeTab === 'Activities' && (
                        <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                            <h3 className={`font-bold text-lg mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Recent Activity</h3>
                            <div className={`space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] ${isDarkMode ? 'before:bg-[#333]' : 'before:bg-gray-100'}`}>
                                {user.activitiesList.map((activity, index) => (
                                    <div key={index} className="relative flex gap-4 pl-2">
                                        <div className={`w-10 h-10 rounded-full border-4 shadow-sm flex items-center justify-center z-10 flex-shrink-0 ${
                                            activity.type === 'project' ? 'bg-[#E50914] text-white border-transparent' : 
                                            activity.type === 'connection' ? 'bg-[#F4A261] text-white border-transparent' : 
                                            isDarkMode ? 'bg-[#333] text-gray-400 border-[#111]' : 'bg-gray-100 text-gray-600 border-white'
                                        }`}>
                                            {activity.type === 'project' && <FolderKanban size={18} />}
                                            {activity.type === 'connection' && <Users size={18} />}
                                            {activity.type === 'comment' && <MessageSquare size={18} />}
                                        </div>
                                        <div className="pt-1">
                                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                                {activity.text}
                                            </p>
                                            <span className="text-xs text-gray-400 mt-1 block">
                                                {activity.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Connections' && (
                        <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                            <h3 className={`font-bold text-lg mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Connections</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.connectionsList.map((connection, index) => (
                                    <div key={index} className={`flex items-center gap-4 p-4 rounded-xl border hover:border-[#F4A261]/30 transition-all group ${isDarkMode ? 'bg-[#222] border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${connection.color} flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0`}>
                                            {connection.initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`font-bold text-sm truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>{connection.name}</h4>
                                            <p className="text-xs text-gray-500 truncate">{connection.role}</p>
                                        </div>
                                        <button className={`p-2 rounded-full transition-colors shadow-sm opacity-0 group-hover:opacity-100 ${isDarkMode ? 'bg-[#333] text-gray-400 hover:bg-[#E50914] hover:text-white' : 'bg-white text-gray-400 hover:bg-[#E50914] hover:text-white'}`}>
                                            <MessageSquare size={16} />
                                        </button>
                                    </div>
                                ))}
                                
                                <button className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed hover:text-[#E50914] hover:border-[#E50914]/50 hover:bg-[#E50914]/5 transition-all ${isDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                                    <span className="text-sm font-bold">View all connections</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function UserProfilePage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#FDF8F5] flex items-center justify-center"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#E50914] rounded-full animate-spin"></div></div>}>
      <UserProfileContent />
    </Suspense>
  );
}
