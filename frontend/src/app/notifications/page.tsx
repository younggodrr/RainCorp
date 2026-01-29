"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Bell, 
  MessageSquare, 
  Heart, 
  UserPlus, 
  Briefcase, 
  Info, 
  X,
  Menu,
  Check,
  FolderKanban,
  Users,
  Trash2
} from 'lucide-react';
import TopNavigation from '@/components/TopNavigation';
import LeftPanel from '@/components/LeftPanel';
import { MOCK_NOTIFICATIONS, Notification, NotificationType } from './data';

export default function NotificationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Notifications');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filter, setFilter] = useState<'all' | 'job_opportunities' | 'projects'>('all');
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

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

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'job_opportunities') {
      return n.type === 'job_request' || n.type === 'job_approved';
    }
    if (filter === 'projects') {
      return n.type === 'project_request' || n.type === 'project_approved' || n.type === 'project_invite' || n.type === 'project_application';
    }
    return true;
  });

  const requestsCount = filteredNotifications.filter(n => n.actionRequired && n.requestStatus === 'pending').length;

  const hasUnread = (type: 'all' | 'job_opportunities' | 'projects') => {
    if (type === 'all') return notifications.some(n => !n.read);
    if (type === 'job_opportunities') {
      return notifications.some(n => !n.read && (n.type === 'job_request' || n.type === 'job_approved'));
    }
    if (type === 'projects') {
      return notifications.some(n => !n.read && (n.type === 'project_request' || n.type === 'project_approved' || n.type === 'project_invite' || n.type === 'project_application'));
    }
    return false;
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAccept = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const notification = notifications.find(n => n.id === id);
    
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return {
          ...n,
          read: true,
          actionRequired: false,
          requestStatus: 'accepted',
          content: 'You accepted the request'
        };
      }
      return n;
    }));

    // Redirect to messages if it's a job request
    if (notification && notification.type === 'job_request') {
      const params = new URLSearchParams();
      params.set('action', 'start_chat');
      params.set('name', notification.actor.name);
      params.set('initials', notification.actor.initials);
      router.push(`/messages?${params.toString()}`);
    }
  };

  const handleDecline = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return {
          ...n,
          read: true,
          actionRequired: false,
          requestStatus: 'declined',
          content: 'You declined the request'
        };
      }
      return n;
    }));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'like': return <Heart size={16} className="text-[#E50914] fill-[#E50914]" />;
      case 'comment': return <MessageSquare size={16} className="text-[#F4A261]" />;
      case 'connection_request': 
      case 'connection_accepted': return <UserPlus size={16} className="text-[#0077b5]" />;
      case 'project_invite':
      case 'project_application': 
      case 'project_request':
      case 'project_approved':
        return <FolderKanban size={16} className="text-[#F4A261]" />;
      case 'job_request':
      case 'job_approved':
        return <Briefcase size={16} className="text-[#25D366]" />;
      case 'system': return <Info size={16} className="text-gray-500" />;
      default: return <Bell size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className={`h-screen font-sans flex overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      
      {/* LEFT SIDEBAR */}
      <LeftPanel 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden relative md:ml-[88px] ${isSidebarExpanded ? 'lg:ml-[260px]' : 'lg:ml-[88px]'} transition-all duration-300`}>
        
        {/* TOP NAVIGATION BAR */}
        <TopNavigation 
          title="Notifications" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          isDarkMode={isDarkMode}
        />

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            <div className={`absolute top-0 left-0 w-full h-full shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left ${
              isDarkMode ? 'bg-black border-r border-[#E70008]/20' : 'bg-white'
            }`}>
              <div className={`p-4 border-b flex items-center justify-between sticky top-0 z-10 ${
                isDarkMode ? 'bg-black border-[#E70008]/20' : 'bg-white border-gray-100'
              }`}>
                <Link href="/" className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-[#E70008] flex items-center justify-center shadow-lg">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                   </div>
                   <span className="text-lg font-bold tracking-tight">
                      <span className="text-[#F4A261]">Magna</span>
                      <span className="text-[#E70008]">Coders</span>
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

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto pt-[65px] md:pt-[80px]">
          <div className="max-w-3xl mx-auto p-4 md:p-8 mb-20 md:mb-0">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-8">
              <button 
                 onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                 className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                   isDarkMode 
                     ? 'text-[#E50914] hover:bg-[#E50914]/10' 
                     : 'text-[#E50914] hover:bg-red-50'
                 }`}
               >
                 Mark all as read
               </button>
               
               <button 
                 onClick={clearAllNotifications}
                 className={`text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                   isDarkMode 
                     ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                     : 'text-gray-500 hover:text-black hover:bg-gray-100'
                 }`}
               >
                 <Trash2 size={16} />
                 Clear all
               </button>
            </div>

            {/* FILTERS */}
            <div className={`flex gap-4 overflow-x-auto mb-6 p-2 ${isDarkMode ? '' : ''}`}>
              <button
                onClick={() => setFilter('all')}
                className={`relative overflow-visible flex items-center gap-2 px-4 h-10 rounded-full text-xs font-bold transition-all shadow-sm border ${
                  filter === 'all' 
                    ? isDarkMode ? 'bg-white text-black border-white' : 'bg-white text-black border-gray-200 ring-1 ring-gray-200' 
                    : isDarkMode ? 'bg-[#222] text-gray-400 hover:bg-[#333] hover:text-white border-gray-700' : 'bg-gray-50 text-gray-500 hover:bg-white hover:text-black border-transparent hover:border-gray-200'
                }`}
              >
                All
                {hasUnread('all') && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 w-2.5 h-2.5 bg-[#E50914] rounded-full z-10"></span>
                )}
              </button>
              <button
                onClick={() => setFilter('job_opportunities')}
                className={`relative overflow-visible flex items-center gap-2 px-4 h-10 rounded-full text-xs font-bold transition-all shadow-sm border ${
                  filter === 'job_opportunities' 
                    ? isDarkMode ? 'bg-white text-black border-white' : 'bg-white text-black border-gray-200 ring-1 ring-gray-200' 
                    : isDarkMode ? 'bg-[#222] text-gray-400 hover:bg-[#333] hover:text-white border-gray-700' : 'bg-gray-50 text-gray-500 hover:bg-white hover:text-black border-transparent hover:border-gray-200'
                }`}
              >
                <Briefcase size={16} />
                <span>Jobs</span>
                {hasUnread('job_opportunities') && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 w-2.5 h-2.5 bg-[#E50914] rounded-full z-10"></span>
                )}
              </button>
              <button
                onClick={() => setFilter('projects')}
                className={`relative overflow-visible flex items-center gap-2 px-4 h-10 rounded-full text-xs font-bold transition-all shadow-sm border ${
                  filter === 'projects' 
                    ? isDarkMode ? 'bg-white text-black border-white' : 'bg-white text-black border-gray-200 ring-1 ring-gray-200' 
                    : isDarkMode ? 'bg-[#222] text-gray-400 hover:bg-[#333] hover:text-white border-gray-700' : 'bg-gray-50 text-gray-500 hover:bg-white hover:text-black border-transparent hover:border-gray-200'
                }`}
              >
                <FolderKanban size={16} />
                <span>Projects</span>
                {hasUnread('projects') && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 w-2.5 h-2.5 bg-[#E50914] rounded-full z-10"></span>
                )}
              </button>
            </div>

            {/* REQUESTS SUMMARY (Only for filtered views) */}
            {filter !== 'all' && (
              <div className={`mb-6 p-4 rounded-xl border ${isDarkMode ? 'bg-[#E50914]/10 border-[#E50914]/20' : 'bg-red-50 border-red-100'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E50914] flex items-center justify-center text-white">
                    <Users size={16} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {requestsCount} {filter === 'job_opportunities' ? 'Applicants' : 'Requests'} Pending
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {filter === 'job_opportunities' 
                        ? 'Total number of users requesting to join your job opportunities.' 
                        : 'Total number of users requesting to join your projects.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* NOTIFICATION LIST */}
            <div className="space-y-3">
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
                      notification.read 
                        ? isDarkMode ? 'bg-[#111] border-[#E70008]/20 hover:border-[#E50914]/40' : 'bg-white border-gray-100 hover:border-red-100'
                        : isDarkMode ? 'bg-[#E50914]/5 border-[#E50914]/20' : 'bg-red-50/40 border-red-100'
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {notification.actor.initials}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm border ${
                        isDarkMode ? 'bg-[#222] border-gray-800' : 'bg-white border-gray-100'
                      }`}>
                        {getIcon(notification.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="pr-8">
                          <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            <span className={`font-bold ${isDarkMode ? 'text-[#F4A261]' : 'text-black'}`}>{notification.actor.name}</span>{' '}
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{notification.content}</span>{' '}
                            {notification.target && <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{notification.target}</span>}
                          </p>
                          <span className={`text-xs mt-1 block ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{notification.timestamp}</span>
                        </div>
                      </div>

                      {/* Action Buttons (for Requests) */}
                      {notification.actionRequired && notification.requestStatus === 'pending' && (
                        <div className="flex gap-3 mt-4">
                          <button 
                            onClick={(e) => handleAccept(notification.id, e)}
                            className="px-5 py-2 rounded-xl bg-[#E50914] text-white text-xs font-bold hover:bg-[#cc0812] transition-colors shadow-md flex items-center gap-2"
                          >
                            <Check size={14} />
                            Accept
                          </button>
                          <button 
                            onClick={(e) => handleDecline(notification.id, e)}
                            className={`px-5 py-2 rounded-xl border text-xs font-bold transition-colors ${
                            isDarkMode 
                              ? 'border-gray-700 text-gray-300 hover:bg-[#222]' 
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}>
                            Decline
                          </button>
                        </div>
                      )}
                      
                      {/* Status Feedback */}
                      {notification.requestStatus === 'accepted' && (
                        <div className="mt-2 text-xs font-bold text-[#25D366] flex items-center gap-1">
                          <Check size={12} />
                          Request Accepted
                        </div>
                      )}
                      {notification.requestStatus === 'declined' && (
                        <div className="mt-2 text-xs font-bold text-gray-500 flex items-center gap-1">
                          <X size={12} />
                          Request Declined
                        </div>
                      )}
                    </div>

                    {/* Unread Indicator */}
                    {!notification.read && (
                      <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-[#E50914]" />
                    )}
                    
                    {/* Delete Button (visible on hover) */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className={`absolute top-4 right-4 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all ${
                        isDarkMode ? 'text-gray-500 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-300 hover:bg-gray-100 hover:text-[#E50914]'
                      }`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
