"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  MessageSquare, 
  Briefcase, 
  Settings, 
  Plus, 
  Camera,
  Chrome,
  User,
  Bell,
  Lock,
  Palette,
  ShieldCheck,
  MapPin,
  HelpCircle,
  Mail,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Moon,
  Sun,
  Monitor,
  Menu,
  X,
  LogOut,
  Search,
  CreditCard,
  History
} from 'lucide-react';
import Link from 'next/link';
import TopNavigation from '@/components/TopNavigation';
import LeftPanel from '@/components/LeftPanel';

export default function SettingsPage() {
  const [activeModule, setActiveModule] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Settings');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const getModuleContent = (moduleId: string) => {
    switch (moduleId) {
      case 'Account': return <AccountSettings isDarkMode={isDarkMode} />;
      case 'Payment Method': return <PaymentMethodSettings isDarkMode={isDarkMode} />;
      case 'Payment History': return <PaymentHistorySettings isDarkMode={isDarkMode} />;
      case 'Notifications': return <NotificationsSettings isDarkMode={isDarkMode} />;
      case 'Privacy': return <PrivacySettings isDarkMode={isDarkMode} />;
      case 'Appearance': return <AppearanceSettings isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      case 'Security': return <SecuritySettings isDarkMode={isDarkMode} />;
      case 'Local Discovery': return <LocalDiscoverySettings isDarkMode={isDarkMode} />;
      case 'Help Center': return <HelpCenterSettings isDarkMode={isDarkMode} />;
      default: return <AccountSettings isDarkMode={isDarkMode} />;
    }
  };

  const settingsModules = [
    { id: 'Account', icon: <User size={18} />, label: 'Account' },
    { id: 'Payment Method', icon: <CreditCard size={18} />, label: 'Payment Method' },
    { id: 'Payment History', icon: <History size={18} />, label: 'Payment History' },
    { id: 'My Projects', icon: <FolderKanban size={18} />, label: 'My Projects' },
    { id: 'My Job Opportunities', icon: <Briefcase size={18} />, label: 'My Job Opportunities' },
    { id: 'Notifications', icon: <Bell size={18} />, label: 'Notifications' },
    { id: 'Privacy', icon: <Lock size={18} />, label: 'Privacy' },
    { id: 'Appearance', icon: <Palette size={18} />, label: 'Appearance' },
    { id: 'Security', icon: <ShieldCheck size={18} />, label: 'Security' },
    { id: 'Local Discovery', icon: <MapPin size={18} />, label: 'Local Discovery' },
    { id: 'Help Center', icon: <HelpCircle size={18} />, label: 'Help Center' },
  ];

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
          title="Settings" 
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
          <div className="max-w-7xl mx-auto p-4 md:p-8 mb-20 md:mb-0">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Settings</h1>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Manage your account preferences and settings</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Settings Navigation Module */}
              <div className="w-full lg:w-64 flex-shrink-0">
                <div className={`rounded-[24px] shadow-sm overflow-hidden sticky top-8 ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
                  <div className="p-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 px-2">General</h3>
                    <nav className="space-y-1">
                      {settingsModules.map((module) => (
                        <div key={module.id} className="flex flex-col">
                          <button
                            onClick={() => setActiveModule(activeModule === module.id ? '' : module.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                              activeModule === module.id
                                ? 'bg-[#E50914]/10 text-[#E50914]'
                                : isDarkMode ? 'text-[#F4A261] hover:bg-[#222]' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {module.icon}
                            {module.label}
                            <ChevronRight 
                              size={16} 
                              className={`ml-auto opacity-50 transition-transform duration-200 ${
                                activeModule === module.id ? 'rotate-90 lg:rotate-0' : ''
                              }`} 
                            />
                          </button>

                          {/* Mobile Accordion Content */}
                          <div className={`lg:hidden grid transition-all duration-300 ease-in-out ${
                            activeModule === module.id ? 'grid-rows-[1fr] opacity-100 mt-2 mb-4' : 'grid-rows-[0fr] opacity-0'
                          }`}>
                            <div className="overflow-hidden">
                              {activeModule === module.id && getModuleContent(module.id)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Desktop Module Content Area */}
              <div className="hidden lg:block flex-1 min-w-0">
                {getModuleContent(activeModule || 'Account')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavItem({ icon, label, badge, active, onClick }: { icon: React.ReactNode; label: string; badge?: string; active?: boolean; onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`relative w-full flex items-center justify-center lg:justify-between px-2 lg:px-4 py-3 rounded-full transition-all text-sm font-medium cursor-pointer ${
        active 
          ? 'bg-[#E50914] text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-0 lg:gap-3">
        {icon}
        <span className="hidden lg:block">{label}</span>
      </div>
      {badge && (
        <span className={`hidden lg:block px-2 py-0.5 rounded-full text-xs font-bold ${
          active ? 'bg-white text-[#E50914]' : 'bg-[#F4A261] text-white'
        }`}>
          {badge}
        </span>
      )}
      {badge && (
        <span className={`lg:hidden absolute top-2 right-2 w-2 h-2 rounded-full ${
          active ? 'bg-white' : 'bg-[#E50914]'
        }`}></span>
      )}
    </div>
  );
}

function AccountSettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className="space-y-6">
      <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F4A261]' : 'text-black'}`}>Profile Information</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-4 mx-auto md:mx-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-3xl shadow-md relative">
              JD
              <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm cursor-pointer transition-colors border ${isDarkMode ? 'bg-[#222] border-gray-700 hover:bg-[#333]' : 'bg-white border-gray-100 hover:bg-gray-50'}`}>
                <Camera size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </div>
            </div>
            <button className="text-sm font-semibold text-[#E50914] hover:text-[#cc0812] transition-colors">
              Change Photo
            </button>
          </div>
          <div className="flex-1 w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="First Name" defaultValue="John" isDarkMode={isDarkMode} />
              <InputField label="Last Name" defaultValue="Doe" isDarkMode={isDarkMode} />
            </div>
            <InputField label="Email Address" defaultValue="john.doe@example.com" type="email" isDarkMode={isDarkMode} />
            <div className="space-y-2">
              <label className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bio</label>
              <textarea 
                rows={4}
                defaultValue="Full Stack Developer passionate about building scalable applications."
                className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm resize-none ${
                  isDarkMode ? 'bg-[#222] border-gray-700 text-white' : 'bg-gray-50 border-gray-100 text-black'
                }`}
              ></textarea>
            </div>
            <InputField label="Location" defaultValue="Nairobi, Kenya" isDarkMode={isDarkMode} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Website (optional)" placeholder="https://yourwebsite.com" isDarkMode={isDarkMode} />
                <InputField label="GitHub (optional)" placeholder="https://github.com/username" isDarkMode={isDarkMode} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="LinkedIn (optional)" placeholder="https://linkedin.com/in/username" isDarkMode={isDarkMode} />
                <InputField label="Twitter (optional)" placeholder="https://twitter.com/username" isDarkMode={isDarkMode} />
            </div>
            <InputField label="WhatsApp (optional)" placeholder="+254..." isDarkMode={isDarkMode} />

            <div className="space-y-2">
              <label className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Availability</label>
              <div className="relative">
                <select className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm appearance-none cursor-pointer ${
                  isDarkMode ? 'bg-[#222] border-gray-700 text-[#F4A261]' : 'bg-gray-50 border-gray-100 text-black'
                }`}>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="break">On Break</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={16} />
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <Button primary isDarkMode={isDarkMode}>Save Changes</Button>
              <Button isDarkMode={isDarkMode}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
        <h2 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Connected Accounts</h2>
        <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
          isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#222]' : 'bg-gray-50'}`}>
              <Chrome className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`} />
            </div>
            <div>
              <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>Google</h3>
              <p className="text-xs text-gray-500">john.doe@gmail.com</p>
            </div>
          </div>
          <button className={`px-4 py-2 rounded-full border text-xs font-semibold transition-all ${
            isDarkMode 
              ? 'border-gray-700 text-gray-400 hover:bg-[#222] hover:text-[#E50914] hover:border-[#E50914]/30' 
              : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#E50914] hover:border-[#E50914]/30'
          }`}>
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentMethodSettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Payment Method</h2>
      
      <div className="space-y-6">
        <div className={`p-4 border rounded-xl flex items-center justify-between ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-8 rounded flex items-center justify-center text-xs font-bold ${isDarkMode ? 'bg-[#222] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>VISA</div>
                <div>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-[#F4A261]' : 'text-gray-800'}`}>•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/24</p>
                </div>
            </div>
            <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
        </div>

        <div className={`p-4 border rounded-xl flex items-center justify-between ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-8 rounded flex items-center justify-center text-xs font-bold ${isDarkMode ? 'bg-[#222] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>MC</div>
                <div>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>•••• •••• •••• 5555</p>
                    <p className="text-xs text-gray-500">Expires 10/25</p>
                </div>
            </div>
            <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
        </div>

        <button className={`w-full py-3 rounded-xl border-2 border-dashed font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
          isDarkMode 
            ? 'border-gray-700 text-gray-400 hover:border-[#E50914] hover:text-[#E50914]' 
            : 'border-gray-200 text-gray-400 hover:border-[#E50914] hover:text-[#E50914]'
        }`}>
            <Plus size={18} />
            Add New Card
        </button>
      </div>
    </div>
  );
}

function PaymentHistorySettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Payment History</h2>
      
      <div className="space-y-4">
        {[
            { date: 'Oct 24, 2023', amount: '$29.00', status: 'Paid', invoice: '#INV-2023-001' },
            { date: 'Sep 24, 2023', amount: '$29.00', status: 'Paid', invoice: '#INV-2023-002' },
            { date: 'Aug 24, 2023', amount: '$29.00', status: 'Paid', invoice: '#INV-2023-003' },
        ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                <div>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Pro Plan Subscription</p>
                    <p className="text-xs text-gray-500">{item.date} • {item.invoice}</p>
                </div>
                <div className="text-right">
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.amount}</p>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
                    }`}>{item.status}</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsSettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Notifications</h2>
      <div className={`space-y-6 divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
        <ToggleRow title="Email Notifications" description="Receive emails about your account activity." defaultChecked isDarkMode={isDarkMode} />
        <ToggleRow title="Push Notifications" description="Receive push notifications on your device." defaultChecked isDarkMode={isDarkMode} />
        <ToggleRow title="Weekly Digest" description="Get a weekly summary of your stats." isDarkMode={isDarkMode} />
        <ToggleRow title="New Applicants" description="Get notified when someone applies to your job." defaultChecked isDarkMode={isDarkMode} />
        <ToggleRow title="Marketing Emails" description="Receive updates about new features and promotions." isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

function PrivacySettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Privacy</h2>
      <div className={`space-y-6 divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
        <div className="pt-4 first:pt-0">
          <label className={`text-sm font-semibold block mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Profile Visibility</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" className="text-[#E50914] focus:ring-[#E50914]" defaultChecked />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Public</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" className="text-[#E50914] focus:ring-[#E50914]" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Private</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">Public profiles are visible to everyone.</p>
        </div>
        <ToggleRow title="Show Email Address" description="Allow others to see your email address." isDarkMode={isDarkMode} />
        <ToggleRow title="Allow Search Engines" description="Let search engines index your profile." defaultChecked isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

function AppearanceSettings({ isDarkMode, toggleTheme }: { isDarkMode?: boolean; toggleTheme?: () => void }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Appearance</h2>
      
      <div className="mb-8">
        <label className={`text-sm font-semibold block mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Theme</label>
        <div className="grid grid-cols-3 gap-4">
          <ThemeCard icon={<Sun size={24} />} label="Light" active={!isDarkMode} isDarkMode={isDarkMode} onClick={() => isDarkMode && toggleTheme && toggleTheme()} />
          <ThemeCard icon={<Moon size={24} />} label="Dark" active={isDarkMode} isDarkMode={isDarkMode} onClick={() => !isDarkMode && toggleTheme && toggleTheme()} />
          <ThemeCard icon={<Monitor size={24} />} label="System" isDarkMode={isDarkMode} />
        </div>
      </div>

      <div>
        <label className={`text-sm font-semibold block mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Accent Color</label>
        <div className="flex gap-4">
          <ColorSwatch color="#E50914" active />
          <ColorSwatch color="#F4A261" />
          <ColorSwatch color="#2ECC71" />
          <ColorSwatch color="#3498DB" />
          <ColorSwatch color="#9B59B6" />
        </div>
      </div>
    </div>
  );
}

function SecuritySettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Security</h2>
      <div className="space-y-6">
        <div className={`p-4 rounded-xl border mb-6 ${isDarkMode ? 'bg-orange-900/20 border-orange-900/30' : 'bg-orange-50 border-orange-100'}`}>
          <div className="flex gap-3">
            <ShieldCheck className="text-[#F4A261] flex-shrink-0" size={24} />
            <div>
              <h4 className={`font-bold text-sm ${isDarkMode ? 'text-orange-400' : 'text-orange-800'}`}>Two-Factor Authentication</h4>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-orange-300/70' : 'text-orange-700'}`}>Add an extra layer of security to your account.</p>
              <button className="mt-2 text-xs font-bold text-[#E50914] hover:underline">Enable 2FA</button>
            </div>
          </div>
        </div>
        
        <h3 className={`text-sm font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Change Password</h3>
        <InputField label="Current Password" type="password" isDarkMode={isDarkMode} />
        <InputField label="New Password" type="password" isDarkMode={isDarkMode} />
        <InputField label="Confirm New Password" type="password" isDarkMode={isDarkMode} />
        
        <div className="pt-2">
          <Button primary isDarkMode={isDarkMode}>Update Password</Button>
        </div>
      </div>
    </div>
  );
}

function LocalDiscoverySettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Local Discovery</h2>
      
      <div className="space-y-8">
        <ToggleRow title="Enable Location" description="Allow us to use your location to find jobs and events near you." defaultChecked isDarkMode={isDarkMode} />
        
        <div>
          <div className="flex justify-between mb-2">
            <label className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Discovery Radius</label>
            <span className="text-sm font-bold text-[#E50914]">50 km</span>
          </div>
          <input type="range" className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#E50914] ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`flex justify-between mt-2 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <span>10 km</span>
            <span>500 km</span>
          </div>
        </div>

        <div className={`p-4 rounded-xl h-48 flex items-center justify-center text-sm border border-dashed ${isDarkMode ? 'bg-[#222] border-gray-700 text-gray-500' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
          Map Preview Component
        </div>
      </div>
    </div>
  );
}

function HelpCenterSettings({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Help Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className={`p-6 rounded-xl border transition-all cursor-pointer text-center ${isDarkMode ? 'border-gray-700 hover:border-[#F4A261]' : 'border-gray-100 hover:border-[#F4A261]'}`}>
          <MessageSquare className="w-8 h-8 text-[#F4A261] mx-auto mb-3" />
          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Chat Support</h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Talk to our team live</p>
        </div>
        <div className={`p-6 rounded-xl border transition-all cursor-pointer text-center ${isDarkMode ? 'border-gray-700 hover:border-[#F4A261]' : 'border-gray-100 hover:border-[#F4A261]'}`}>
          <Mail className="w-8 h-8 text-[#E50914] mx-auto mb-3" />
          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Email Us</h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get a response in 24h</p>
        </div>
      </div>

      <h3 className={`text-sm font-bold uppercase mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Frequently Asked Questions</h3>
      <div className="space-y-3">
        {['How do I reset my password?', 'Can I change my username?', 'How do I delete my account?'].map((q, i) => (
          <div key={i} className={`p-4 rounded-xl flex justify-between items-center cursor-pointer transition-colors ${isDarkMode ? 'bg-[#222] hover:bg-[#333]' : 'bg-gray-50 hover:bg-gray-100'}`}>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{q}</span>
            <ChevronRight size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function InputField({ label, type = "text", defaultValue, placeholder, isDarkMode }: { label: string; type?: string; defaultValue?: string; placeholder?: string; isDarkMode?: boolean }) {
  return (
    <div className="space-y-2">
      <label className={`text-sm font-semibold ${isDarkMode ? 'text-[#F4A261]' : 'text-gray-700'}`}>{label}</label>
      <input 
        type={type}  
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm ${
          isDarkMode ? 'bg-[#222] border-gray-700 text-[#F4A261] placeholder-gray-600' : 'bg-gray-50 border-gray-100 text-black'
        }`}
      />
    </div>
  );
}

function Button({ children, primary, icon, isDarkMode }: { children: React.ReactNode; primary?: boolean; icon?: React.ReactNode; isDarkMode?: boolean }) {
  return (
    <button className={`px-6 py-3 rounded-full text-sm font-semibold shadow-sm transition-all flex items-center gap-2 ${
      primary 
        ? 'bg-[#E50914] text-white hover:bg-[#cc0812] shadow-md' 
        : isDarkMode 
          ? 'bg-transparent border border-gray-700 text-gray-300 hover:bg-[#222]' 
          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
    }`}>
      {icon}
      {children}
    </button>
  );
}

function ToggleRow({ title, description, defaultChecked, isDarkMode }: { title: string; description: string; defaultChecked?: boolean; isDarkMode?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div className={`flex items-center justify-between py-4 first:pt-0 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
      <div>
        <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{title}</h4>
        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{description}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`transition-colors ${checked ? 'text-[#E50914]' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}
      >
        {checked ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
      </button>
    </div>
  );
}

function ThemeCard({ icon, label, active, isDarkMode, onClick }: { icon: React.ReactNode; label: string; active?: boolean; isDarkMode?: boolean; onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border flex flex-col items-center gap-3 cursor-pointer transition-all ${
      active 
        ? 'border-[#E50914] bg-[#E50914]/5 text-[#E50914]' 
        : isDarkMode 
          ? 'border-gray-700 bg-[#222] text-gray-400 hover:bg-[#333]' 
          : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
    }`}>
      {icon}
      <span className="text-xs font-bold">{label}</span>
    </div>
  );
}

function ColorSwatch({ color, active }: { color: string; active?: boolean }) {
  return (
    <div 
      className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-transform hover:scale-110 ${active ? 'ring-2 ring-offset-2 ring-gray-300' : ''}`}
      style={{ backgroundColor: color }}
    >
      {active && <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>}
    </div>
  );
}
