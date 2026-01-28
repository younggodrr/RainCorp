'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Users,
  Settings, 
  Plus, 
  Search, 
  BookOpen, 
  FolderKanban,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  ChevronRight,
  ChevronLeft,
  Bot,
  Zap,
  Bug,
  Globe,
  Sparkles,
  ArrowRight,
  Send,
  Paperclip,
  Image as ImageIcon,
  Mic,
  History,
  PanelLeftClose,
  PanelLeftOpen,
  MoreVertical,
  Edit,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import TopNavigation from '@/components/TopNavigation';
import MagnaNewIcon from '@/components/MagnaNewIcon';

interface MessageBubbleProps {
  sender: string;
  text: string;
  time: string;
  avatar: string;
  color?: string;
  isMe?: boolean;
}

function MessageBubble({ sender, text, time, avatar, color, isMe = false }: MessageBubbleProps) {
  if (isMe) {
    return (
      <div className="flex flex-col items-end max-w-[80%] ml-auto">
        <div className="bg-[#E50914] text-white p-4 rounded-2xl rounded-tr-none shadow-md">
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
        <div className="flex items-center gap-1 mt-1 mr-1">
          <span className="text-[10px] text-gray-400 font-medium">{time}</span>
        </div>
      </div>
    );
  }

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
  );
}

