import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { ThemeCard, ColorSwatch } from './SettingsHelpers';

export default function AppearanceSettings({ isDarkMode, toggleTheme }: { isDarkMode?: boolean; toggleTheme?: () => void }) {
  return (
    <div className={`lg:rounded-[24px] lg:p-8 lg:shadow-sm ${isDarkMode ? 'lg:bg-[#111] lg:border lg:border-[#E70008]/20' : 'lg:bg-white'}`}>
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
