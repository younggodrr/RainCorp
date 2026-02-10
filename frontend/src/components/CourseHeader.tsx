import React from 'react';
import { Star, Users, Clock, PlayCircle } from 'lucide-react';
import { CourseDetail } from '@/app/magna-school/[id]/constants';

interface CourseHeaderProps {
  course: CourseDetail;
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-[#E50914]/10 text-[#E50914] text-xs font-bold rounded-full">
          {course.category}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
          {course.level}
        </span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {course.description}
      </p>

      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-1 text-[#F4A261] font-bold">
          <Star size={16} fill="currentColor" />
          <span>{course.rating}</span>
          <span className="text-gray-400 font-normal underline">({course.students} ratings)</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{course.students.toLocaleString()} students</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>Last updated {course.lastUpdated}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
             {course.instructor.avatar}
           </div>
           <div>
             <p className="text-sm text-gray-500">Created by</p>
             <p className="font-bold text-gray-900 hover:underline cursor-pointer">{course.instructor.name}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
