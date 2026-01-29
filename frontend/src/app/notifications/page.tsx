"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, Users, MessageSquare, Settings, 
  Bell, Heart, UserPlus, Briefcase, Info, X,
  ChevronLeft, Menu
} from 'lucide-react';

// Mock Notification Data
type NotificationType = 'like' | 'comment' | 'connection_request' | 'connection_accepted' | 'project_invite' | 'project_application' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  actor: {
    name: string;
    avatar: string | null;
    initials: string;
  };
  content: string;
  target?: string; // "your post", "your project", etc.
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'connection_request',
    actor: { name: 'Sarah Chen', avatar: null, initials: 'SC' },
    content: 'sent you a connection request',
    timestamp: '2 mins ago',
    read: false,
    actionRequired: true
  },
  {
    id: 2,
    type: 'like',
    actor: { name: 'David Miller', avatar: null, initials: 'DM' },
    content: 'liked your post',
    target: '"Building a scalable architecture with Next.js..."',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 3,
    type: 'project_invite',
    actor: { name: 'Alex Thompson', avatar: null, initials: 'AT' },
    content: 'invited you to join',
    target: 'AI Image Generator Project',
    timestamp: '3 hours ago',
    read: true,
    actionRequired: true
  },
  {
    id: 4,
    type: 'comment',
    actor: { name: 'Maria Garcia', avatar: null, initials: 'MG' },
    content: 'commented on your post',
    target: '"Great insights on the new features!"',
    timestamp: '5 hours ago',
    read: true
  },
  {
    id: 5,
    type: 'system',
    actor: { name: 'Magna Team', avatar: null, initials: 'MT' },
    content: 'Welcome to Magna Coders! Complete your profile to get started.',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: 6,
    type: 'connection_accepted',
    actor: { name: 'James Wilson', avatar: null, initials: 'JW' },
    content: 'accepted your connection request',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: 7,
    type: 'project_application',
    actor: { name: 'Lisa Wang', avatar: null, initials: 'LW' },
    content: 'applied to your project',
    target: 'E-commerce Platform',
    timestamp: '2 days ago',
    read: true,
    actionRequired: true
  }
];

export default function NotificationsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'requests'>('all');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'requests') return n.actionRequired;
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'like': return <Heart size={16} className="text-[#E50914] fill-[#E50914]" />;
      case 'comment': return <MessageSquare size={16} className="text-[#F4A261]" />;
      case 'connection_request': 
      case 'connection_accepted': return <UserPlus size={16} className="text-[#0077b5]" />;
      case 'project_invite':
      case 'project_application': return <Briefcase size={16} className="text-[#25D366]" />;
      case 'system': return <Info size={16} className="text-gray-500" />;
      default: return <Bell size={16} className="text-gray-500" />;
    }
  };

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

          <Link href="/notifications" className="p-3 rounded-xl text-[#E50914] bg-red-50 relative group">
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
        
        {/* TOP NAVIGATION BAR */}
        <div className="fixed top-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300 left-0 md:left-[80px]">
          <div>
            <h1 className="text-xl font-bold text-black hidden md:block">Notifications</h1>
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

          <div className="flex items-center gap-4">
             {/* Action Button (Desktop & Mobile) */}
             <button 
               onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
               className="text-xs font-medium text-[#E50914] hover:text-[#cc0812] px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors whitespace-nowrap"
             >
               Mark all as read
             </button>

            {/* Notification Icon (Hidden on this page as we are on it, or could be kept for consistency) */}
            <Link href="/notifications" className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors hidden md:block">
              <Bell size={24} className="text-[#E50914] fill-[#E50914]" /> {/* Active state */}
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

        {/* FILTERS */}
        <div className="px-4 py-3 bg-white border-b border-gray-50 flex gap-2 overflow-x-auto">
          {(['all', 'unread', 'requests'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all whitespace-nowrap ${
                filter === f 
                  ? 'bg-[#E50914] text-white shadow-sm' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* NOTIFICATION LIST */}
        <div className="flex-1 max-w-3xl mx-auto w-full p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Bell size={48} className="mb-4 opacity-20" />
              <p>No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                onClick={() => markAsRead(notification.id)}
                className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-md cursor-pointer ${
                  notification.read ? 'bg-white border-gray-100' : 'bg-red-50/30 border-red-100'
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {notification.actor.initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                    {getIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">{notification.actor.name}</span>{' '}
                      <span className="text-gray-600">{notification.content}</span>{' '}
                      {notification.target && <span className="font-medium text-gray-900">{notification.target}</span>}
                    </p>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">{notification.timestamp}</span>
                  </div>

                  {/* Action Buttons (for Requests) */}
                  {notification.actionRequired && (
                    <div className="flex gap-2 mt-3">
                      <button className="px-4 py-1.5 rounded-lg bg-[#E50914] text-white text-xs font-bold hover:bg-[#cc0812] transition-colors shadow-sm">
                        Accept
                      </button>
                      <button className="px-4 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors">
                        Decline
                      </button>
                    </div>
                  )}
                </div>

                {/* Unread Indicator */}
                {!notification.read && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#E50914]" />
                )}
                
                {/* Delete Button (visible on hover) */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full text-gray-300 hover:bg-gray-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
