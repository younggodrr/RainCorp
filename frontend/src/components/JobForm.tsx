import React from 'react';
import FileUpload from './FileUpload';

interface JobFormProps {
  isDarkMode: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function JobForm({ isDarkMode, onCancel, onSubmit }: JobFormProps) {
  return (
    <form onSubmit={onSubmit} className={`rounded-2xl md:rounded-[24px] p-5 md:p-8 shadow-sm space-y-6 ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20' : 'bg-white'}`}>
      
      {/* Job Title */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Title</label>
        <input 
          type="text" 
          placeholder="e.g. Senior Frontend Developer" 
          className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
        />
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company Name</label>
        <input 
          type="text" 
          placeholder="e.g. Magna Coders" 
          className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Description</label>
        <textarea 
          rows={6} 
          placeholder="Describe the role, responsibilities, and requirements..." 
          className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium resize-none ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
        />
      </div>

      {/* Two Column Layout for Location and Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location */}
        <div className="space-y-2">
          <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
          <input 
            type="text" 
            placeholder="e.g. Nairobi, Kenya (Remote)" 
            className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
          />
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Type</label>
          <div className="relative">
            <select className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium appearance-none cursor-pointer ${isDarkMode ? 'bg-[#222] border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}>
              <option value="">Select Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Range */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Salary Range</label>
        <input 
          type="text" 
          placeholder="e.g. Ksh 150,000 – 250,000" 
          className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
        />
      </div>

      {/* Skills/Tags */}
      <div className="space-y-2">
        <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Skills Required (comma separated)</label>
        <input 
          type="text" 
          placeholder="e.g. React, TypeScript, Tailwind CSS, Next.js" 
          className={`w-full px-4 py-3 rounded-xl border focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none transition-all text-sm font-medium ${isDarkMode ? 'bg-[#222] border-gray-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-black placeholder:text-gray-400'}`}
        />
      </div>

      {/* Attach Photo */}
      <FileUpload 
        label="Attach Image / Logo" 
        isDarkMode={isDarkMode} 
      />

      {/* Actions */}
      <div className="pt-4 flex flex-col-reverse md:flex-row gap-4">
         <button 
          type="button"
          onClick={onCancel} 
          className={`flex-1 py-3.5 border rounded-xl font-bold text-sm transition-colors text-center ${isDarkMode ? 'bg-[#222] border-gray-700 text-gray-300 hover:bg-[#333]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
          Cancel
        </button>
        <button type="submit" className="flex-1 py-3.5 bg-[#E50914] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#cc0812] transition-all active:scale-95">
          Post Opportunity
        </button>
      </div>

    </form>
  );
}
