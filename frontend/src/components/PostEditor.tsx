import React, { useRef } from 'react';
import Image from 'next/image';
import { X, Image as ImageIcon } from 'lucide-react';

interface PostEditorProps {
  content: string;
  setContent: (content: string) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDarkMode: boolean;
}

export default function PostEditor({
  content,
  setContent,
  selectedImage,
  setSelectedImage,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  isDarkMode
}: PostEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <div 
      className={`flex-1 p-4 md:p-6 flex flex-col transition-colors ${isDragOver ? 'bg-[#E50914]/5' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <textarea
        ref={textareaRef}
        placeholder="What do you want to talk about?"
        className={`w-full flex-1 resize-none text-xl focus:outline-none min-h-[150px] bg-transparent leading-relaxed ${isDarkMode ? 'text-[#F9E4AD] placeholder-gray-600' : 'text-[#444444] placeholder-gray-400'}`}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          adjustTextareaHeight();
        }}
      />

      {/* Image Preview */}
      {selectedImage && (
        <div className="relative mt-4 rounded-xl overflow-hidden group">
          <Image 
            src={selectedImage} 
            alt="Preview" 
            width={600} 
            height={400} 
            className="w-full h-auto max-h-[500px] object-cover rounded-xl border border-gray-100" 
          />
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition-all backdrop-blur-sm"
          >
            <X size={18} />
          </button>
        </div>
      )}
      
      {/* Drag & Drop Hint */}
      {isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm border-2 border-dashed border-[#E50914] rounded-3xl m-4 z-10 pointer-events-none">
          <div className="text-center">
            <ImageIcon size={48} className="mx-auto text-[#E50914] mb-2" />
            <p className="text-[#E50914] font-bold">Drop image here</p>
          </div>
        </div>
      )}
    </div>
  );
}
