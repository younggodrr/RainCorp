"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, Users, MessageSquare, Settings, 
  Search, Star, Clock, Award,
  BookOpen, Video,
  Bell, LayoutDashboard, Menu, X, GraduationCap, BadgeCheck
} from 'lucide-react';

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

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans text-[#444444] flex overflow-hidden">
      
      {/* DESKTOP SIDEBAR */}
      <div className="w-[80px] bg-white border-r border-gray-100 flex-col items-center py-6 gap-8 z-20 hidden md:flex">
        <Link href="/feed" className="w-10 h-10 rounded-lg bg-[#E50914] flex items-center justify-center text-white mb-4 shadow-md hover:bg-[#cc0812] transition-colors">
           <span className="font-bold text-xl">M</span>
        </Link>

        <div className="flex flex-col gap-6 w-full items-center">
          <Link href="/feed" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <LayoutGrid size={24} />
            <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Feed</span>
          </Link>
          
          <Link href="/builders" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <Users size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Builders</span>
          </Link>

          <Link href="/messages" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <MessageSquare size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Messages</span>
          </Link>
          
          <Link href="/notifications" className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#E50914] transition-all relative group">
            <Bell size={24} />
             <span className="absolute left-full ml-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Notifications</span>
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
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* HEADER */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-4 flex items-center justify-between gap-4">
           <div className="flex items-center gap-4 flex-1">
             <Link href="/feed" className="flex items-center gap-2 md:hidden">
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E50914]">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
             </Link>
             <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap hidden md:block">Magna School</h1>
             
             {/* Search Bar */}
             <div className="hidden md:flex relative flex-1 max-w-md ml-8">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search courses, mentors, skills..." 
                 className="w-full bg-gray-50 border border-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E50914] transition-all"
               />
             </div>
           </div>

           <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all hidden sm:flex">
               <BookOpen size={16} />
               <span className="hidden sm:inline">My Learning</span>
             </button>

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

        {/* CONTENT */}
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8">
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[#E50914] text-white shadow-md'
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
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full">
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-200">
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
                    <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#E50914] transition-colors">
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

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className={`text-lg font-bold ${course.price === 0 ? 'text-[#2ECC71]' : 'text-black'}`}>
                        {course.price === 0 ? 'Free' : `KES ${course.price.toLocaleString()}`}
                      </span>
                      {course.certificate && (
                        <div className="flex items-center gap-1 text-[10px] text-[#2ECC71] font-medium">
                          <Award size={10} />
                          <span>Certificate Included</span>
                        </div>
                      )}
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold hover:bg-[#E50914] transition-colors shadow-sm">
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
                 {/* Navigation Links */}
                 <div className="space-y-1">
                    <Link href="/feed" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                      <LayoutDashboard size={20} />
                      Dashboard
                    </Link>
                    <Link href="/builders" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                      <Users size={20} />
                      Find Builders
                    </Link>
                    <Link href="/magna-school" className="flex items-center gap-3 px-4 py-3 bg-[#E50914]/5 text-[#E50914] rounded-xl font-medium">
                      <GraduationCap size={20} />
                      Magna School
                    </Link>
                    <Link href="/get-verification" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                      <BadgeCheck size={20} />
                      Get Verified
                    </Link>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE BOTTOM NAV */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 flex justify-between items-center pb-5 pt-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Link href="/feed" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
            <LayoutDashboard size={24} />
            <span className="text-[10px] font-medium">Feed</span>
          </Link>
          <Link href="/builders" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
            <Search size={24} />
            <span className="text-[10px] font-medium">Builders</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
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
    </div>
  );
}
