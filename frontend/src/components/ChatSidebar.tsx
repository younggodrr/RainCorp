import React from 'react';
import { Edit, MoreVertical, Users } from 'lucide-react';

interface ChatSidebarProps {
  isDarkMode: boolean;
  filter: 'chats' | 'groups' | 'unread' | 'archived';
  setFilter: (filter: 'chats' | 'groups' | 'unread' | 'archived') => void;
  onOpenDiscoverGroups: () => void;
  children: React.ReactNode;
}

export default function ChatSidebar({ isDarkMode, filter, setFilter, onOpenDiscoverGroups, children }: ChatSidebarProps) {
  return (
    <div className={`w-full md:w-[320px] lg:w-[380px] border-r flex flex-col h-full ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
      {/* Header */}
      <div className="p-4 md:p-6 pb-2">
        <div className="flex md:flex items-center justify-between mb-4">
            <h2 className={`font-bold text-xl md:block hidden ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Chats</h2>
            <h2 className={`font-bold text-xl md:hidden ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Messages</h2>
            <div className="flex gap-2">
              <button className={`p-2 rounded-full transition-colors hidden md:block ${isDarkMode ? 'hover:bg-[#222] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <Edit size={20} />
              </button>
              <button className={`p-2 rounded-full transition-colors hidden md:block ${isDarkMode ? 'hover:bg-[#222] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <MoreVertical size={20} />
              </button>
            </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
          {['Chats', 'My Groups', 'Unread', 'Archived'].map((item) => (
            <button
              key={item}
              onClick={() => {
              if (item === 'My Groups') {
                setFilter('groups');
              } else {
                const val = item.toLowerCase();
                if (val === 'chats' || val === 'groups' || val === 'unread' || val === 'archived') {
                  setFilter(val);
                }
              }
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              (filter === 'groups' && item === 'My Groups') || filter === item.toLowerCase()
                  ? 'bg-black text-white shadow-md' 
                  : isDarkMode ? 'bg-[#222] border border-gray-700 text-gray-400 hover:bg-[#333]' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={onOpenDiscoverGroups}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${isDarkMode ? 'bg-[#222] border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white' : 'bg-white border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white'}`}
          >
            <Users size={12} />
            Discover Groups
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 md:pb-4 space-y-1">
        {children}
      </div>
    </div>
  );
}
