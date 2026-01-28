"use client";

import React, { useState } from 'react';
import { Phone, Video, Smile, Paperclip, Mic, Send, MoreHorizontal, CheckCheck, LayoutDashboard, Search, MessageSquare, Settings, Edit, MoreVertical, LayoutGrid, Users, MessageCircleQuestion, Menu, X, Plus, Bell } from 'lucide-react';
import Link from 'next/link';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Messages');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [filter, setFilter] = useState<'chats' | 'groups' | 'unread'>('chats');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    { id: '1', name: 'Kretya Studio', message: 'Victor is typing...', time: '4m', unread: 12, isTyping: true, pinned: true, isGroup: false },
    { id: '2', name: 'PM Okta', message: 'I see, okay noted!', time: '10m', readStatus: 'read', pinned: true, isGroup: false },
    { id: '3', name: 'Design Team', message: 'Sarah: New mockups are ready', time: '15m', unread: 3, isGroup: true },
    { id: '4', name: 'Project Alpha', message: 'Meeting at 2 PM?', time: '2h', readStatus: 'read', isGroup: true },
    { id: '5', name: 'Lead Frans', message: 'ok, thanks!', time: '1h', readStatus: 'read', isGroup: false },
    { id: '6', name: 'Victor Yoga', message: 'You can check it...', time: 'now', unread: 1, isGroup: false },
    { id: '7', name: 'Devon Lane', message: 'I\'ll try my best tomorrow', time: '4m', readStatus: 'delivered', isGroup: false },
    { id: '8', name: 'Guy Hawkins', message: 'okaay notedd bro!', time: '7m', readStatus: 'read', isGroup: false },
    { id: '9', name: 'Kristin Watson', message: 'nice.', time: '23m', unread: 1, isGroup: false },
  ];

  const filteredConversations = conversations.filter(c => {
    // Filter by category
    const matchesFilter = (() => {
      if (filter === 'groups') return c.isGroup;
      if (filter === 'unread') return c.unread;
      return true; // 'chats' shows all
    })();

    // Filter by search query
    const matchesSearch = searchQuery 
      ? c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.message.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-screen bg-[#FDF8F5] font-sans text-[#444444] flex overflow-hidden">
      
      {/* TOP NAVIGATION BAR */}
      <TopNavigation 
        title="Messages" 
        onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
        className="md:!left-0 lg:!left-0"
        searchPlaceholder="Search messages..."
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
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
                <LeftPanel 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  closeMenu={() => setIsMobileMenuOpen(false)} 
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        )}

      {/* MESSAGES LAYOUT */}
      <div className="flex-1 flex overflow-hidden pt-[65px] md:pt-[71px]">
        
        {/* 1. CONVERSATIONS LIST (Left Panel) */}
        <div className={`w-full md:w-[320px] lg:w-[380px] bg-white border-r border-gray-100 flex flex-col h-full ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Header */}
          <div className="p-4 md:p-6 pb-2">
            <div className="hidden md:flex items-center justify-end gap-2 mb-4">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                  <Edit size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                  <MoreVertical size={20} />
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar">
              {['Chats', 'Groups', 'Unread'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item.toLowerCase() as 'chats' | 'groups' | 'unread')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    filter === item.toLowerCase() 
                      ? 'bg-black text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-4 pb-24 md:pb-4 space-y-1">
            {filteredConversations.map((chat) => (
              <ConversationItem 
                key={chat.id}
                name={chat.name}
                message={chat.message}
                time={chat.time}
                unread={chat.unread}
                isTyping={chat.isTyping}
                readStatus={chat.readStatus}
                active={selectedChat === chat.id}
                onClick={() => setSelectedChat(chat.id)}
              />
            ))}
          </div>
        </div>

        {/* 2. CHAT WINDOW (Middle Panel) */}
        <div className={`flex-1 flex flex-col bg-[#FDF8F5] h-full ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Chat Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-4">
               {/* Mobile Back Button - visible only on mobile when chat is selected */}
               <button onClick={() => setSelectedChat(null)} className="md:hidden text-gray-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
               </button>
              
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
                  KS
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h2 className="font-bold text-black text-lg leading-tight">Kretya Studio</h2>
                <p className="text-xs text-[#2ECC71] font-medium">Victor is typing...</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <Video size={22} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <Phone size={22} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <MoreHorizontal size={22} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-center my-4">
              <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">Today, March 12</span>
            </div>

            <MessageBubble 
              sender="Lead Frans" 
              text="Hey everyone! Just wanted to kick off the day by saying how excited I am to dive into our latest project. Who's ready to work some design magic?" 
              time="01:20 AM"
              avatar="LF"
              color="bg-yellow-100 text-yellow-800"
            />

            <MessageBubble 
              sender="Floyd Miles" 
              text="Definitely pumped to get started. Did everyone get a chance to review the brief for Project Crypto?" 
              time="01:24 AM"
              avatar="FM"
              color="bg-red-100 text-red-800"
            />

            <MessageBubble 
              sender="Guy Hawkins" 
              text="Yes, I've looked it over. Seems like a fun challenge. Do we have any initial ideas brewing?" 
              time="01:25 AM"
              avatar="GH"
              color="bg-green-100 text-green-800"
            />

            {/* My Message */}
            <div className="flex flex-col items-end max-w-[80%] ml-auto">
              <div className="bg-[#E50914] text-white p-4 rounded-2xl rounded-tr-none shadow-md">
                <p className="text-sm leading-relaxed">
                  I&apos;veI&apos;ve got a few sketches already. Thinking of incorporating some sleek animations for the website interface. What do you all think?
                </p>
              </div>
              <div className="flex items-center gap-1 mt-1 mr-1">
                <span className="text-[10px] text-gray-400 font-medium">01:32 AM</span>
                <div className="w-4 h-4 rounded-full bg-red-100 overflow-hidden border border-white">
                   {/* Small avatar of reader if needed, or checkmarks */}
                   <CheckCheck size={12} className="text-[#E50914]" />
                </div>
              </div>
            </div>

          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-[#E50914] focus-within:ring-1 focus-within:ring-[#E50914] transition-all">
              <button className="p-2 text-gray-400 hover:text-[#E50914] transition-colors">
                <Smile size={24} />
              </button>
              <button className="p-2 text-gray-400 hover:text-[#E50914] transition-colors">
                <Paperclip size={24} />
              </button>
              
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-black placeholder-gray-400"
              />

              <button className="p-2 text-gray-400 hover:text-[#E50914] transition-colors">
                <Mic size={24} />
              </button>
              <button className="p-2 bg-[#E50914] text-white rounded-xl hover:bg-[#cc0812] transition-colors shadow-md">
                <Send size={20} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. GROUP INFO (Right Panel) - Hidden on smaller screens */}
        <div className="w-[300px] bg-white border-l border-gray-100 hidden xl:flex flex-col h-full overflow-y-auto">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-black text-lg">Group Info</h3>
          </div>
          
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl bg-black flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
              KS
            </div>
            <h2 className="text-xl font-bold text-black mb-1">Kretya Studio</h2>
            <p className="text-sm text-gray-500 mb-6">Group • 12 Members</p>
            
            <div className="flex gap-4 w-full">
              <button className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-600 font-medium text-xs hover:bg-gray-100 transition-colors flex flex-col items-center gap-1">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                   <Phone size={16} />
                 </div>
                 Audio
              </button>
              <button className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-600 font-medium text-xs hover:bg-gray-100 transition-colors flex flex-col items-center gap-1">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                   <Video size={16} />
                 </div>
                 Video
              </button>
            </div>
          </div>

          <div className="p-6 pt-0 space-y-6">
            <div>
               <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Description</h4>
               <p className="text-sm text-gray-600 leading-relaxed">
                 Where Creativity Meets Strategy. Elevating brands through innovative design and captivating storytelling.
               </p>
            </div>

            <div>
               <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex justify-between">
                 Media <span className="text-[#E50914] cursor-pointer">See All</span>
               </h4>
               <div className="grid grid-cols-3 gap-2">
                 <div className="aspect-square bg-gray-200 rounded-lg"></div>
                 <div className="aspect-square bg-gray-200 rounded-lg"></div>
                 <div className="aspect-square bg-gray-200 rounded-lg"></div>
               </div>
            </div>
          </div>

        </div>

      </div>

      {/* FLOATING ACTION BUTTON & MODAL */}
      <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-40 flex flex-col items-end gap-4">
        {/* Modal Options */}
        {isActionModalOpen && (
          <div className="flex flex-col gap-3 mb-2 origin-bottom-right">
             <button className="flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-lg border border-gray-100 hover:bg-gray-50 transition-all group whitespace-nowrap">
                <span className="text-sm font-bold text-gray-700 group-hover:text-[#E50914]">Create Group</span>
                <div className="w-8 h-8 rounded-full bg-[#F4A261]/10 text-[#F4A261] flex items-center justify-center group-hover:bg-[#E50914] group-hover:text-white transition-all">
                  <Users size={18} />
                </div>
             </button>
             
             <button className="flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-lg border border-gray-100 hover:bg-gray-50 transition-all group whitespace-nowrap">
                <span className="text-sm font-bold text-gray-700 group-hover:text-[#E50914]">Start Chat</span>
                <div className="w-8 h-8 rounded-full bg-[#E50914]/10 text-[#E50914] flex items-center justify-center group-hover:bg-[#E50914] group-hover:text-white transition-all">
                  <MessageSquare size={18} />
                </div>
             </button>
          </div>
        )}

        {/* FAB Trigger */}
        <button 
          onClick={() => setIsActionModalOpen(!isActionModalOpen)}
          className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 ${
            isActionModalOpen 
              ? 'bg-gray-800 rotate-45' 
              : 'bg-[#E50914]'
          }`}
        >
          <Plus size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* MOBILE BOTTOM NAV (From Feed Page) */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 flex justify-between items-center pb-5 pt-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] ${selectedChat ? 'hidden' : 'flex'}`}>
        <Link href="/feed" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
              <LayoutDashboard size={24} />
              <span className="text-[10px] font-medium">Feed</span>
            </Link>
            <Link href="/builders" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
              <Search size={24} />
              <span className="text-[10px] font-medium">Builders</span>
            </Link>
            <Link href="/messages" className="flex flex-col items-center gap-1 text-[#E50914] transition-colors">
              <MessageSquare size={24} />
              <span className="text-[10px] font-medium">Chat</span>
            </Link>

        <Link href="/user-profile?from=nav" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#E50914] transition-colors">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-[10px]">
             JD
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>

    </div>
  );
}

