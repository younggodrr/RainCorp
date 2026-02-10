import React from 'react';
import { Users, Calendar } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  level: string;
  techStack: string[];
  teamCount: number;
  date: string;
  image: null | string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-black group-hover:text-[#E50914] transition-colors">
          {project.title}
        </h2>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            project.status === 'in-progress' ? 'bg-[#E50914]/5 text-[#E50914] border-[#E50914]/20' : 
            project.status === 'open' ? 'bg-[#F4A261]/10 text-[#d98236] border-[#F4A261]/20' : 
            'bg-gray-100 text-gray-500 border-gray-200'
          }`}>
            {project.status}
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-200">
            {project.level}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        {project.description}
      </p>

      {/* Category */}
      <div className="mb-6">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Category</span>
        <span className="text-sm font-bold text-[#F4A261]">{project.category}</span>
      </div>

      {/* Tech Stack */}
      <div className="mb-6">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Tech Stack</span>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <span key={tech} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium border border-gray-100">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-6">
        <div className="flex items-center gap-2">
          <Users size={14} />
          <span>Team: {project.teamCount} members</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{project.date}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 py-2.5 bg-[#E50914] text-white rounded-xl font-bold text-sm shadow-sm hover:bg-[#cc0812] transition-colors">
          Edit
        </button>
        <button className="flex-1 py-2.5 bg-white border border-gray-200 text-black rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}
