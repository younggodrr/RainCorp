import React from 'react';
import { Camera, Chrome, ChevronRight, Github } from 'lucide-react';
import { InputField, Button } from './SettingsHelpers';

export default function AccountSettings({ isDarkMode }: { isDarkMode?: boolean }) {
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
        <div className="space-y-4">
          {/* Google */}
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

          {/* GitHub */}
          <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
            isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-gray-200'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                <Github className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`} />
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>GitHub</h3>
                <p className="text-xs text-gray-500">Connect your GitHub account</p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-full border text-xs font-semibold transition-all ${
              isDarkMode 
                ? 'bg-[#E50914] border-[#E50914] text-white hover:bg-[#cc0812]' 
                : 'bg-black border-black text-white hover:bg-gray-800'
            }`}>
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
