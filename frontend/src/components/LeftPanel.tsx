import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  MessageSquare, 
  Briefcase, 
  Settings, 
  GraduationCap, 
  BadgeCheck 
} from 'lucide-react';
import { NavItem } from './NavItem';

interface LeftPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  closeMenu?: () => void;
  isMobile?: boolean;
}

export default function LeftPanel({ activeTab, setActiveTab, closeMenu, isMobile }: LeftPanelProps) {
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    if (closeMenu) closeMenu();
  };

  return (
    <div className="flex flex-col h-full">
      {/* User Profile Card */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm">
            JD
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-black truncate">John Doe</h3>
          <p className="text-xs text-gray-500 truncate">Full Stack Dev</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1 mb-6">
        <NavItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={activeTab === 'Dashboard'} 
          isMobile={isMobile} 
          onClick={() => handleNavClick('Dashboard')} 
        />
        <NavItem 
          icon={<Users size={20} />} 
          label="Members" 
          active={activeTab === 'Members'} 
          isMobile={isMobile} 
          onClick={() => handleNavClick('Members')} 
        />
        <NavItem 
          icon={<FolderKanban size={20} />} 
          label="Projects" 
          badge="3" 
          active={activeTab === 'Projects'} 
          isMobile={isMobile} 
          onClick={() => handleNavClick('Projects')} 
        />
        <NavItem 
          icon={<MessageSquare size={20} />} 
          label="Messages" 
          badge="12" 
          active={activeTab === 'Messages'} 
          isMobile={isMobile} 
          onClick={() => handleNavClick('Messages')} 
        />
        <NavItem 
          icon={<Briefcase size={20} />} 
          label="Opportunities" 
          active={activeTab === 'Opportunities'} 
          isMobile={isMobile} 
          onClick={() => handleNavClick('Opportunities')} 
        />
      </nav>

      {/* Excluded Groups and Quick Actions as per request */}

      {/* Magna School */}
      <div className="mb-6">
        <div className="bg-gradient-to-br from-[#2ECC71]/10 to-[#2ECC71]/20 rounded-xl p-4 border border-[#2ECC71]/20">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#2ECC71] flex items-center justify-center text-white shadow-sm">
              <GraduationCap size={18} />
            </div>
            <div>
              <h4 className="font-bold text-black text-sm">Magna School</h4>
              <p className="text-xs text-gray-600 leading-tight mt-0.5">Upskill with top tech courses</p>
            </div>
          </div>
          <Link href="/magna-school" className="block w-full py-2 rounded-lg bg-white text-[#2ECC71] text-xs font-bold shadow-sm hover:shadow-md transition-all text-center">
            Start Learning
          </Link>
        </div>
      </div>

      {/* Verification Badge */}
      <div className="mb-6">
        <div className="bg-gradient-to-br from-[#E50914]/5 to-[#F4A261]/10 rounded-xl p-4 border border-[#E50914]/10">
          <div className="flex items-center gap-3 mb-2">
            <BadgeCheck size={20} className="text-[#E50914]" />
            <h4 className="font-bold text-black text-sm">Get Verified</h4>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Boost your credibility and unlock exclusive features.
          </p>
          <Link href="/get-verification" className="block w-full py-2 rounded-lg bg-[#E50914] text-white text-xs font-bold shadow-sm hover:bg-[#cc0812] transition-all text-center">
            Apply for Verification
          </Link>
        </div>
      </div>

      <nav className="space-y-1">
        <Link href="/settings" className="w-full block" onClick={closeMenu}>
          <NavItem icon={<Settings size={20} />} label="Settings" isMobile={isMobile} />
        </Link>
      </nav>
    </div>
  );
}
