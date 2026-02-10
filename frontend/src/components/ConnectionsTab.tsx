"use client";

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Connection } from '@/app/user-profile/data';

interface ConnectionsTabProps {
  connections: Connection[];
  isDarkMode: boolean;
}

export default function ConnectionsTab({ connections, isDarkMode }: ConnectionsTabProps) {
  return (
    <div className={`rounded-2xl p-4 md:p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
      <h3 className={`font-bold text-lg mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Connections</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connections.map((connection, index) => (
          <div key={index} className={`flex items-center gap-4 p-4 rounded-xl border hover:border-[#F4A261]/30 transition-all group ${isDarkMode ? 'bg-[#222] border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${connection.color} flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0`}>
              {connection.initials}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-sm truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>{connection.name}</h4>
              <p className="text-xs text-gray-500 truncate">{connection.role}</p>
            </div>
            <button className={`p-2 rounded-full transition-colors shadow-sm opacity-0 group-hover:opacity-100 ${isDarkMode ? 'bg-[#333] text-gray-400 hover:bg-[#E50914] hover:text-white' : 'bg-white text-gray-400 hover:bg-[#E50914] hover:text-white'}`}>
              <MessageSquare size={16} />
            </button>
          </div>
        ))}
        
        <button className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed hover:text-[#E50914] hover:border-[#E50914]/50 hover:bg-[#E50914]/5 transition-all ${isDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
          <span className="text-sm font-bold">View all connections</span>
        </button>
      </div>
    </div>
  );
}
