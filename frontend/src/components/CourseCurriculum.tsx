import React, { useState } from 'react';
import { MonitorPlay, FileText } from 'lucide-react';
import { CurriculumSection } from '@/app/magna-school/[id]/constants';

interface CourseCurriculumProps {
  curriculum: CurriculumSection[];
  totalVideos: number;
  totalDuration: string;
}

export default function CourseCurriculum({ curriculum, totalVideos, totalDuration }: CourseCurriculumProps) {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div>
      <h3 className="font-bold text-xl mb-4 text-gray-900">Course Content</h3>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>{curriculum.length} sections</span>
        <span>•</span>
        <span>{totalVideos} lectures</span>
        <span>•</span>
        <span>{totalDuration} total length</span>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        {curriculum.map((section, idx) => (
          <div key={idx} className="border-b border-gray-100 last:border-0">
            <button 
              onClick={() => setActiveSection(activeSection === idx ? -1 : idx)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className={`transform transition-transform ${activeSection === idx ? 'rotate-180' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="font-bold text-gray-800">{section.title}</span>
              </div>
              <span className="text-xs text-gray-500">{section.videos} lectures • {section.duration}</span>
            </button>
            
            {activeSection === idx && (
              <div className="bg-white">
                {section.lessons.map((lesson, lIdx) => (
                  <div key={lIdx} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      {lesson.type === 'video' ? (
                        <MonitorPlay size={16} className="text-gray-400 group-hover:text-[#E50914]" />
                      ) : (
                        <FileText size={16} className="text-gray-400 group-hover:text-[#E50914]" />
                      )}
                      <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {lesson.isFree && (
                        <span className="text-xs text-[#E50914] font-medium">Preview</span>
                      )}
                      <span className="text-xs text-gray-400">{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
