"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Star, Users, Clock, Award, 
  PlayCircle, CheckCircle, FileText, 
  Share2, Heart, Download, MonitorPlay,
  LayoutDashboard, MessageSquare, Search, Settings, Bell, LayoutGrid, Menu, X, GraduationCap, BadgeCheck, BookOpen
} from 'lucide-react';
import { useParams } from 'next/navigation';

// Mock Data - Expanded for Detail View
const COURSE_DETAILS = {
  1: {
    id: 1,
    title: "Complete React Native Bootcamp 2024",
    description: "Master React Native by building 5 real-world apps. Learn React Navigation, Firebase, Push Notifications, and publish to App Store & Play Store. This comprehensive course takes you from zero to hero in mobile app development.",
    instructor: {
      name: "Sarah Chen",
      role: "Senior Mobile Dev @ TechCorp",
      avatar: "SC",
      students: 12500,
      courses: 8,
      rating: 4.9,
      bio: "Sarah is a Senior Mobile Developer with 10+ years of experience. She has built apps for Fortune 500 companies and loves teaching complex concepts in simple ways."
    },
    price: 0,
    rating: 4.8,
    students: 1240,
    duration: "24h 30m",
    level: "Intermediate",
    category: "Mobile Development",
    lastUpdated: "January 2026",
    language: "English",
    certificate: true,
    features: [
      "24.5 hours on-demand video",
      "15 downloadable resources",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion"
    ],
    curriculum: [
      {
        title: "Section 1: Introduction to React Native",
        duration: "1h 15m",
        videos: 5,
        lessons: [
          { title: "Course Introduction", duration: "5:00", type: "video", isFree: true },
          { title: "Environment Setup (Windows & Mac)", duration: "15:30", type: "video", isFree: true },
          { title: "Creating Your First App", duration: "20:00", type: "video", isFree: false },
          { title: "Folder Structure Explained", duration: "10:15", type: "video", isFree: false },
          { title: "Running on Simulator vs Real Device", duration: "12:45", type: "video", isFree: false }
        ]
      },
      {
        title: "Section 2: Core Components & Styling",
        duration: "2h 30m",
        videos: 8,
        lessons: [
          { title: "View, Text & Image Components", duration: "18:00", type: "video", isFree: false },
          { title: "Styling with Flexbox", duration: "25:00", type: "video", isFree: false },
          { title: "Building a Login Screen UI", duration: "35:00", type: "video", isFree: false },
          { title: "ScrollView & FlatList", duration: "22:00", type: "video", isFree: false },
          { title: "Challenge: Build a Feed", duration: "15:00", type: "quiz", isFree: false }
        ]
      },
      {
        title: "Section 3: Navigation & Routing",
        duration: "3h 45m",
        videos: 12,
        lessons: [
          { title: "React Navigation Setup", duration: "12:00", type: "video", isFree: false },
          { title: "Stack Navigator", duration: "20:00", type: "video", isFree: false },
          { title: "Tab Navigator", duration: "18:00", type: "video", isFree: false },
          { title: "Passing Data Between Screens", duration: "25:00", type: "video", isFree: false }
        ]
      }
    ]
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  // Default to course 1 if not found or for demo
  const courseId = params?.id ? Number(params.id) : 1; 
  const course = COURSE_DETAILS[courseId as unknown as keyof typeof COURSE_DETAILS] ?? COURSE_DETAILS[1];
  
  const [activeSection, setActiveSection] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalVideos = course.curriculum.reduce((acc, section) => acc + section.videos, 0);

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
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 overflow-hidden">
             <Link href="/magna-school" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 shrink-0">
               <ChevronLeft size={24} />
             </Link>
             <h1 className="font-bold text-lg line-clamp-1">{course.title}</h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
             {/* Desktop Actions */}
             <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all">
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

        <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24 md:pb-8">
        
        {/* Left Column: Video & Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Video Player Placeholder */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle size={48} className="text-white fill-white" />
                </div>
             </div>
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
               <p className="font-medium">Preview: Course Introduction</p>
               <p className="text-sm text-gray-300">5:00</p>
             </div>
          </div>

          {/* Course Header Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-[#E50914]/10 text-[#E50914] text-xs font-bold rounded-full">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                {course.level}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1 text-[#F4A261] font-bold">
                <Star size={16} fill="currentColor" />
                <span>{course.rating}</span>
                <span className="text-gray-400 font-normal underline">({course.students} ratings)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Last updated {course.lastUpdated}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                   {course.instructor.avatar}
                 </div>
                 <div>
                   <p className="text-sm text-gray-500">Created by</p>
                   <p className="font-bold text-gray-900 hover:underline cursor-pointer">{course.instructor.name}</p>
                 </div>
              </div>
            </div>
          </div>

          {/* What you'll learn */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-xl mb-4 text-gray-900">What you&apos;ll learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Build native mobile apps with React Native",
                "Master React Navigation & Routing",
                "Implement Authentication with Firebase",
                "Use device features like Camera & Location",
                "State Management with Redux Toolkit",
                "Publish apps to Apple App Store & Google Play"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[#2ECC71] mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content / Syllabus */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">Course Content</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span>{course.curriculum.length} sections</span>
              <span>•</span>
              <span>{totalVideos} lectures</span>
              <span>•</span>
              <span>{course.duration} total length</span>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              {course.curriculum.map((section, idx) => (
                <div key={idx} className="border-b border-gray-100 last:border-0">
                  <button 
                    onClick={() => setActiveSection(activeSection === idx ? -1 : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`transform transition-transform ${activeSection === idx ? 'rotate-180' : ''}`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="font-bold text-gray-800">{section.title}</span>
                    </div>
                    <span className="text-xs text-gray-500">{section.videos} lectures • {section.duration}</span>
                  </button>
                  
                  {activeSection === idx && (
                    <div className="bg-white">
                      {section.lessons.map((lesson, lIdx) => (
                        <div key={lIdx} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            {lesson.type === 'video' ? (
                              <MonitorPlay size={16} className="text-gray-400 group-hover:text-[#E50914]" />
                            ) : (
                              <FileText size={16} className="text-gray-400 group-hover:text-[#E50914]" />
                            )}
                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                              {lesson.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            {lesson.isFree && (
                              <span className="text-xs text-[#E50914] font-medium">Preview</span>
                            )}
                            <span className="text-xs text-gray-400">{lesson.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Instructor Bio */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">Instructor</h3>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
               <div className="flex items-start gap-4 mb-4">
                 <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xl text-gray-600">
                   {course.instructor.avatar}
                 </div>
                 <div>
                   <h4 className="font-bold text-lg text-[#E50914]">{course.instructor.name}</h4>
                   <p className="text-gray-600 text-sm mb-2">{course.instructor.role}</p>
                   <div className="flex items-center gap-4 text-xs text-gray-500">
                     <div className="flex items-center gap-1">
                       <Star size={12} fill="currentColor" className="text-[#F4A261]" />
                       <span>{course.instructor.rating} Rating</span>
                     </div>
                     <div className="flex items-center gap-1">
                       <Users size={12} />
                       <span>{course.instructor.students.toLocaleString()} Students</span>
                     </div>
                     <div className="flex items-center gap-1">
                       <PlayCircle size={12} />
                       <span>{course.instructor.courses} Courses</span>
                     </div>
                   </div>
                 </div>
               </div>
               <p className="text-sm text-gray-600 leading-relaxed">
                 {course.instructor.bio}
               </p>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:col-span-1">
           <div className="sticky top-24 space-y-6">
             {/* Preview/Enroll Card */}
             <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="mb-6">
                    <span className={`text-3xl font-bold ${course.price === 0 ? 'text-[#2ECC71]' : 'text-black'}`}>
                      {course.price === 0 ? 'Free' : `KES ${course.price.toLocaleString()}`}
                    </span>
                    {course.price > 0 && (
                       <span className="block text-sm text-gray-400 line-through mt-1">KES {(course.price * 1.5).toLocaleString()}</span>
                    )}
                  </div>
                  
                  <button className="w-full py-3 rounded-xl bg-[#E50914] text-white font-bold text-lg hover:bg-[#cc0812] transition-colors shadow-lg shadow-[#E50914]/20 mb-3">
                    {course.price === 0 ? 'Enroll Now' : 'Buy Now'}
                  </button>
                  <p className="text-center text-xs text-gray-400 mb-6">30-Day Money-Back Guarantee</p>
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm text-gray-900">This course includes:</h4>
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                        {idx === 0 ? <MonitorPlay size={16} /> : 
                         idx === 1 ? <Download size={16} /> :
                         idx === 2 ? <Clock size={16} /> :
                         idx === 3 ? <Users size={16} /> :
                         <Award size={16} />}
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                   <button 
                     onClick={() => setIsLiked(!isLiked)}
                     className="font-bold text-sm text-gray-600 hover:text-black flex items-center gap-2"
                   >
                     <Heart size={18} className={isLiked ? "fill-[#E50914] text-[#E50914]" : ""} />
                     {isLiked ? 'Saved' : 'Save'}
                   </button>
                   <button className="font-bold text-sm text-gray-600 hover:text-black flex items-center gap-2">
                     <Share2 size={18} />
                     Share
                   </button>
                </div>
             </div>

             {/* Business Card */}
             <div className="bg-black rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold text-lg mb-2">Training 5 or more people?</h4>
                  <p className="text-sm text-gray-400 mb-4">Get your team access to Magna School&apos;s top 5,000+ courses anytime, anywhere.</p>
                  <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    Get Magna Business
                  </button>
                </div>
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[#E50914] rounded-full blur-2xl opacity-50"></div>
             </div>
           </div>
        </div>

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
