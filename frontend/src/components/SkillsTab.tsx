"use client";

import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { Skill } from '@/app/user-profile/data';

interface SkillsTabProps {
  skills: Skill[];
  isDarkMode: boolean;
}

export default function SkillsTab({ skills, isDarkMode }: SkillsTabProps) {
  return (
    <div className={`rounded-2xl p-4 md:p-6 border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
      <h3 className={`font-bold text-lg mb-6 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Skills & Expertise</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className={`flex items-center justify-between p-4 rounded-xl border hover:border-[#F4A261]/30 transition-all ${isDarkMode ? 'bg-[#222] border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm text-[#F4A261] ${isDarkMode ? 'bg-[#333]' : 'bg-white'}`}>
                <BadgeCheck size={20} />
              </div>
              <div>
                <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{skill.name}</h4>
                <p className="text-xs text-gray-500">{skill.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
