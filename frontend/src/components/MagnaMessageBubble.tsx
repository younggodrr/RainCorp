'use client';

import React, { useState } from 'react';
import { Edit } from 'lucide-react';

export interface MessageBubbleProps {
  id?: string;
  sender: string;
  text: string;
  time: string;
  avatar: string | React.ReactNode;
  color?: string;
  isMe?: boolean;
  onEdit?: (id: string, newText: string) => void;
  isDarkMode?: boolean;
}

export default function MagnaMessageBubble({ 
  id, 
  sender, 
  text, 
  time, 
  avatar, 
  color, 
  isMe = false, 
  onEdit, 
  isDarkMode = false 
}: MessageBubbleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleSave = () => {
    if (onEdit && id) {
      onEdit(id, editedText);
      setIsEditing(false);
    }
  };

  if (isMe) {
    return (
      <div className="flex flex-col items-end max-w-[80%] ml-auto group">
        <div className="bg-[#E50914] text-white p-4 rounded-2xl rounded-tr-none shadow-md relative">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea 
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="bg-white/10 text-white p-2 rounded w-full min-w-[200px] outline-none border border-white/20"
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setIsEditing(false)} className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30">Cancel</button>
                <button onClick={handleSave} className="text-xs bg-white text-[#E50914] px-2 py-1 rounded font-bold hover:bg-gray-100">Save</button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm leading-relaxed">{text}</p>
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded-full text-gray-500"
                title="Edit message"
              >
                <Edit size={14} />
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1 mr-1">
          <span className="text-[10px] text-gray-400 font-medium">{time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3 max-w-[80%]">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${color || (isDarkMode ? 'bg-[#222] text-gray-300' : 'bg-gray-200 text-gray-700')}`}>
        {typeof avatar === 'string' ? avatar : avatar}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2 ml-1">
          <span className={`text-xs font-bold ${color ? color.split(' ')[1] : (isDarkMode ? 'text-gray-400' : 'text-gray-700')}`}>{sender}</span>
        </div>
        <div className={`p-4 rounded-2xl rounded-tl-none border shadow-sm ${isDarkMode ? 'bg-[#111] border-[#333] text-gray-200' : 'bg-white border-gray-100 text-gray-700'}`}>
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
        <span className="text-[10px] text-gray-400 font-medium ml-1">{time}</span>
      </div>
    </div>
  );
}
