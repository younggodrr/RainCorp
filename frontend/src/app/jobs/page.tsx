"use client";

import React, { useState, useEffect } from 'react';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';
import JobCard, { Job } from '@/components/JobCard';
import TabFilters from '@/components/TabFilters';
import JobPageHeader from '@/components/JobPageHeader';
import MobileDrawer from '@/components/MobileDrawer';

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
  const allJobs: Job[] = [
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
        <MobileDrawer 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          isDarkMode={isDarkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          toggleTheme={toggleTheme}
        />

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto pt-[65px] md:pt-[80px]">
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            
            {/* HEADER */}
            <JobPageHeader isDarkMode={isDarkMode} />

            {/* TABS */}
            <TabFilters 
              tabs={tabs} 
              activeTab={activeFilterTab} 
              onTabChange={setActiveFilterTab} 
              isDarkMode={isDarkMode} 
            />

            {/* JOBS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  isDarkMode={isDarkMode} 
                  showExpiration={activeFilterTab === 'Saved jobs' && job.category === 'saved'} 
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
