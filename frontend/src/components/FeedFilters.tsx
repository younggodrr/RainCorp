
'use client';
import React, { useEffect, useState } from 'react';
import FilterPill from './FilterPill';
import { tagService, Tag } from '@/services/tagService';

interface FeedFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  isDarkMode: boolean;
}

export default function FeedFilters({ activeFilter, setActiveFilter, isDarkMode }: FeedFiltersProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const filters = ['All', 'Projects', 'Opportunities', 'Posts', 'Tech News'];

  useEffect(() => {
    tagService.getAll().then(setTags).catch(() => setTags([]));
  }, []);

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
      {tags.map(tag => (
        <FilterPill
          key={tag.id}
          label={tag.name}
          active={activeFilter === tag.name}
          onClick={() => setActiveFilter(tag.name)}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
}
