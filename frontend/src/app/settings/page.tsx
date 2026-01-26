"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  MessageSquare, 
  Briefcase, 
  Settings, 
  Plus, 
  Search, 
  BookOpen, 
  Camera,
  LogOut,
  Chrome,
  User,
  Building2,
  Bell,
  Lock,
  Palette,
  ShieldCheck,
  MapPin,
  HelpCircle,
  Globe,
  Mail,
  Phone,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Settings');
  const [activeModule, setActiveModule] = useState('Account');

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'Account': return <AccountSettings />;
      case 'Business Profile': return <BusinessProfileSettings />;
      case 'Job Postings': return <JobPostingsSettings />;
      case 'Notifications': return <NotificationsSettings />;
      case 'Privacy': return <PrivacySettings />;
      case 'Appearance': return <AppearanceSettings />;
      case 'Security': return <SecuritySettings />;
      case 'Local Discovery': return <LocalDiscoverySettings />;
      case 'Help Center': return <HelpCenterSettings />;
      default: return <AccountSettings />;
    }
  };

  const settingsModules = [
    { id: 'Account', icon: <User size={18} />, label: 'Account' },
    { id: 'Business Profile', icon: <Building2 size={18} />, label: 'Business Profile' },
    { id: 'Job Postings', icon: <Briefcase size={18} />, label: 'Job Postings' },
    { id: 'Notifications', icon: <Bell size={18} />, label: 'Notifications' },
    { id: 'Privacy', icon: <Lock size={18} />, label: 'Privacy' },
    { id: 'Appearance', icon: <Palette size={18} />, label: 'Appearance' },
    { id: 'Security', icon: <ShieldCheck size={18} />, label: 'Security' },
    { id: 'Local Discovery', icon: <MapPin size={18} />, label: 'Local Discovery' },
    { id: 'Help Center', icon: <HelpCircle size={18} />, label: 'Help Center' },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans text-[#444444] flex">
      {/* LEFT SIDEBAR - Reused from Feed */}
      <aside className="w-[88px] lg:w-[260px] bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col z-20 hidden md:flex transition-all duration-300">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
            <div className="w-10 h-10 rounded-lg bg-black flex-shrink-0 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#E50914]">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight hidden lg:block">
              <span className="text-[#F4A261]">Magna</span>
              <span className="text-[#E50914]">Coders</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 p-0 lg:p-3 lg:bg-gray-50 rounded-xl mb-6 justify-center lg:justify-start">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0 hidden lg:block">
              <h3 className="text-sm font-bold text-black truncate">John Doe</h3>
              <p className="text-xs text-gray-500 truncate">Full Stack Dev</p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link href="/feed" className="block"><NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" /></Link>
            <NavItem icon={<Users size={20} />} label="Members" />
            <NavItem icon={<FolderKanban size={20} />} label="Projects" badge="3" />
            <NavItem icon={<MessageSquare size={20} />} label="Messages" badge="12" />
            <NavItem icon={<Briefcase size={20} />} label="Opportunities" />
            <NavItem icon={<Settings size={20} />} label="Settings" active={true} />

          </nav>
        </div>

        <div className="px-6 mt-4 hidden lg:block">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 px-2">Quick Actions</h4>
          <div className="space-y-3">
            <button className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E50914] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Plus size={18} />
              Create Post
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-[88px] lg:ml-[260px] p-4 md:p-8 max-w-7xl mx-auto transition-all duration-300 w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Settings</h1>
          <p className="text-gray-500">Manage your account preferences and settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Settings Navigation Module */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-[24px] shadow-sm overflow-hidden sticky top-8">
              <div className="p-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 px-2">General</h3>
                <nav className="space-y-1">
                  {settingsModules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeModule === module.id
                          ? 'bg-[#E50914]/10 text-[#E50914]'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {module.icon}
                      {module.label}
                      {activeModule === module.id && (
                        <ChevronRight size={16} className="ml-auto opacity-50" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Module Content Area */}
          <div className="flex-1 min-w-0">
            {renderModuleContent()}
          </div>
        </div>
      </main>
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

function AccountSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-black mb-6">Profile Information</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-4 mx-auto md:mx-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E50914] flex items-center justify-center text-white font-bold text-3xl shadow-md relative">
              JD
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100">
                <Camera size={14} className="text-gray-600" />
              </div>
            </div>
            <button className="text-sm font-semibold text-[#E50914] hover:text-[#cc0812] transition-colors">
              Change Photo
            </button>
          </div>
          <div className="flex-1 w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="First Name" defaultValue="John" />
              <InputField label="Last Name" defaultValue="Doe" />
            </div>
            <InputField label="Email Address" defaultValue="john.doe@example.com" type="email" />
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Bio</label>
              <textarea 
                rows={4}
                defaultValue="Full Stack Developer passionate about building scalable applications."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm resize-none"
              ></textarea>
            </div>
            <InputField label="Location" defaultValue="Nairobi, Kenya" />
            <div className="pt-4 flex gap-4">
              <Button primary>Save Changes</Button>
              <Button>Cancel</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-black mb-6">Connected Accounts</h2>
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <Chrome className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-black">Google</h3>
              <p className="text-xs text-gray-500">john.doe@gmail.com</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#E50914] hover:border-[#E50914]/30 transition-all">
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}

function BusinessProfileSettings() {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-black mb-6">Business Profile</h2>
      <div className="space-y-6">
        <InputField label="Company Name" placeholder="e.g. Acme Corp" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Industry</label>
            <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm">
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Company Size</label>
            <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm">
              <option>1-10 employees</option>
              <option>11-50 employees</option>
              <option>50-200 employees</option>
              <option>200+ employees</option>
            </select>
          </div>
        </div>
        <InputField label="Website" placeholder="https://example.com" />
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <textarea 
            rows={4}
            placeholder="Tell us about your company..."
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm resize-none"
          ></textarea>
        </div>
        <div className="pt-4">
          <Button primary>Save Business Profile</Button>
        </div>
      </div>
    </div>
  );
}

function JobPostingsSettings() {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">Job Postings</h2>
        <Button primary icon={<Plus size={16} />}>Post a Job</Button>
      </div>
      
      <div className="space-y-4">
        {[1, 2].map((job) => (
          <div key={job} className="p-4 rounded-xl border border-gray-100 hover:border-[#F4A261] transition-colors group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-black">Senior React Developer</h3>
                <p className="text-sm text-gray-500 mb-2">Remote • Full-time</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs font-bold">Active</span>
                  <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs">12 Applicants</span>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-[#E50914] transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsSettings() {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-black mb-6">Notifications</h2>
      <div className="space-y-6 divide-y divide-gray-100">
        <ToggleRow title="Email Notifications" description="Receive emails about your account activity." defaultChecked />
        <ToggleRow title="Push Notifications" description="Receive push notifications on your device." defaultChecked />
        <ToggleRow title="Weekly Digest" description="Get a weekly summary of your stats." />
        <ToggleRow title="New Applicants" description="Get notified when someone applies to your job." defaultChecked />
        <ToggleRow title="Marketing Emails" description="Receive updates about new features and promotions." />
      </div>
    </div>
  );
}

function PrivacySettings() {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-black mb-6">Privacy</h2>
      <div className="space-y-6 divide-y divide-gray-100">
        <div className="pt-4 first:pt-0">
          <label className="text-sm font-semibold text-gray-700 block mb-3">Profile Visibility</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" className="text-[#E50914] focus:ring-[#E50914]" defaultChecked />
              <span className="text-sm text-gray-600">Public</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="visibility" className="text-[#E50914] focus:ring-[#E50914]" />
              <span className="text-sm text-gray-600">Private</span>
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-2">Public profiles are visible to everyone.</p>
        </div>
        <ToggleRow title="Show Email Address" description="Allow others to see your email address." />
        <ToggleRow title="Allow Search Engines" description="Let search engines index your profile." defaultChecked />
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-black mb-6">Appearance</h2>
      
      <div className="mb-8">
        <label className="text-sm font-semibold text-gray-700 block mb-4">Theme</label>
        <div className="grid grid-cols-3 gap-4">
          <ThemeCard icon={<Sun size={24} />} label="Light" active />
          <ThemeCard icon={<Moon size={24} />} label="Dark" />
          <ThemeCard icon={<Monitor size={24} />} label="System" />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-4">Accent Color</label>
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

function SecuritySettings() {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-black mb-6">Security</h2>
      <div className="space-y-6">
        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 mb-6">
          <div className="flex gap-3">
            <ShieldCheck className="text-[#F4A261] flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-orange-800 text-sm">Two-Factor Authentication</h4>
              <p className="text-xs text-orange-700 mt-1">Add an extra layer of security to your account.</p>
              <button className="mt-2 text-xs font-bold text-[#E50914] hover:underline">Enable 2FA</button>
            </div>
          </div>
        </div>
        
        <h3 className="text-sm font-bold text-gray-400 uppercase">Change Password</h3>
        <InputField label="Current Password" type="password" />
        <InputField label="New Password" type="password" />
        <InputField label="Confirm New Password" type="password" />
        
        <div className="pt-2">
          <Button primary>Update Password</Button>
        </div>
      </div>
    </div>
  );
}

function LocalDiscoverySettings() {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-black mb-6">Local Discovery</h2>
      
      <div className="space-y-8">
        <ToggleRow title="Enable Location" description="Allow us to use your location to find jobs and events near you." defaultChecked />
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">Discovery Radius</label>
            <span className="text-sm font-bold text-[#E50914]">50 km</span>
          </div>
          <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E50914]" />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>10 km</span>
            <span>500 km</span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl h-48 flex items-center justify-center text-gray-400 text-sm border border-gray-100 border-dashed">
          Map Preview Component
        </div>
      </div>
    </div>
  );
}

function HelpCenterSettings() {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-black mb-6">Help Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-6 rounded-xl border border-gray-100 hover:border-[#F4A261] transition-all cursor-pointer text-center">
          <MessageSquare className="w-8 h-8 text-[#F4A261] mx-auto mb-3" />
          <h3 className="font-bold text-black">Chat Support</h3>
          <p className="text-xs text-gray-500 mt-1">Talk to our team live</p>
        </div>
        <div className="p-6 rounded-xl border border-gray-100 hover:border-[#F4A261] transition-all cursor-pointer text-center">
          <Mail className="w-8 h-8 text-[#E50914] mx-auto mb-3" />
          <h3 className="font-bold text-black">Email Us</h3>
          <p className="text-xs text-gray-500 mt-1">Get a response in 24h</p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {['How do I reset my password?', 'Can I change my username?', 'How do I delete my account?'].map((q, i) => (
          <div key={i} className="p-4 rounded-xl bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">{q}</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function InputField({ label, type = "text", defaultValue, placeholder }: { label: string; type?: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input 
        type={type} 
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm"
      />
    </div>
  );
}

function Button({ children, primary, icon }: { children: React.ReactNode; primary?: boolean; icon?: React.ReactNode }) {
  return (
    <button className={`px-6 py-3 rounded-full text-sm font-semibold shadow-sm transition-all flex items-center gap-2 ${
      primary 
        ? 'bg-[#E50914] text-white hover:bg-[#cc0812] shadow-md' 
        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
    }`}>
      {icon}
      {children}
    </button>
  );
}

function ToggleRow({ title, description, defaultChecked }: { title: string; description: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div className="flex items-center justify-between py-4 first:pt-0">
      <div>
        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`transition-colors ${checked ? 'text-[#E50914]' : 'text-gray-300'}`}
      >
        {checked ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
      </button>
    </div>
  );
}

function ThemeCard({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border flex flex-col items-center gap-3 cursor-pointer transition-all ${
      active ? 'border-[#E50914] bg-[#E50914]/5 text-[#E50914]' : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
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
