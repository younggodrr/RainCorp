'use client';

import React, { useState } from 'react';
import { 
  X, Search, MessageSquare, User, ChevronRight
} from 'lucide-react';

// --- TYPES ---

interface Friend {
  id: string;
  name: string;
  avatarColor: string; // Tailwind class
  initials: string;
  isOnline?: boolean;
  status?: string;
}

interface StartChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (friendId: string) => void;
  existingFriends?: Friend[]; // In a real app, this would come from a prop or context
}

// --- MOCK FRIENDS DATA (If not provided) ---
const MOCK_FRIENDS: Friend[] = [
  { id: 'f1', name: 'Sarah Chen', avatarColor: 'bg-pink-100 text-pink-600', initials: 'SC', isOnline: true, status: 'Coding a new feature' },
  { id: 'f2', name: 'Mike Johnson', avatarColor: 'bg-blue-100 text-blue-600', initials: 'MJ', status: 'In a meeting' },
  { id: 'f3', name: 'Jessica Lee', avatarColor: 'bg-purple-100 text-purple-600', initials: 'JL', isOnline: true, status: 'Available' },
  { id: 'f4', name: 'David Kim', avatarColor: 'bg-green-100 text-green-600', initials: 'DK', status: 'Debugging...' },
  { id: 'f5', name: 'Alex Thompson', avatarColor: 'bg-orange-100 text-orange-600', initials: 'AT', isOnline: true, status: 'Coffee time ☕' },
  { id: 'f6', name: 'Emily Wilson', avatarColor: 'bg-yellow-100 text-yellow-600', initials: 'EW', status: 'Designing UI' },
  { id: 'f7', name: 'Ryan Garcia', avatarColor: 'bg-red-100 text-red-600', initials: 'RG', status: 'On vacation' },
  { id: 'f8', name: 'Olivia Martinez', avatarColor: 'bg-indigo-100 text-indigo-600', initials: 'OM', status: 'Working remotely' },
];

export default function StartChatModal({ 
  isOpen, 
  onClose, 
  onStartChat,
  existingFriends = MOCK_FRIENDS
}: StartChatModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // --- HANDLERS ---

  const handleSelectFriend = (id: string) => {
    onStartChat(id);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSearchQuery('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // --- RENDERERS ---

  const filteredFriends = existingFriends.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="bg-white md:rounded-3xl shadow-none md:shadow-2xl w-full md:max-w-md h-full md:h-auto md:max-h-[85vh] overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-lg text-black">Start New Chat</h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search friends..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E50914] text-sm"
                autoFocus
              />
            </div>
          </div>

          {/* Friends List */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="px-2 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Suggested</div>
            {filteredFriends.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <User size={48} className="mb-2 opacity-20" />
                <p>No friends found</p>
              </div>
            ) : (
              filteredFriends.map(friend => (
                <div 
                  key={friend.id}
                  onClick={() => handleSelectFriend(friend.id)}
                  className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full ${friend.avatarColor} flex items-center justify-center font-bold text-sm`}>
                        {friend.initials}
                      </div>
                      {friend.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800 group-hover:text-[#E50914] transition-colors">
                        {friend.name}
                      </span>
                      <span className="text-xs text-gray-400 truncate max-w-[150px]">
                        {friend.status || (friend.isOnline ? 'Online' : 'Offline')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-[#E50914] group-hover:text-white transition-all">
                    <MessageSquare size={16} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
