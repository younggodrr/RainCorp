'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Menu, X } from 'lucide-react';

interface TopNavigationProps {
  title: string;
  onMobileMenuOpen: () => void;
  className?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TopNavigation({ title, onMobileMenuOpen, className = '', searchPlaceholder = 'Search...', searchValue, onSearchChange }: TopNavigationProps) {
  return (
    <div className={`fixed top-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300 left-0 md:left-[88px] lg:left-[260px] ${className}`}>
      <div>
        <h1 className="text-xl font-bold text-black hidden md:block">{title}</h1>
        {/* Mobile Logo */}
        <Link href="/" className="flex items-center gap-2 md:hidden">
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
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            className="bg-gray-50 border border-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E50914] w-64 transition-all"
          />
        </div>

        {/* Small Search Bar (Mobile) */}
        <div className="flex md:hidden relative">
           <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
           <input 
             type="text" 
             placeholder="Search" 
             value={searchValue}
             onChange={onSearchChange}
             className="bg-gray-50 border border-gray-100 rounded-full pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#E50914] w-28 transition-all"
           />
        </div>

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
          onClick={onMobileMenuOpen}
        >
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
}
