"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Plus, Search, 
  MapPin, Briefcase, DollarSign, Clock, Building, Globe,
  MoreHorizontal
} from 'lucide-react';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';

export default function JobsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Opportunities');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    // Dispatch event for other components
    window.dispatchEvent(new Event('themeChanged'));
  };

  // Mock Jobs Data
  const allJobs = [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "TechFlow Systems",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      salary: "$140k - $180k",
      postedAt: "2 days ago",
      description: "We are looking for an experienced Frontend Engineer to lead our core product team. You will be working with React, Next.js, and TypeScript.",
      tags: ["React", "TypeScript", "Next.js"],
      logoColor: "bg-blue-500",
      category: "recommended"
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "DataStream Inc",
      location: "Remote",
      type: "Contract",
      salary: "$60 - $80 / hr",
      postedAt: "5 hours ago",
      description: "Join our backend team to build scalable APIs and microservices. Experience with Node.js, Python, and AWS is required.",
      tags: ["Node.js", "Python", "AWS"],
      logoColor: "bg-green-500",
      category: "saved",
      isExpired: false,
      timeLeft: "5 days left"
    },
    {
      id: 3,
      title: "Product Designer",
      company: "Creative Pulse",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110k - $150k",
      postedAt: "1 day ago",
      description: "We need a visionary Product Designer to shape the future of our creative tools. Proficiency in Figma and prototyping is a must.",
      tags: ["Figma", "UI/UX", "Prototyping"],
      logoColor: "bg-purple-500",
      category: "recommended"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudScale Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$130k - $170k",
      postedAt: "3 days ago",
      description: "Looking for a DevOps Engineer to manage our CI/CD pipelines and cloud infrastructure. Kubernetes and Docker experience preferred.",
      tags: ["Kubernetes", "Docker", "CI/CD"],
      logoColor: "bg-orange-500",
      category: "saved",
      isExpired: true,
      timeLeft: "Expired"
    },
    {
      id: 5,
      title: "Full Stack Developer",
      company: "Innovate Labs",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      postedAt: "4 days ago",
      description: "Seeking a Full Stack Developer proficient in the MERN stack. You will be responsible for end-to-end feature development.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      logoColor: "bg-red-500",
      category: "recommended"
    },
    {
      id: 6,
      title: "Machine Learning Engineer",
      company: "AI Frontiers",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$150k - $200k",
      postedAt: "1 week ago",
      description: "Join our AI research team to develop state-of-the-art machine learning models. Experience with PyTorch or TensorFlow is essential.",
      tags: ["Python", "Machine Learning", "PyTorch"],
      logoColor: "bg-indigo-500",
      category: "saved",
      isExpired: false,
      timeLeft: "2 days left"
    }
  ];

  const tabs = ['All jobs', 'Recommended for you', 'Saved jobs'];
  const [activeFilterTab, setActiveFilterTab] = useState('All jobs');

  const filteredJobs = allJobs.filter(job => {
    const matchesCategory = 
      activeFilterTab === 'All jobs' ? true :
      activeFilterTab === 'Recommended for you' ? job.category === 'recommended' :
      activeFilterTab === 'Saved jobs' ? job.category === 'saved' : true;
    
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`h-screen font-sans flex overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      
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
      <div className={`flex-1 flex flex-col h-full overflow-hidden relative md:ml-[88px] ${isSidebarExpanded ? 'lg:ml-[260px]' : 'lg:ml-[88px]'} transition-all duration-300`}>
        
        {/* TOP NAVIGATION BAR */}
        <TopNavigation 
          title="Jobs" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          searchPlaceholder="Search jobs, companies, skills..."
          searchValue={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          isDarkMode={isDarkMode}
        />

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            <div className={`absolute top-0 left-0 w-full h-full shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left ${
              isDarkMode ? 'bg-black border-r border-[#E70008]/20' : 'bg-white'
            }`}>
              <div className={`p-4 border-b flex items-center justify-between sticky top-0 z-10 ${
                isDarkMode ? 'bg-black border-[#E70008]/20' : 'bg-white border-gray-100'
              }`}>
                <Link href="/" className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-[#E70008] flex items-center justify-center shadow-lg">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                   </div>
                   <span className="text-lg font-bold tracking-tight">
                      <span className="text-[#F4A261]">Magna</span>
                      <span className="text-[#E70008]">Coders</span>
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
        <div className="flex-1 overflow-y-auto pt-[65px] md:pt-[80px]">
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Opportunities</h1>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Find your next dream role</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Link href="/create-job" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E50914] text-white rounded-xl font-bold shadow-md hover:bg-[#cc0812] transition-all active:scale-95 w-full md:w-auto">
                  <Plus size={20} />
                  <span>Post a Job</span>
                </Link>
              </div>
            </div>

            {/* TABS */}
            <div className={`flex items-center gap-6 border-b mb-8 overflow-x-auto no-scrollbar ${
              isDarkMode ? 'border-[#E70008]/20' : 'border-gray-200'
            }`}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilterTab(tab)}
                  className={`pb-4 px-2 text-sm font-bold whitespace-nowrap relative transition-colors ${
                    activeFilterTab === tab 
                      ? 'text-[#E50914]' 
                      : isDarkMode ? 'text-gray-500 hover:text-[#F9E4AD]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                  {activeFilterTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E50914] rounded-t-full shadow-[0_0_10px_rgba(231,0,8,0.8)]"></span>
                  )}
                </button>
              ))}
            </div>

            {/* JOBS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <div key={job.id} className={`rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all group ${
                  isDarkMode 
                    ? 'bg-[#111] border-[#E70008]/30 shadow-[0_0_15px_rgba(231,0,8,0.1)]' 
                    : 'bg-white border-gray-100'
                }`}>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0 ${job.logoColor}`}>
                        {job.company.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h2 className={`text-lg font-bold transition-colors group-hover:text-[#E50914] truncate ${
                          isDarkMode ? 'text-[#F9E4AD]' : 'text-black'
                        }`}>
                          {job.title}
                        </h2>
                        <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#222] text-gray-400' : 'hover:bg-gray-100 text-gray-400'}`}>
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className={`text-sm mb-6 leading-relaxed line-clamp-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {job.description}
                  </p>

                  {/* Expiration Status for Saved Jobs */}
                  {activeFilterTab === 'Saved jobs' && job.category === 'saved' && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${job.isExpired ? 'text-red-500' : 'text-gray-500'}`}>
                          {job.isExpired ? 'Application Expired' : 'Application Deadline'}
                        </span>
                        <span className={`text-xs font-bold ${job.isExpired ? 'text-red-500' : 'text-[#E50914]'}`}>
                          {job.timeLeft}
                        </span>
                      </div>
                      {!job.isExpired && (
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#F4A261] to-[#E50914]"
                            style={{ width: '65%' }} // Mock progress
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className={`flex-shrink-0 ${isDarkMode ? 'text-[#E50914]' : 'text-gray-400'}`} />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className={`flex-shrink-0 ${isDarkMode ? 'text-[#E50914]' : 'text-gray-400'}`} />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className={`flex-shrink-0 ${isDarkMode ? 'text-[#E50914]' : 'text-gray-400'}`} />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={`flex-shrink-0 ${isDarkMode ? 'text-[#E50914]' : 'text-gray-400'}`} />
                      <span>{job.postedAt}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map(tag => (
                      <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        isDarkMode 
                          ? 'bg-[#222] text-gray-300 border-gray-800' 
                          : 'bg-gray-50 text-gray-600 border-gray-100'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 bg-[#E50914] text-white rounded-xl font-bold text-sm shadow-sm hover:bg-[#cc0812] transition-colors">
                      Apply Now
                    </button>
                    <button className={`flex-1 py-2.5 border rounded-xl font-bold text-sm transition-colors ${
                      isDarkMode 
                        ? 'bg-transparent border-[#E70008]/40 text-[#F9E4AD] hover:bg-[#E70008]/10' 
                        : 'bg-white border-gray-200 text-black hover:bg-gray-50'
                    }`}>
                      Save Job
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
