"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FolderKanban, MessageSquare, Briefcase, Settings, 
  Plus, BadgeCheck, 
  Image as ImageIcon, X, Loader2,
  Globe, ChevronDown, Smile, Hash, Calendar, 
  BarChart2, Paperclip, Video
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TopNavigation from '../../components/TopNavigation';
import LeftPanel from '../../components/LeftPanel';

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacy, setPrivacy] = useState('Public');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!content.trim() && !selectedImage) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/feed');
    }, 1500);
  };

  return (
    <div className={`min-h-screen font-sans flex transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      <TopNavigation 
        title="Create Post"
        showBack={true}
        hideBackOnMobile={true}
        showSearch={false}
        onMobileMenuOpen={() => {}}
        isDarkMode={isDarkMode}
        customAction={
          <button 
            onClick={handlePost}
            disabled={(!content.trim() && !selectedImage) || isSubmitting}
            className="text-[#E50914] font-bold text-sm disabled:opacity-50 md:hidden"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        }
      />
      
      {/* LEFT SIDEBAR */}
      <LeftPanel 
        activeTab="Create Post"
        setActiveTab={() => {}}
        isSidebarExpanded={true}
        setIsSidebarExpanded={() => {}}
        isDarkMode={isDarkMode}
        toggleTheme={() => {}} // CreatePost handles theme internally via localStorage listener, but toggle could be wired up if needed
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 w-full md:ml-[88px] lg:ml-[260px] p-0 md:p-8 pt-20 md:pt-24 max-w-3xl mx-auto transition-all duration-300">

        <div className={`md:rounded-3xl shadow-sm border min-h-[calc(100vh-60px)] md:min-h-[500px] flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
          
          {/* User Info & Privacy */}
          <div className="p-4 md:p-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              JD
            </div>
            <div>
              <h3 className={`font-bold text-sm ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>John Doe</h3>
              <button 
                className={`flex items-center gap-1.5 mt-0.5 text-xs font-medium transition-colors px-2 py-1 rounded-full ${isDarkMode ? 'bg-[#222] text-gray-400 hover:text-white hover:bg-[#333]' : 'text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setPrivacy(privacy === 'Public' ? 'Connections' : 'Public')}
              >
                {privacy === 'Public' ? <Globe size={12} /> : <Users size={12} />}
                {privacy}
                <ChevronDown size={12} />
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div 
            className={`flex-1 p-4 md:p-6 flex flex-col transition-colors ${isDragOver ? 'bg-[#E50914]/5' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <textarea
              ref={textareaRef}
              placeholder="What do you want to talk about?"
              className={`w-full flex-1 resize-none text-xl focus:outline-none min-h-[150px] bg-transparent leading-relaxed ${isDarkMode ? 'text-[#F9E4AD] placeholder-gray-600' : 'text-[#444444] placeholder-gray-400'}`}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                adjustTextareaHeight();
              }}
            />

            {/* Image Preview */}
            {selectedImage && (
              <div className="relative mt-4 rounded-xl overflow-hidden group">
                <Image 
                  src={selectedImage} 
                  alt="Preview" 
                  width={600} 
                  height={400} 
                  className="w-full h-auto max-h-[500px] object-cover rounded-xl border border-gray-100" 
                />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition-all backdrop-blur-sm"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            
            {/* Drag & Drop Hint */}
            {isDragOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm border-2 border-dashed border-[#E50914] rounded-3xl m-4 z-10 pointer-events-none">
                <div className="text-center">
                  <ImageIcon size={48} className="mx-auto text-[#E50914] mb-2" />
                  <p className="text-[#E50914] font-bold">Drop image here</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Toolbar */}
          <div className="p-4 md:p-6 pt-2">
             <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#E50914] hover:bg-[#E50914]/20' : 'text-[#E50914] hover:bg-[#E50914]/10'}`} title="Add Image" onClick={() => fileInputRef.current?.click()}>
                  <ImageIcon size={22} />
                </button>
                <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Add Video">
                  <Video size={22} />
                </button>
                <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Create Poll">
                  <BarChart2 size={22} />
                </button>
                <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Add Document">
                  <Paperclip size={22} />
                </button>
                <div className={`w-px h-6 mx-1 ${isDarkMode ? 'bg-[#333]' : 'bg-gray-200'}`}></div>
                <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Add Hashtag">
                  <Hash size={22} />
                </button>
                <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Emoji">
                  <Smile size={22} />
                </button>
                <button className={`p-2 rounded-full transition-colors ml-auto ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Schedule">
                  <Calendar size={22} />
                </button>
             </div>

            <div className={`flex items-center justify-between border-t pt-4 ${isDarkMode ? 'border-[#333]' : 'border-gray-100'}`}>
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                />
                <span className={`text-xs font-medium transition-colors ${content.length > 280 ? 'text-red-500' : 'text-gray-400'}`}>
                  {content.length}/3000
                </span>
              </div>

              {/* Desktop Post Button */}
              <button 
                onClick={handlePost}
                disabled={(!content.trim() && !selectedImage) || isSubmitting}
                className="hidden md:flex items-center gap-2 px-8 py-2.5 rounded-full bg-[#E50914] text-white font-bold hover:bg-[#cc0812] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
