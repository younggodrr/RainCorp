'use client';

import React from 'react';
import FilterPill from './FilterPill';

interface FeedFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  isDarkMode: boolean;
}

export default function FeedFilters({ activeFilter, setActiveFilter, isDarkMode }: FeedFiltersProps) {
  const filters = ['All', 'Projects', 'Opportunities', 'Posts', 'Tech News'];

  return (
    <div className="flex gap-3 mb-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map(filter => (
        <FilterPill 
          key={filter}
          label={filter} 
          active={activeFilter === filter} 
          onClick={() => setActiveFilter(filter)} 
          isDarkMode={isDarkMode} 
        />
      ))}
    </div>
  );
}
