'use client';

import React, { useState, useRef } from 'react';
import { 
  X, Search, Camera, LogOut, Edit2, Shield, UserX, 
  MoreVertical, Trash2, ShieldCheck, MessageSquare
} from 'lucide-react';

// --- TYPES ---

interface GroupMember {
  id: string;
  name: string;
  avatarColor: string;
  initials: string;
  role: 'admin' | 'member';
  messageCount: number;
  joinedAt: string;
}

interface GroupInfo {
  id: string;
  name: string;
  description: string;
  avatarColor: string;
  members: GroupMember[];
}

interface GroupInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: GroupInfo;
  onUpdateGroup: (id: string, updates: Partial<GroupInfo>) => void;
  onLeaveGroup: (id: string) => void;
  onRemoveMember: (groupId: string, memberId: string) => void;
  onPromoteMember: (groupId: string, memberId: string) => void;
}

export default function GroupInfoModal({ 
  isOpen, 
  onClose, 
  group,
  onUpdateGroup,
  onLeaveGroup,
  onRemoveMember,
  onPromoteMember
}: GroupInfoModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(group.name);
  const [editedDescription, setEditedDescription] = useState(group.description);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMemberMenu, setActiveMemberMenu] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // --- HANDLERS ---

  const handleSave = () => {
    onUpdateGroup(group.id, {
      name: editedName,
      description: editedDescription
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload file and get URL
      console.log('Avatar updated:', file.name);
      // onUpdateGroup(group.id, { avatar: file });
    }
  };

  const filteredMembers = group.members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white md:rounded-3xl shadow-none md:shadow-2xl w-full md:max-w-md h-full md:h-auto md:max-h-[85vh] overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <h2 className="font-bold text-lg text-black">Group Info</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Group Header Info */}
          <div className="p-6 flex flex-col items-center gap-4 border-b border-gray-100">
            <div className="relative group">
              <div 
                className={`w-24 h-24 rounded-3xl ${group.avatarColor} flex items-center justify-center text-3xl font-bold shadow-lg overflow-hidden cursor-pointer`}
                onClick={() => isEditing && fileInputRef.current?.click()}
              >
                {group.name.substring(0, 2).toUpperCase()}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                    <Camera size={24} />
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={!isEditing}
              />
            </div>

            <div className="w-full text-center space-y-2">
              {isEditing ? (
                <input 
                  type="text" 
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full text-center text-xl font-bold text-black border-b-2 border-gray-200 focus:border-[#E50914] focus:outline-none bg-transparent py-1"
                />
              ) : (
                <h2 className="text-xl font-bold text-black">{group.name}</h2>
              )}
              
              <div className="text-sm text-gray-500">
                Group • {group.members.length} Members
              </div>
            </div>

            <div className="flex gap-2 w-full">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="flex-1 py-2 bg-[#E50914] text-white rounded-xl font-bold text-sm hover:bg-[#cc0812]"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(group.name);
                      setEditedDescription(group.description);
                    }}
                    className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-2 bg-gray-50 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit Group
                </button>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Description</h3>
            {isEditing ? (
              <textarea 
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-xl text-sm text-gray-700 border border-gray-200 focus:border-[#E50914] focus:outline-none resize-none h-24"
                placeholder="Add a group description..."
              />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">
                {group.description || "No description set."}
              </p>
            )}
          </div>

          {/* Members List */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase">Members</h3>
              <div className="text-xs text-gray-400">{filteredMembers.length} found</div>
            </div>

            {/* Search Members */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search members..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E50914] text-sm"
              />
            </div>

            <div className="space-y-1">
              {filteredMembers.map((member) => (
                <div key={member.id} className="group relative flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${member.avatarColor} flex items-center justify-center text-xs font-bold`}>
                      {member.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-800">{member.name}</span>
                        {member.role === 'admin' && (
                          <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[10px] font-bold">ADMIN</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span>{member.messageCount} messages</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <button 
                      onClick={() => setActiveMemberMenu(activeMemberMenu === member.id ? null : member.id)}
                      className="p-2 rounded-full hover:bg-gray-200 text-gray-400 transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Member Menu */}
                    {activeMemberMenu === member.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-100">
                        {member.role !== 'admin' && (
                          <button 
                            onClick={() => {
                              onPromoteMember(group.id, member.id);
                              setActiveMemberMenu(null);
                            }}
                            className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <ShieldCheck size={14} className="text-green-600" />
                            Promote to Admin
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            onRemoveMember(group.id, member.id);
                            setActiveMemberMenu(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <UserX size={14} />
                          Remove from Group
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Group Button */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <button 
              onClick={() => onLeaveGroup(group.id)}
              className="w-full py-3 bg-white border border-red-100 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <LogOut size={18} />
              Leave Group
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
