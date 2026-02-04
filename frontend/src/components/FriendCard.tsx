import React from 'react';

interface Friend {
  id: number;
  name: string;
  role: string;
  company: string;
  status: string;
  mutual: number;
}

interface FriendCardProps {
  friend: Friend;
  isDarkMode?: boolean;
}

export default function FriendCard({ friend, isDarkMode = false }: FriendCardProps) {
  return (
    <div className={`rounded-2xl p-4 md:p-6 border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-row md:flex-col items-center text-left md:text-center group relative gap-4 md:gap-0 ${
      isDarkMode 
        ? 'bg-[#111] border-[#E70008]/30 shadow-[0_0_15px_rgba(231,0,8,0.1)]' 
        : 'bg-white border-gray-100'
    }`}>
        {/* Status Dot */}
        <div className={`absolute top-4 right-4 md:top-6 md:right-6 w-3 h-3 rounded-full border-2 ${
          isDarkMode ? 'border-[#111]' : 'border-white'
        } ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} title={friend.status}></div>
        
        {/* Avatar */}
        <div className={`w-14 h-14 md:w-24 md:h-24 flex-shrink-0 rounded-full md:mb-4 overflow-hidden relative border-4 group-hover:border-[#E50914]/10 transition-colors ${
          isDarkMode ? 'bg-[#222] border-[#222]' : 'bg-gray-50 border-gray-50'
        }`}>
             <div className={`w-full h-full flex items-center justify-center text-lg md:text-2xl font-bold group-hover:text-[#E50914] transition-colors ${
               isDarkMode 
                 ? 'bg-gradient-to-br from-[#222] to-[#333] text-gray-500' 
                 : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-400'
             }`}>
                {friend.name.split(' ')[1][0]}
             </div>
        </div>

        <div className="flex-1 min-w-0 md:w-full">
            <h3 className={`font-bold text-base md:text-lg mb-0.5 md:mb-1 truncate ${
              isDarkMode ? 'text-[#F9E4AD]' : 'text-gray-900'
            }`}>{friend.name}</h3>
            <p className="text-xs md:text-sm text-[#E50914] font-medium mb-0.5 md:mb-1 truncate">{friend.role}</p>
            <p className={`text-xs mb-0 md:mb-6 truncate ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>{friend.company}</p>
            
            {/* Mobile Action Buttons */}
            <div className="flex md:hidden gap-2 mt-2">
                 <button className={`flex-1 py-1.5 text-xs font-bold rounded-lg ${
                   isDarkMode ? 'bg-[#E50914] text-white' : 'bg-black text-white'
                 }`}>
                    Message
                 </button>
                 <button className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
                   isDarkMode 
                     ? 'bg-transparent border border-[#E70008]/40 text-[#F9E4AD]' 
                     : 'bg-gray-50 text-gray-600'
                 }`}>
                    Profile
                 </button>
            </div>
        </div>
        
        {/* Desktop Action Buttons */}
        <div className="w-full mt-auto space-y-2 hidden md:block">
             <button className={`w-full py-2.5 text-sm font-bold rounded-xl hover:bg-[#E50914] transition-colors shadow-sm ${
               isDarkMode ? 'bg-[#E50914] text-white' : 'bg-black text-white'
             }`}>
                Message
             </button>
             <button className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-colors ${
               isDarkMode 
                 ? 'bg-transparent border border-[#E70008]/40 text-[#F9E4AD] hover:bg-[#E70008]/10' 
                 : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
             }`}>
                View Profile
             </button>
        </div>
    </div>
  );
}
