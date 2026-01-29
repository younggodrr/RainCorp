'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Search, MessageSquare, User } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  if (!pathname) return null;

  // Do not show on auth pages or specific routes
  if (['/login', '/create-account', '/new-login-2'].includes(pathname)) {
    return null;
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/feed',
      icon: LayoutDashboard,
    },
    {
      label: 'Search Builders',
      href: '/builders',
      icon: Search,
    },
    {
      label: 'Chats',
      href: '/messages',
      icon: MessageSquare,
    },
    {
      label: 'Profile',
      href: '/user-profile',
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 flex justify-between items-center pb-5 pt-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/feed' && pathname.startsWith(item.href));
        
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            className="flex flex-col items-center gap-1 transition-colors text-black"
          >
            <item.icon size={24} color="black" strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-medium text-black ${isActive ? 'font-bold' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