// --- SUBCOMPONENTS ---

interface ConversationItemProps {
  name: string;
  message: string;
  time: string;
  unread?: number;
  isTyping?: boolean;
  readStatus?: string;
  active: boolean;
  onClick: () => void;
}

function ConversationItem({ name, message, time, unread, isTyping, readStatus, active, onClick }: ConversationItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
        active ? 'bg-[#FDF8F5] border border-[#E50914]/10' : 'hover:bg-gray-50 border border-transparent'
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm overflow-hidden">
           {/* Placeholder Avatar */}
           {name.split(' ').map((n: string) => n[0]).join('').substring(0,2)}
        </div>
        {isTyping && (
           <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h4 className={`text-sm truncate ${active ? 'font-bold text-black' : 'font-semibold text-gray-800'}`}>
            {name}
          </h4>
          <span className={`text-[10px] ${unread ? 'font-bold text-[#E50914]' : 'text-gray-400'}`}>
            {time}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className={`text-xs truncate max-w-[80%] ${isTyping ? 'text-[#2ECC71] font-medium' : unread ? 'text-black font-semibold' : 'text-gray-500'}`}>
            {message}
          </p>
          
          {unread && (
            <div className="w-5 h-5 rounded-full bg-[#E50914] text-white flex items-center justify-center text-[10px] font-bold">
              {unread}
            </div>
          )}
          
          {readStatus === 'read' && (
             <CheckCheck size={14} className="text-[#E50914]" />
          )}
          {readStatus === 'delivered' && (
             <CheckCheck size={14} className="text-gray-300" />
          )}
        </div>
      </div>
    </div>
  )
}

interface MessageBubbleProps {
  sender: string;
  text: string;
  time: string;
  avatar: string;
  color?: string;
}

function MessageBubble({ sender, text, time, avatar, color }: MessageBubbleProps) {
  return (
    <div className="flex items-end gap-3 max-w-[80%]">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${color || 'bg-gray-200 text-gray-700'}`}>
        {avatar}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2 ml-1">
          <span className={`text-xs font-bold ${color ? color.split(' ')[1] : 'text-gray-700'}`}>{sender}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
        </div>
        <span className="text-[10px] text-gray-400 font-medium ml-1">{time}</span>
      </div>
    </div>
  )
}