export default function MagnaAIPage() {
  const [activeTab, setActiveTab] = useState('Magna AI');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const mobileInputRef = useRef<HTMLTextAreaElement>(null);
  const desktopInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    [mobileInputRef, desktopInputRef].forEach(ref => {
      if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${Math.min(ref.current.scrollHeight, 80)}px`;
      }
    });
  }, [searchQuery]);

  const handleChatSelect = (chatName: string) => {
    setSelectedChat(chatName);
    setIsHistoryOpen(false); // Close history on mobile when chat selected
  };

  return (
    <div className="h-[100dvh] bg-[#FDF8F5] font-sans text-[#444444] flex overflow-hidden">
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 w-full transition-all duration-300 relative h-full flex overflow-hidden">
        
        {/* MOBILE BACKDROP */}
        {isHistoryOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsHistoryOpen(false)}
          />
        )}

        {/* HISTORY PANEL (Retractable) */}
        <div className={`bg-[#F9F9F9] border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden h-full fixed md:relative z-30 md:z-auto ${isHistoryOpen ? 'w-[260px]' : 'w-0 md:w-[72px]'}`}>
           <div className={`p-4 flex items-center ${isHistoryOpen ? 'justify-between' : 'flex-col gap-4'}`}>
              <button 
                className={`flex items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-lg transition-colors ${isHistoryOpen ? 'flex-1 px-3 py-2' : 'p-2 justify-center w-full'}`}
                title="New Chat"
              >
                 <Plus size={20} />
                 {isHistoryOpen && <span>New Chat</span>}
              </button>
              <button 
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
                title={isHistoryOpen ? "Collapse" : "Expand"}
              >
                 {isHistoryOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
              </button>
           </div>

           <div className={`flex-1 overflow-y-auto py-2 space-y-6 ${isHistoryOpen ? 'px-2' : 'px-2 scrollbar-hide'}`}>
              {isHistoryOpen ? (
                <>
                  {/* Today */}
                  <div>
                     <h4 className="px-2 text-xs font-bold text-gray-400 uppercase mb-2">Today</h4>
                     <div className="space-y-1">
                        <button 
                          onClick={() => handleChatSelect('React Component optimization')}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 text-sm text-gray-700 truncate transition-colors"
                        >
                           React Component optimization
                        </button>
                        <button 
                          onClick={() => handleChatSelect('Debug API Integration')}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 text-sm text-gray-700 truncate transition-colors"
                        >
                           Debug API Integration
                        </button>
                     </div>
                  </div>

                  {/* Yesterday */}
                  <div>
                     <h4 className="px-2 text-xs font-bold text-gray-400 uppercase mb-2">Yesterday</h4>
                     <div className="space-y-1">
                        <button 
                          onClick={() => handleChatSelect('Project Architecture Planning')}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 text-sm text-gray-700 truncate transition-colors"
                        >
                           Project Architecture Planning
                        </button>
                        <button 
                          onClick={() => handleChatSelect('Tailwind CSS Grid Layout')}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 text-sm text-gray-700 truncate transition-colors"
                        >
                           Tailwind CSS Grid Layout
                        </button>
                        <button 
                          onClick={() => handleChatSelect('Next.js App Router')}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 text-sm text-gray-700 truncate transition-colors"
                        >
                           Next.js App Router
                        </button>
                     </div>
                  </div>

                  {/* Previous 7 Days */}
                  <div>
                     <h4 className="px-2 text-xs font-bold text-gray-400 uppercase mb-2">Previous 7 Days</h4>
                     <div className="space-y-1">
                        <button 
                          onClick={() => handleChatSelect('Authentication Flow')}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 text-sm text-gray-700 truncate transition-colors"
                        >
                           Authentication Flow
                        </button>
                        <button 
                          onClick={() => handleChatSelect('Database Schema Design')}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 text-sm text-gray-700 truncate transition-colors"
                        >
                           Database Schema Design
                        </button>
                     </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 pt-2 opacity-50">
                   {/* Icons only for collapsed state - simplified visualization of history */}
                   <div className="w-8 h-1 rounded-full bg-gray-300"></div>
                   <div className="w-8 h-1 rounded-full bg-gray-300"></div>
                   <div className="w-8 h-1 rounded-full bg-gray-300"></div>
                </div>
              )}
           </div>

           <div className={`p-4 border-t border-gray-200 ${!isHistoryOpen && 'flex justify-center'}`}>
              <button className={`flex items-center gap-3 rounded-lg hover:bg-gray-200 text-sm text-gray-700 transition-colors ${isHistoryOpen ? 'w-full px-3 py-2' : 'p-2'}`}>
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    JD
                 </div>
                 {isHistoryOpen && (
                   <>
                     <div className="flex-1 text-left">
                        <p className="font-semibold text-xs">John Doe</p>
                        <p className="text-[10px] text-gray-500">Pro Plan</p>
                     </div>
                     <Settings size={16} className="text-gray-400" />
                   </>
                 )}
              </button>
           </div>
        </div>

        {/* CHAT INTERFACE CONTAINER */}
        <div className="flex-1 flex flex-col relative h-full">
        
        {/* CUSTOM TOP BAR (Mobile & Desktop) */}
        {!selectedChat && (
          <div className="absolute top-0 left-0 right-0 z-20">
            <TopNavigation 
              title="Magna AI" 
              onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
              className="!relative !left-0 !right-0 !top-0 bg-transparent border-none"
            />
          </div>
        )}

        {/* AI INTERFACE CONTENT */}
        <div className="flex-1 flex flex-col h-full relative">
          
          {selectedChat ? (
            /* ACTIVE CHAT VIEW */
            <div className="flex-1 flex flex-col h-full">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10 pt-4">
                 <div className="flex items-center gap-3">
                   <button 
                     onClick={() => setSelectedChat(null)}
                     className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full"
                   >
                     <ChevronLeft size={24} />
                   </button>
                   <div>
                     <h2 className="font-bold text-lg">{selectedChat}</h2>
                     <p className="text-xs text-green-500 font-medium">Online</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                     <Search size={20} />
                   </button>
                   <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                     <MoreVertical size={20} />
                   </button>
                 </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-6 pb-32">
                 <div className="flex justify-center my-4">
                   <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">Today</span>
                 </div>
                 
                 <MessageBubble 
                   sender="Magna AI"
                   text={`Hello! I see you're interested in ${selectedChat}. How can I help you with that today?`}
                   time="10:00 AM"
                   avatar="AI"
                   color="bg-red-100 text-red-800"
                 />

                 <MessageBubble 
                   sender="John Doe"
                   text="I need some help optimization my components."
                   time="10:02 AM"
                   avatar="JD"
                   isMe={true}
                 />

                 <MessageBubble 
                   sender="Magna AI"
                   text="Sure! Please share the code snippet you're working on."
                   time="10:03 AM"
                   avatar="AI"
                   color="bg-red-100 text-red-800"
                 />
              </div>
            </div>
          ) : (
            /* DEFAULT GREETING VIEW */
            <div className="flex-1 overflow-y-auto px-6 md:px-8 pt-48 md:pt-24 pb-40 md:pb-8 flex flex-col items-start justify-start w-full max-w-4xl mx-auto gap-8">
              {/* Greeting */}
              <div className="w-full text-left">
                <button 
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className="mb-6 p-2 -ml-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors md:hidden"
                >
                   <PanelLeftOpen size={24} />
                </button>
                <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 text-[#E50914] flex items-center gap-2">
                  <MagnaNewIcon className="w-8 h-8" />
                  <span className="font-bold">Hi John</span>
                </h1>
                <p className="text-2xl md:text-4xl font-medium text-[#E50914] leading-snug break-words max-w-full">
                  I help you solve technical problems, design systems, write code, and turn ideas into working software — fast.
                </p>
            </div>

            {/* Desktop Input Area */}
            <div className="hidden md:block w-full">
               <div className="relative flex items-end bg-[#F0F4F9] rounded-[28px] px-4 py-2 shadow-sm border border-transparent hover:border-gray-200 transition-colors">
                  <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors mr-2 flex-shrink-0 mb-1">
                     <Plus size={24} />
                  </button>
                  <textarea 
                    ref={desktopInputRef}
                    placeholder="Ask Magna AI" 
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 text-base placeholder-gray-500 min-w-0 resize-none py-3 max-h-[120px] overflow-y-auto"
                    rows={1}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="flex items-center gap-2 flex-shrink-0 mb-1">
                     <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                        <ImageIcon size={20} />
                     </button>
                     <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                        <Mic size={20} />
                     </button>
                     <button className="p-2 rounded-full bg-[#E50914] text-white hover:bg-[#b80710] transition-colors">
                        <Send size={18} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Services Section */}
              <div className="w-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-3 md:gap-4">
                    {/* Job Opportunities */}
                    <button className="flex items-center gap-3 px-5 py-4 bg-[#F0F4F9] rounded-2xl hover:bg-[#E3E3E3] transition-colors w-fit md:w-auto min-h-[56px] shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 flex-shrink-0">
                        <Briefcase size={18} />
                      </div>
                      <span className="font-medium text-gray-700 text-sm">Job Opportunities</span>
                    </button>

                    {/* Search Builders & Collabs */}
                    <button className="flex items-center gap-3 px-5 py-4 bg-[#F0F4F9] rounded-2xl hover:bg-[#E3E3E3] transition-colors w-fit md:w-auto min-h-[56px] shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 flex-shrink-0">
                        <Users size={18} />
                      </div>
                      <span className="font-medium text-gray-700 text-sm">Search Builders & Collabs</span>
                    </button>

                    {/* Debug Code */}
                    <button className="flex items-center gap-3 px-5 py-4 bg-[#F0F4F9] rounded-2xl hover:bg-[#E3E3E3] transition-colors w-fit md:w-auto min-h-[56px] shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 flex-shrink-0">
                        <Bug size={18} />
                      </div>
                      <span className="font-medium text-gray-700 text-sm">Debug Code</span>
                    </button>
                  </div>
              </div>
            </div>
          )}

          {/* Fixed Bottom Input Area */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FDF8F5] md:bg-transparent z-50 pb-[env(safe-area-inset-bottom,16px)] md:hidden">
            <div className="max-w-4xl mx-auto w-full">
               <div className="relative flex items-end bg-[#F0F4F9] rounded-[28px] px-4 py-2 shadow-sm">
                  <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors mr-2 flex-shrink-0 mb-1">
                     <Plus size={24} />
                  </button>
                  <textarea 
                    ref={mobileInputRef}
                    placeholder="Ask Magna AI" 
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 text-base placeholder-gray-500 min-w-0 resize-none py-3 max-h-[80px] overflow-y-auto"
                    rows={1}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="flex items-center gap-2 flex-shrink-0 mb-1">
                     <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                        <ImageIcon size={20} />
                     </button>
                     <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                        <Mic size={20} />
                     </button>
                     <button className="p-2 rounded-full bg-[#E50914] text-white hover:bg-[#b80710] transition-colors">
                        <Send size={18} />
                     </button>
                  </div>
               </div>
            </div>
          </div>


        </div>
        </div>
      </main>
    </div>
  );
}