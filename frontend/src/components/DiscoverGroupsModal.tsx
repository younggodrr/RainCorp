'use client';

import React, { useState } from 'react';
import { 
  X, Search, Users, Coins, ArrowRight, CheckCircle, Info
} from 'lucide-react';
import GroupDetailsModal from './GroupDetailsModal';

// --- TYPES ---

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  avatarColor: string; // Tailwind class
  accessType: 'request' | 'paid';
  cost?: number; // In Magna Coin
  isJoined?: boolean;
  // Extended mock data
  dateCreated: string;
  messagesPerDay: number;
  activeMembers: number;
  adminName: string;
}

interface DiscoverGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinGroup: (groupId: string, type: 'request' | 'paid', cost?: number) => void;
}

// --- MOCK GROUPS DATA ---
const MOCK_GROUPS: Group[] = [
  { 
    id: 'g1', 
    name: 'Frontend Masters', 
    description: 'Advanced React, Next.js patterns and UI/UX discussions.', 
    memberCount: 1240, 
    avatarColor: 'bg-blue-100 text-blue-600', 
    accessType: 'request' 
  },
  { 
    id: 'g2', 
    name: 'Crypto Insiders', 
    description: 'Exclusive trading signals and market analysis.', 
    memberCount: 56, 
    avatarColor: 'bg-yellow-100 text-yellow-600', 
    accessType: 'paid',
    cost: 50
  },
  { 
    id: 'g3', 
    name: 'Design Systems', 
    description: 'Building scalable design systems with Figma and code.', 
    memberCount: 890, 
    avatarColor: 'bg-pink-100 text-pink-600', 
    accessType: 'request' 
  },
  { 
    id: 'g4', 
    name: 'AI Researchers', 
    description: 'Deep learning papers discussion and implementation.', 
    memberCount: 230, 
    avatarColor: 'bg-purple-100 text-purple-600', 
    accessType: 'paid',
    cost: 100
  },
  { 
    id: 'g5', 
    name: 'Startup Founders', 
    description: 'Networking for early stage founders.', 
    memberCount: 410, 
    avatarColor: 'bg-green-100 text-green-600', 
    accessType: 'request' 
  },
];

export default function DiscoverGroupsModal({ 
  isOpen, 
  onClose, 
  onJoinGroup
}: DiscoverGroupsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // --- RENDERERS ---

  const filteredGroups = MOCK_GROUPS.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white md:rounded-3xl shadow-none md:shadow-2xl w-full md:max-w-md h-full md:h-auto md:max-h-[85vh] overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-lg text-black">Discover Groups</h2>
          </div>
          <button 
            onClick={onClose}
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
                placeholder="Search groups..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E50914] text-sm"
              />
            </div>
          </div>

          {/* Groups List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredGroups.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <Users size={48} className="mb-2 opacity-20" />
                <p>No groups found</p>
              </div>
            ) : (
              filteredGroups.map(group => (
                <div 
                  key={group.id}
                  className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${group.avatarColor} flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                      {group.name.substring(0, 2).toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-black truncate pr-2">{group.name}</h3>
                        <span className="text-xs text-gray-400 font-medium whitespace-nowrap flex items-center gap-1">
                          <Users size={12} />
                          {group.memberCount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{group.description}</p>
                      
                      <button 
                        onClick={() => onJoinGroup(group.id, group.accessType, group.cost)}
                        className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                          group.accessType === 'paid' 
                            ? 'bg-[#F4A261]/10 text-[#F4A261] hover:bg-[#F4A261]/20' 
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                      >
                        {group.accessType === 'paid' ? (
                          <>
                            <span>Join for {group.cost}</span>
                            <Coins size={14} />
                          </>
                        ) : (
                          <>
                            <span>Request to Join</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
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
