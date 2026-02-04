import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDarkMode: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isDarkMode 
}) => {
  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border disabled:opacity-50 hover:text-[#E50914] hover:border-[#E50914] transition-all shadow-sm ${isDarkMode ? 'bg-[#111] border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-400'}`}
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-sm text-gray-500">
        Page <span className="text-[#E50914] font-bold">{currentPage}</span> of {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border disabled:opacity-50 hover:text-[#E50914] hover:border-[#E50914] transition-all shadow-sm ${isDarkMode ? 'bg-[#111] border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-400'}`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
