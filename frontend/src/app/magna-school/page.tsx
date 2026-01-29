"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, Users, MessageSquare, Settings, 
  Search, Star, Clock, Award,
  BookOpen, Video,
  Bell, LayoutDashboard, Menu, X, GraduationCap, BadgeCheck
} from 'lucide-react';
import TopNavigation from '@/components/TopNavigation';
import LeftPanel from '@/components/LeftPanel';

// Mock Data for Courses
const COURSES = [
  {
    id: 1,
    title: "Complete React Native Bootcamp 2024",
    instructor: "Sarah Chen",
    role: "Senior Mobile Dev @ TechCorp",
    price: 0,
    rating: 4.8,
    students: 1240,
    duration: "24h 30m",
    level: "Intermediate",
    category: "Mobile Development",
    thumbnail: null, // Placeholder
    certificate: true,
    bestseller: true
  },
  {
    id: 2,
    title: "Advanced System Design for Scale",
    instructor: "David Miller",
    role: "Principal Architect",
    price: 6500,
    rating: 4.9,
    students: 850,
    duration: "18h 15m",
    level: "Advanced",
    category: "System Design",
    thumbnail: null,
    certificate: true,
    bestseller: false
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass: From Zero to Hero",
    instructor: "Jessica Wong",
    role: "Lead Designer @ CreativeStudio",
    price: 3800,
    rating: 4.7,
    students: 2100,
    duration: "32h 00m",
    level: "Beginner",
    category: "Design",
    thumbnail: null,
    certificate: true,
    bestseller: true
  },
  {
    id: 4,
    title: "Python for Data Science & Machine Learning",
    instructor: "Dr. Alex Thompson",
    role: "AI Researcher",
    price: 0,
    rating: 4.9,
    students: 1560,
    duration: "45h 45m",
    level: "All Levels",
    category: "Data Science",
    thumbnail: null,
    certificate: true,
    bestseller: true
  },
  {
    id: 5,
    title: "DevOps Engineering: Docker, Kubernetes & AWS",
    instructor: "Mark Wilson",
    role: "DevOps Lead",
    price: 7000,
    rating: 4.8,
    students: 920,
    duration: "28h 10m",
    level: "Advanced",
    category: "DevOps",
    thumbnail: null,
    certificate: true,
    bestseller: false
  },
  {
    id: 6,
    title: "Full Stack Web Development with Next.js 14",
    instructor: "Emma Davis",
    role: "Full Stack Developer",
    price: 4200,
    rating: 4.8,
    students: 3400,
    duration: "52h 20m",
    level: "Intermediate",
    category: "Web Development",
    thumbnail: null,
    certificate: true,
    bestseller: true
  }
];

const CATEGORIES = ["All", "Web Development", "Mobile Development", "Data Science", "Design", "DevOps", "System Design"];

export default function MagnaSchoolPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Magna School');
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

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        
        {/* HEADER */}
        <TopNavigation 
          title="Magna School" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          className="md:!left-0 lg:!left-0"
          searchPlaceholder="Search courses, mentors, skills..."
          isDarkMode={isDarkMode}
        />

        {/* CONTENT */}
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8 overflow-y-auto pt-[65px] md:pt-[71px]">
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[#E50914] text-white shadow-md'
                    : isDarkMode 
                      ? 'bg-[#222] text-gray-300 border border-gray-700 hover:bg-[#333]' 
                      : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <Link href={`/magna-school/${course.id}`} key={course.id} className="block h-full">
              <div className={`rounded-2xl border overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full ${
                isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'
              }`}>
                {/* Thumbnail */}
                <div className={`aspect-video relative overflow-hidden ${isDarkMode ? 'bg-[#222]' : 'bg-gray-100'}`}>
                  <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'text-gray-600 bg-[#222]' : 'text-gray-300 bg-gray-200'}`}>
                    <Video size={48} />
                  </div>
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {course.bestseller && (
                      <span className="px-2 py-1 rounded bg-[#F4A261] text-white text-[10px] font-bold shadow-sm">
                        Bestseller
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-bold line-clamp-2 leading-tight group-hover:text-[#E50914] transition-colors ${isDarkMode ? 'text-[#F9E4AD]' : 'text-gray-900'}`}>
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500 mb-1">{course.instructor}</p>
                  <p className="text-[10px] text-gray-400 mb-3">{course.role}</p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1 text-[#F4A261] font-bold">
                      <Star size={12} fill="currentColor" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className={`mt-auto pt-4 border-t flex items-center justify-between ${isDarkMode ? 'border-[#E70008]/20' : 'border-gray-50'}`}>
                    <div className="flex flex-col">
                      <span className={`text-lg font-bold ${course.price === 0 ? 'text-[#2ECC71]' : isDarkMode ? 'text-white' : 'text-black'}`}>
                        {course.price === 0 ? 'Free' : `KES ${course.price.toLocaleString()}`}
                      </span>
                      {course.certificate && (
                        <div className="flex items-center gap-1 text-[10px] text-[#2ECC71] font-medium">
                          <Award size={10} />
                          <span>Certificate Included</span>
                        </div>
                      )}
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[#E50914] text-white text-xs font-bold hover:bg-[#cc0812] transition-colors shadow-sm">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p>No courses found matching your criteria</p>
            </div>
          )}

        </div>

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

      </div>
    </div>
  );
}
