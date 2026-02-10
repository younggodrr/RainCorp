"use client";

import React from 'react';
import { FolderKanban, ExternalLink, Plus } from 'lucide-react';
import { Project } from '@/app/user-profile/data';

interface ProjectsTabProps {
  projects: Project[];
  isDarkMode: boolean;
}

export default function ProjectsTab({ projects, isDarkMode }: ProjectsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div key={index} className={`rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-all group ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
          <div className={`h-48 relative overflow-hidden ${isDarkMode ? 'bg-[#222]' : 'bg-gray-100'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br flex items-center justify-center ${isDarkMode ? 'from-[#222] to-[#333] text-gray-600' : 'from-gray-100 to-gray-200 text-gray-300'}`}>
              <FolderKanban size={48} />
            </div>
            <div className={`absolute top-4 right-4 backdrop-blur-sm p-2 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-[#E50914] ${isDarkMode ? 'bg-black/90 text-white' : 'bg-white/90'}`}>
              <ExternalLink size={18} />
            </div>
          </div>
          <div className="p-4 md:p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-[#E50914]/5 text-[#E50914] rounded-md text-[10px] font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className={`font-bold text-lg mb-2 group-hover:text-[#E50914] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>{project.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
              {project.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Completed
            </div>
          </div>
        </div>
      ))}
      
      {/* Add New Project Card (Optional) */}
      <button className={`h-full min-h-[300px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 hover:text-[#E50914] hover:border-[#E50914]/50 hover:bg-[#E50914]/5 transition-all ${isDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
        <div className={`w-16 h-16 rounded-full shadow-sm flex items-center justify-center ${isDarkMode ? 'bg-[#222]' : 'bg-white'}`}>
          <Plus size={32} />
        </div>
        <span className="font-bold text-sm">Add New Project</span>
      </button>
    </div>
  );
}
