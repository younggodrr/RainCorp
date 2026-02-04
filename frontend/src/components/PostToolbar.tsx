import React, { useRef } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  BarChart2, 
  Paperclip, 
  Hash, 
  Smile, 
  Calendar,
  Loader2
} from 'lucide-react';

interface PostToolbarProps {
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contentLength: number;
  isSubmitting: boolean;
  onPost: () => void;
  canPost: boolean;
  isDarkMode: boolean;
}

export default function PostToolbar({
  onImageSelect,
  contentLength,
  isSubmitting,
  onPost,
  canPost,
  isDarkMode
}: PostToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 md:p-6 pt-2">
       <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#E50914] hover:bg-[#E50914]/20' : 'text-[#E50914] hover:bg-[#E50914]/10'}`} title="Add Image" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon size={22} />
          </button>
          <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Add Video">
            <Video size={22} />
          </button>
          <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Create Poll">
            <BarChart2 size={22} />
          </button>
          <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Add Document">
            <Paperclip size={22} />
          </button>
          <div className={`w-px h-6 mx-1 ${isDarkMode ? 'bg-[#333]' : 'bg-gray-200'}`}></div>
          <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Add Hashtag">
            <Hash size={22} />
          </button>
          <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Emoji">
            <Smile size={22} />
          </button>
          <button className={`p-2 rounded-full transition-colors ml-auto ${isDarkMode ? 'text-gray-400 hover:bg-[#222] hover:text-[#E50914]' : 'text-gray-500 hover:bg-gray-100 hover:text-[#E50914]'}`} title="Schedule">
            <Calendar size={22} />
          </button>
       </div>

      <div className={`flex items-center justify-between border-t pt-4 ${isDarkMode ? 'border-[#333]' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={onImageSelect}
          />
          <span className={`text-xs font-medium transition-colors ${contentLength > 280 ? 'text-red-500' : 'text-gray-400'}`}>
            {contentLength}/3000
          </span>
        </div>

        {/* Desktop Post Button */}
        <button 
          onClick={onPost}
          disabled={!canPost || isSubmitting}
          className="hidden md:flex items-center gap-2 px-8 py-2.5 rounded-full bg-[#E50914] text-white font-bold hover:bg-[#cc0812] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isSubmitting && <Loader2 size={18} className="animate-spin" />}
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}
