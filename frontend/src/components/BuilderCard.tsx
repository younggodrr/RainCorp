import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  UserPlus, MessageSquare, MapPin, 
  Github, Linkedin, MessageCircle, Globe 
} from 'lucide-react';

export interface Builder {
  id: number;
  name: string;
  email: string;
  bio: string;
  roles: string[];
  lookingFor: string[];
  location: string;
  status: string;
  connected: boolean;
  avatar: string | null;
}

interface BuilderCardProps {
  builder: Builder;
  isDarkMode: boolean;
}

const BuilderCard: React.FC<BuilderCardProps> = ({ builder, isDarkMode }) => {
  return (
    <Link 
      href={`/user-profile?id=${builder.id}`} 
      className={`rounded-2xl p-6 border transition-all flex flex-col gap-4 hover:shadow-md ${isDarkMode ? 'bg-[#111] border-[#E70008]/20 shadow-[0_0_15px_rgba(231,0,8,0.1)]' : 'bg-white border-black'}`}
    >
      {/* Header: Avatar & Info */}
      <div className="flex gap-4 items-start">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 font-bold text-xl relative ${isDarkMode ? 'bg-[#222] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
          {/* Placeholder Avatar */}
          {builder.avatar ? (
            <Image src={builder.avatar} alt={builder.name} fill sizes="56px" className="object-cover" />
          ) : (
            builder.name.substring(0, 2).toUpperCase()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>{builder.name}</h3>
          </div>
          <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{builder.email}</p>
          <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{builder.bio}</p>
        </div>
        
        {/* Status & Actions Column */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-1">
          <span className="px-2 py-0.5 bg-[#2ECC71]/10 text-[#2ECC71] rounded-full text-[10px] font-medium whitespace-nowrap">
            {builder.status}
          </span>
        </div>
      </div>

      {/* Roles */}
      <div className="flex flex-wrap gap-2">
        {builder.roles.slice(0, 2).map((role, idx) => (
          <span key={idx} className={`px-3 py-1 rounded-full text-[10px] font-medium border ${idx === 0 ? 'bg-[#F4A261]/10 text-[#F4A261] border-[#F4A261]/20' : 'bg-[#E50914]/10 text-[#E50914] border-[#E50914]/20'}`}>
            {role}
          </span>
        ))}
        {builder.roles.length > 2 && (
          <span className={`px-3 py-1 rounded-full text-[10px] font-medium border ${isDarkMode ? 'bg-[#222] text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
            +{builder.roles.length - 2}
          </span>
        )}
      </div>

      {/* Looking For */}
      <div className={`flex gap-3 p-3 rounded-xl ${isDarkMode ? 'bg-[#222]' : 'bg-gray-50'}`}>
        {/* Action Icons */}
        <div className={`flex flex-col justify-center gap-2 border-r pr-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-[#333] text-gray-400 hover:text-white' : 'hover:bg-white text-gray-500 hover:text-[#E50914]'}`}
          >
            <UserPlus size={16} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-[#333] text-gray-400 hover:text-white' : 'hover:bg-white text-gray-500 hover:text-[#E50914]'}`}
          >
            <MessageSquare size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center justify-between gap-2">
             <div className={`flex items-center gap-2 text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
               <span className="text-sm">👀</span>
               <span>Looking for:</span>
             </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {builder.lookingFor.map((item, idx) => (
              <span key={idx} className={`px-2 py-0.5 border rounded-md text-[10px] font-medium ${isDarkMode ? 'bg-[#E50914] border-[#E50914] text-black' : 'bg-[#E50914] border-[#E50914] text-black'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mt-auto">
         <div className="flex items-center gap-2 text-xs text-gray-500">
           <MapPin size={14} className="text-[#E50914]" />
           <span className="truncate">{builder.location}</span>
         </div>
         <div className="flex items-center gap-3 text-gray-400">
            <Globe size={16} className="text-[#F4A261] cursor-pointer transition-colors" />
            <Github size={16} className={`${isDarkMode ? 'text-white' : 'text-black'} cursor-pointer transition-colors`} />
            <Linkedin size={16} className="text-[#0077b5] cursor-pointer transition-colors" />
            <MessageCircle size={16} className="text-[#25D366] cursor-pointer transition-colors" />
         </div>
      </div>
    </Link>
  );
};

export default BuilderCard;
