'use client';

import React from 'react';
import { 
  X, Users, Calendar, BarChart2, Coins, ArrowRight, ShieldCheck, Activity
} from 'lucide-react';

interface GroupDetails {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  avatarColor: string;
  accessType: 'request' | 'paid';
  cost?: number;
  dateCreated: string;
  messagesPerDay: number;
  activeMembers: number;
  adminName: string;
}

interface GroupDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: GroupDetails;
  onJoin: () => void;
}

export default function GroupDetailsModal({ 
  isOpen, 
  onClose, 
  group,
  onJoin
}: GroupDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white md:rounded-3xl shadow-none md:shadow-2xl w-full md:max-w-md h-full md:h-auto md:max-h-[85vh] overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header Image/Banner Area */}
        <div className={`h-32 ${group.avatarColor} relative flex items-center justify-center`}>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
            >
                <X size={20} />
            </button>
            <div className="text-4xl font-bold opacity-20 select-none">
                {group.name.substring(0, 2).toUpperCase()}
            </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto bg-white -mt-6 rounded-t-3xl relative px-6 pb-6">
            {/* Header Info */}
            <div className="text-center mb-6 pt-4">
                <h2 className="text-2xl font-bold text-black mb-1">{group.name}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <Users size={14} />
                        {group.memberCount.toLocaleString()} members
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Est. {group.dateCreated}
                    </span>
                </div>
            </div>

            {/* Description */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">About</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {group.description}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-1 text-gray-500">
                        <BarChart2 size={16} />
                        <span className="text-xs font-medium">Activity</span>
                    </div>
                    <p className="text-lg font-bold text-black">{group.messagesPerDay}</p>
                    <p className="text-[10px] text-gray-400">msgs/day</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-1 text-gray-500">
                        <Activity size={16} />
                        <span className="text-xs font-medium">Active</span>
                    </div>
                    <p className="text-lg font-bold text-black">{group.activeMembers}</p>
                    <p className="text-[10px] text-gray-400">members now</p>
                </div>
            </div>

            {/* Admin Info */}
             <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                        {group.adminName.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-black">{group.adminName}</p>
                        <p className="text-xs text-gray-500">Group Admin</p>
                    </div>
                </div>
                <ShieldCheck size={18} className="text-green-500" />
            </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 z-10">
            <button 
                onClick={onJoin}
                className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform active:scale-[0.98] ${
                    group.accessType === 'paid' 
                    ? 'bg-[#F4A261] text-white hover:bg-[#e08e4d]' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
                {group.accessType === 'paid' ? (
                    <>
                        <span>Join for {group.cost}</span>
                        <Coins size={18} />
                    </>
                ) : (
                    <>
                        <span>Request to Join Group</span>
                        <ArrowRight size={18} />
                    </>
                )}
            </button>
        </div>

      </div>
    </div>
  );
}
