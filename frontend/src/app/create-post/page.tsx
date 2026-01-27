"use client";

import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, Users, FolderKanban, MessageSquare, Briefcase, Settings, 
  Plus, Search, BookOpen, GraduationCap, BadgeCheck, ChevronLeft, 
  Image as ImageIcon, X, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <div className={`relative w-full flex items-center justify-center lg:justify-between px-2 lg:px-4 py-3 rounded-full transition-all text-sm font-medium cursor-pointer ${active ? 'bg-[#E50914] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="hidden lg:block">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans text-[#444444] flex">
      {/* SIDEBAR (Copied from Feed for consistency) */}
      <aside className="w-[88px] lg:w-[260px] bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col z-20 hidden md:flex transition-all duration-300 overflow-y-auto pb-10">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
            <div className="w-10 h-10 rounded-lg bg-black flex-shrink-0 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#E50914]">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight hidden lg:block">
              <span className="text-[#F4A261]">Magna</span>
              <span className="text-[#E50914]">Coders</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 p-0 lg:p-3 lg:bg-gray-50 rounded-xl mb-6 justify-center lg:justify-start">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0 hidden lg:block">
              <h3 className="text-sm font-bold text-black truncate">John Doe</h3>
              <p className="text-xs text-gray-500 truncate">Full Stack Dev</p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link href="/feed"><NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" /></Link>
            <Link href="/builders"><NavItem icon={<Users size={20} />} label="Members" /></Link>
            <Link href="/my-projects"><NavItem icon={<FolderKanban size={20} />} label="Projects" /></Link>
            <Link href="/messages"><NavItem icon={<MessageSquare size={20} />} label="Messages" /></Link>
            <Link href="/create-job"><NavItem icon={<Briefcase size={20} />} label="Opportunities" /></Link>
          </nav>
          
           {/* Quick Actions */}
          <div className="mt-6 hidden lg:block">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 px-2">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E50914] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Plus size={18} />
                Create Post
              </button>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="mt-6 mb-6 hidden lg:block">
            <div className="bg-gradient-to-br from-[#E50914]/5 to-[#F4A261]/10 rounded-xl p-4 border border-[#E50914]/10">
              <div className="flex items-center gap-3 mb-2">
                <BadgeCheck size={20} className="text-[#E50914]" />
                <h4 className="font-bold text-black text-sm">Get Verified</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Boost your credibility and unlock exclusive features.
              </p>
              <Link href="/get-verification" className="block w-full py-2 rounded-lg bg-[#E50914] text-white text-xs font-bold shadow-sm hover:bg-[#cc0812] transition-all text-center">
                Apply for Verification
              </Link>
            </div>
          </div>

          <nav className="space-y-1">
            <Link href="/settings" className="w-full block">
              <NavItem icon={<Settings size={20} />} label="Settings" />
            </Link>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 w-full md:ml-[88px] lg:ml-[260px] p-0 md:p-8 max-w-3xl mx-auto transition-all duration-300">
        
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between md:hidden">
           <button onClick={() => router.back()} className="text-gray-500">
             <ChevronLeft size={24} />
           </button>
           <h1 className="text-lg font-bold text-black">Create Post</h1>
           <button 
             onClick={handlePost}
             disabled={(!content.trim() && !selectedImage) || isSubmitting}
             className="text-[#E50914] font-bold text-sm disabled:opacity-50"
           >
             {isSubmitting ? 'Posting...' : 'Post'}
           </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center gap-4 mb-8 pt-8">
           <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
             <ChevronLeft size={24} />
           </button>
           <h1 className="text-2xl font-bold text-gray-800">Create Post</h1>
        </div>

        <div className="bg-white md:rounded-3xl shadow-sm border border-gray-100 min-h-[calc(100vh-60px)] md:min-h-[500px] flex flex-col">
          
          {/* User Info */}
          <div className="p-4 md:p-6 flex items-center gap-3 border-b border-gray-50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              JD
            </div>
            <div>
              <h3 className="font-bold text-black">John Doe</h3>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Public</span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex-1 p-4 md:p-6 flex flex-col">
            <textarea
              placeholder="What do you want to talk about?"
              className="w-full flex-1 resize-none text-lg placeholder-gray-400 focus:outline-none min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {/* Image Preview */}
            {selectedImage && (
              <div className="relative mt-4 rounded-xl overflow-hidden group max-h-[400px]">
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all backdrop-blur-sm"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 md:p-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 rounded-full hover:bg-gray-50 text-[#E50914] transition-colors flex items-center gap-2"
                >
                  <ImageIcon size={24} />
                  <span className="font-medium text-sm hidden sm:inline">Add Photo</span>
                </button>
              </div>

              {/* Desktop Post Button */}
              <button 
                onClick={handlePost}
                disabled={(!content.trim() && !selectedImage) || isSubmitting}
                className="hidden md:flex items-center gap-2 px-8 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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