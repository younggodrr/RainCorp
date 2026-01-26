"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, Users, MessageCircleQuestion, Settings, 
  Menu, X, FolderKanban, Plus, Search, Filter, 
  MoreVertical, Calendar, Code2, Layers, ExternalLink,
  MessageSquare, LayoutDashboard
} from 'lucide-react';

export default function MyProjectsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All projects');

  // Mock Projects Data
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Building a modern e-commerce platform with React and Node.js",
      category: "Web Development",
      status: "in-progress",
      level: "advanced",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      teamCount: 3,
      date: "2024-01-15",
      image: null
    },
    {
      id: 2,
      title: "Mobile Weather App",
      description: "Cross-platform weather application with real-time updates",
      category: "Mobile Development",
      status: "open",
      level: "intermediate",
      techStack: ["React Native", "TypeScript", "OpenWeather API"],
      teamCount: 2,
      date: "2024-01-10",
      image: null
    },
    {
      id: 3,
      title: "AI Image Generator",
      description: "Web application that uses Stable Diffusion to generate images from text prompts",
      category: "AI/ML",
      status: "planning",
      level: "advanced",
      techStack: ["Python", "FastAPI", "React", "PyTorch"],
      teamCount: 1,
      date: "2024-01-20",
      image: null
    }
  ];

  const tabs = ['All projects', 'Finished projects', 'Search new projects'];

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
          
          <Link href="/user-profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-md transition-all">
            JD
          </Link>
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
           
           <div className="flex-1 text-center font-bold text-lg">My Projects</div>

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
                  <Link href="/my-projects" className="w-full block">
                    <div className="flex items-center gap-3 p-2 rounded-lg text-[#E50914] bg-[#E50914]/5 font-bold transition-colors">
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
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">My Projects</h1>
                <p className="text-gray-500">Manage and create your collaborative projects</p>
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E50914] text-white rounded-xl font-bold shadow-md hover:bg-[#cc0812] transition-all active:scale-95">
                <Plus size={20} />
                <span>Create New Project</span>
              </button>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-6 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 text-sm font-bold whitespace-nowrap relative transition-colors ${
                    activeTab === tab ? 'text-[#E50914]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E50914] rounded-t-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* PROJECTS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-black group-hover:text-[#E50914] transition-colors">
                      {project.title}
                    </h2>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        project.status === 'in-progress' ? 'bg-[#E50914]/5 text-[#E50914] border-[#E50914]/20' : 
                        project.status === 'open' ? 'bg-[#F4A261]/10 text-[#d98236] border-[#F4A261]/20' : 
                        'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        {project.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-200">
                        {project.level}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Category */}
                  <div className="mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Category</span>
                    <span className="text-sm font-bold text-[#F4A261]">{project.category}</span>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Tech Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium border border-gray-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-6">
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>Team: {project.teamCount} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 bg-[#E50914] text-white rounded-xl font-bold text-sm shadow-sm hover:bg-[#cc0812] transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 py-2.5 bg-white border border-gray-200 text-black rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}