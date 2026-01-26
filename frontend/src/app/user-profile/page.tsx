"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, Users, MessageCircleQuestion, Settings, Search, 
  Menu, X, FolderKanban, Briefcase, Plus, BookOpen, GraduationCap, 
  BadgeCheck, LayoutDashboard, MessageSquare, MapPin, Globe, 
  Github, Linkedin, Twitter, ExternalLink, CheckCircle2, MoreHorizontal 
} from 'lucide-react';

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
           
           <div className="flex-1 text-center font-bold text-lg">Profile</div>

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
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto pt-20 md:pt-0">
            <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
                
                {/* 1. PROFILE HEADER CARD */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                    {/* Background Pattern/Banner (Optional) */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-gray-50 to-gray-100 opacity-50"></div>

                    <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
                        {/* Avatar */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black p-1 shadow-xl -mt-4 md:-mt-0 z-10 relative group">
                             <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] overflow-hidden">
                                {/* Placeholder for user image */}
                                <div className="w-full h-full flex items-center justify-center text-4xl text-white font-bold">A</div>
                             </div>
                             <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 pt-2">
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-black">{user.name}</h1>
                                <BadgeCheck className="text-[#E50914]" size={24} fill="white" />
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                                <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium border border-green-100">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                    {user.status}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {user.location}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="px-3 py-1 bg-[#F4A261]/10 text-[#d98236] rounded-lg text-xs font-bold border border-[#F4A261]/20">
                                    {user.role}
                                </span>
                                <span className="px-3 py-1 bg-[#E50914]/10 text-[#E50914] rounded-lg text-xs font-bold border border-[#E50914]/20">
                                    {user.secondaryRole}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm md:text-base max-w-2xl line-clamp-2 mb-2">
                                {user.bio}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                                <span className="hover:text-[#E50914] cursor-pointer transition-colors">
                                    <span className="font-bold text-black">{user.stats.connections}</span> connections
                                </span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="hover:text-[#E50914] cursor-pointer transition-colors">
                                    <span className="font-bold text-black">{user.stats.mutualConnections}</span> mutual connections
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <button className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-[#F4A261] to-[#E50914] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95">
                                Connect
                            </button>
                            <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-gray-200 text-black rounded-xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-95">
                                Message
                            </button>
                            <button className="p-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-all">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. TABS NAVIGATION */}
                <div className="flex items-center gap-1 md:gap-8 border-b border-gray-200 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-1 py-4 text-sm font-medium relative whitespace-nowrap transition-colors ${
                                activeTab === tab ? 'text-[#E50914]' : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E50914] rounded-t-full"></span>
                            )}
                            <span className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors">
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
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-lg text-black mb-4">About</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {user.bio}
                                    </p>
                                </div>

                                {/* Social Links Card */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-lg text-black mb-4">Social Links</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {user.socials.map(social => (
                                            <a 
                                                key={social.name}
                                                href={social.url}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
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
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-lg text-black mb-4">Stats</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                            <span className="text-gray-600 text-sm">Connections</span>
                                            <span className="font-bold text-[#F4A261]">{user.stats.connections}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                            <span className="text-gray-600 text-sm">Projects</span>
                                            <span className="font-bold text-[#E50914]">{user.stats.projects}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                            <span className="text-gray-600 text-sm">Skills</span>
                                            <span className="font-bold text-blue-500">{user.stats.skills}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Availability Card */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-lg text-black mb-4">Availability</h3>
                                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-sm font-medium border border-green-100">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        Available for work
                                    </span>
                                </div>

                                {/* Mutual Connections Card */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-lg text-black mb-4">Mutual Connections</h3>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm italic">
                                        Coming soon...
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Skills' && (
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-lg text-black mb-6">Skills & Expertise</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.skillsList.map((skill, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#F4A261]/30 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#F4A261]">
                                                <BadgeCheck size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-black text-sm">{skill.name}</h4>
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
                                <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-300">
                                            <FolderKanban size={48} />
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-[#E50914]">
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
                                        <h3 className="font-bold text-lg text-black mb-2 group-hover:text-[#E50914] transition-colors">{project.title}</h3>
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
                            <button className="h-full min-h-[300px] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 text-gray-400 hover:text-[#E50914] hover:border-[#E50914]/50 hover:bg-[#E50914]/5 transition-all">
                                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                                    <Plus size={32} />
                                </div>
                                <span className="font-bold text-sm">Add New Project</span>
                            </button>
                        </div>
                    )}

                    {activeTab === 'Activities' && (
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-lg text-black mb-6">Recent Activity</h3>
                            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                                {user.activitiesList.map((activity, index) => (
                                    <div key={index} className="relative flex gap-4 pl-2">
                                        <div className={`w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 flex-shrink-0 ${
                                            activity.type === 'project' ? 'bg-[#E50914] text-white' : 
                                            activity.type === 'connection' ? 'bg-[#F4A261] text-white' : 
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                            {activity.type === 'project' && <FolderKanban size={18} />}
                                            {activity.type === 'connection' && <Users size={18} />}
                                            {activity.type === 'comment' && <MessageSquare size={18} />}
                                        </div>
                                        <div className="pt-1">
                                            <p className="text-sm font-medium text-black">
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
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-lg text-black mb-6">Connections</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.connectionsList.map((connection, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#F4A261]/30 transition-all group">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${connection.color} flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0`}>
                                            {connection.initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-black text-sm truncate">{connection.name}</h4>
                                            <p className="text-xs text-gray-500 truncate">{connection.role}</p>
                                        </div>
                                        <button className="p-2 rounded-full bg-white text-gray-400 hover:bg-[#E50914] hover:text-white transition-colors shadow-sm opacity-0 group-hover:opacity-100">
                                            <MessageSquare size={16} />
                                        </button>
                                    </div>
                                ))}
                                
                                <button className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:text-[#E50914] hover:border-[#E50914]/50 hover:bg-[#E50914]/5 transition-all">
                                    <span className="text-sm font-bold">View all connections</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* MOBILE BOTTOM NAVIGATION */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 flex justify-between items-center pb-5 pt-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Link href="/feed" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
            <LayoutDashboard size={24} />
            <span className="text-[10px] font-medium">Feed</span>
          </Link>

          <Link href="/friends" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
            <Users size={24} />
            <span className="text-[10px] font-medium">Builders</span>
          </Link>

          <Link href="/messages" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
            <MessageSquare size={24} />
            <span className="text-[10px] font-medium">Chat</span>
          </Link>

          <Link href="/user-profile" className="flex flex-col items-center gap-1 text-[#E50914] transition-colors">
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
