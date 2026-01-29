"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, Video, Smile, Paperclip, Mic, Send, MoreHorizontal, CheckCheck, 
  LayoutDashboard, Search, MessageSquare, Settings, Edit, MoreVertical, 
  LayoutGrid, Users, MessageCircleQuestion, Menu, X, Plus, Bell,
  Trash2, Archive, FileText, Image as ImageIcon, Download, ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';
import CreateGroupModal from '@/components/CreateGroupModal';
import GroupInfoModal from '@/components/GroupInfoModal';
import StartChatModal from '@/components/StartChatModal';
import ContactInfoModal from '@/components/ContactInfoModal';
import AttachmentModal from '@/components/AttachmentModal';
import DiscoverGroupsModal from '@/components/DiscoverGroupsModal';

// --- TYPES ---

type MessageType = 'text' | 'file' | 'image';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  avatar: string;
  isMe: boolean;
  type: MessageType;
  fileName?: string;
  fileSize?: string;
  read?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isTyping: boolean;
  pinned: boolean;
  isGroup: boolean;
  archived: boolean;
  messages: Message[];
  avatarColor: string; // Tailwind class
}

// --- MOCK DATA GENERATORS ---

const generateMockMessages = (count: number, isGroup: boolean): Message[] => {
  const messages: Message[] = [];
  const senders = isGroup ? ['Sarah', 'Mike', 'Jessica', 'Me'] : ['Them', 'Me'];
  
  for (let i = 0; i < count; i++) {
    const isMe = Math.random() > 0.5;
    messages.push({
      id: `msg-${i}`,
      sender: isMe ? 'Me' : senders[Math.floor(Math.random() * (senders.length - 1))],
      text: isMe ? 'Just checking in on the progress.' : 'Everything is going according to plan!',
      time: '10:00 AM',
      avatar: isMe ? 'ME' : 'JD',
      isMe,
      type: 'text',
      read: true
    });
  }
  return messages;
};

const INITIAL_CONVERSATIONS: Conversation[] = [
  { 
    id: '1', 
    name: 'Kretya Studio', 
    lastMessage: 'Victor is typing...', 
    time: '4m', 
    unread: 12, 
    isTyping: true, 
    pinned: true, 
    isGroup: false, 
    archived: false,
    avatarColor: 'bg-blue-100 text-blue-600',
    messages: [
      { id: 'm1', sender: 'Kretya Studio', text: 'Hey, how is the project coming along?', time: '09:41 AM', avatar: 'KS', isMe: false, type: 'text', read: true },
      { id: 'm2', sender: 'Me', text: 'It is going great! I will send over the files shortly.', time: '09:42 AM', avatar: 'ME', isMe: true, type: 'text', read: true },
      { id: 'm3', sender: 'Kretya Studio', text: 'Perfect, looking forward to it.', time: '09:45 AM', avatar: 'KS', isMe: false, type: 'text', read: true },
    ] 
  },
  { 
    id: '2', 
    name: 'PM Okta', 
    lastMessage: 'I see, okay noted!', 
    time: '10m', 
    unread: 0, 
    isTyping: false, 
    pinned: true, 
    isGroup: false, 
    archived: false,
    avatarColor: 'bg-purple-100 text-purple-600',
    messages: generateMockMessages(5, false)
  },
  { 
    id: '3', 
    name: 'Design Team', 
    lastMessage: 'Sarah: New mockups are ready', 
    time: '15m', 
    unread: 3, 
    isTyping: false, 
    pinned: false, 
    isGroup: true, 
    archived: false,
    avatarColor: 'bg-green-100 text-green-600',
    messages: generateMockMessages(10, true)
  },
  { 
    id: '4', 
    name: 'Project Alpha', 
    lastMessage: 'Meeting at 2 PM?', 
    time: '2h', 
    unread: 0, 
    isTyping: false, 
    pinned: false, 
    isGroup: true, 
    archived: false,
    avatarColor: 'bg-yellow-100 text-yellow-600',
    messages: generateMockMessages(3, true)
  },
  { 
    id: '5', 
    name: 'Lead Frans', 
    lastMessage: 'ok, thanks!', 
    time: '1h', 
    unread: 0, 
    isTyping: false, 
    pinned: false, 
    isGroup: false, 
    archived: false,
    avatarColor: 'bg-pink-100 text-pink-600',
    messages: generateMockMessages(8, false)
  },
  { 
    id: '6', 
    name: 'Victor Yoga', 
    lastMessage: 'You can check it...', 
    time: 'now', 
    unread: 1, 
    isTyping: false, 
    pinned: false, 
    isGroup: false, 
    archived: false,
    avatarColor: 'bg-indigo-100 text-indigo-600',
    messages: generateMockMessages(2, false)
  },
];

export default function MessagesPage() {
  // State
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Messages');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [filter, setFilter] = useState<'chats' | 'groups' | 'unread' | 'archived'>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isGroupInfoModalOpen, setIsGroupInfoModalOpen] = useState(false);
  const [isStartChatModalOpen, setIsStartChatModalOpen] = useState(false);
  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState(false);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [isDiscoverGroupsModalOpen, setIsDiscoverGroupsModalOpen] = useState(false);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Derived State
  const selectedChat = conversations.find(c => c.id === selectedChatId);

  const filteredConversations = conversations.filter(c => {
    // 1. Archive Filter
    if (filter === 'archived') {
      return c.archived;
    }
    if (c.archived) return false; // Don't show archived in other tabs

    // 2. Category Filter
    if (filter === 'groups' && !c.isGroup) return false;
    if (filter === 'unread' && c.unread === 0) return false;

    // 3. Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(query) || 
        c.lastMessage.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Effects
  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages]);

  // Handlers

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageInput.trim() || !selectedChatId) return;

    const newMessage: Message = {
      id: `new-${Date.now()}`,
      sender: 'Me',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'ME',
      isMe: true,
      type: 'text',
      read: false
    };

    setConversations(prev => prev.map(c => {
      if (c.id === selectedChatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: messageInput,
          time: 'Just now'
        };
      }
      return c;
    }));

    setMessageInput('');
  };

  const handleDeleteConversation = (id: string) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      setConversations(prev => prev.filter(c => c.id !== id));
      if (selectedChatId === id) setSelectedChatId(null);
      setShowChatOptions(false);
    }
  };

  const handleDeleteMessage = (chatId: string, messageId: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          messages: c.messages.filter(m => m.id !== messageId)
        };
      }
      return c;
    }));
  };

  const handleArchiveConversation = (id: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, archived: !c.archived };
      }
      return c;
    }));
    if (selectedChatId === id) setSelectedChatId(null);
    setShowChatOptions(false);
  };

  const handleCreateGroup = (name: string, members: string[], avatar?: File) => {
    const newGroup: Conversation = {
      id: `group-${Date.now()}`,
      name,
      lastMessage: 'Group created',
      time: 'Just now',
      unread: 0,
      isTyping: false,
      pinned: false,
      isGroup: true,
      archived: false,
      avatarColor: 'bg-orange-100 text-orange-600', // In real app, generate based on name or avatar
      messages: []
    };
    
    // In a real app, you would also process the avatar file here
    
    setConversations(prev => [newGroup, ...prev]);
    setSelectedChatId(newGroup.id);
    setIsCreateGroupModalOpen(false);
    setIsActionModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedChatId) {
      const newMessage: Message = {
        id: `file-${Date.now()}`,
        sender: 'Me',
        text: `Sent a file: ${file.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: 'ME',
        isMe: true,
        type: 'file',
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        read: false
      };

      setConversations(prev => prev.map(c => {
        if (c.id === selectedChatId) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: `Sent a file: ${file.name}`,
            time: 'Just now'
          };
        }
        return c;
      }));
    }
  };

  const handleUpdateGroup = (id: string, updates: any) => {
    setConversations(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, ...updates };
      }
      return c;
    }));
  };

  const handleLeaveGroup = (id: string) => {
    if (confirm('Are you sure you want to leave this group?')) {
      setConversations(prev => prev.filter(c => c.id !== id));
      if (selectedChatId === id) setSelectedChatId(null);
      setIsGroupInfoModalOpen(false);
    }
  };

  const handleRemoveMember = (groupId: string, memberId: string) => {
    // In a real app, you would make an API call
    console.log(`Removing member ${memberId} from group ${groupId}`);
    // For mock, we can't easily modify the 'members' array inside the modal's prop without adding it to the Conversation type properly
    // But for this demo, we'll assume the modal handles the display state or we update a 'members' field if we added one to Conversation
  };

  const handlePromoteMember = (groupId: string, memberId: string) => {
    console.log(`Promoting member ${memberId} to admin in group ${groupId}`);
  };

  const handleAttachmentSelect = (type: 'document' | 'media' | 'coin') => {
    setIsAttachmentModalOpen(false);
    
    if (type === 'coin') {
      // Handle Magna Coin logic
      alert('Magna Coin transfer feature coming soon!');
      return;
    }

    if (fileInputRef.current) {
      // Set accept attribute based on type
      if (type === 'document') {
        fileInputRef.current.accept = ".pdf,.doc,.docx,.txt,.xls,.xlsx";
      } else if (type === 'media') {
        fileInputRef.current.accept = "image/*,video/*";
      }
      
      // Click the input
      fileInputRef.current.click();
    }
  };

  const handleStartChat = (friendId: string) => {
    // 1. Check if chat already exists
    const existingChat = conversations.find(c => !c.isGroup && c.id === friendId);
    
    if (existingChat) {
      setSelectedChatId(existingChat.id);
      setIsStartChatModalOpen(false);
      setIsActionModalOpen(false);
      return;
    }

    // Mock Friends Data (should be imported or shared)
    const MOCK_FRIENDS = [
      { id: 'f1', name: 'Sarah Chen', avatarColor: 'bg-pink-100 text-pink-600', initials: 'SC' },
      { id: 'f2', name: 'Mike Johnson', avatarColor: 'bg-blue-100 text-blue-600', initials: 'MJ' },
      { id: 'f3', name: 'Jessica Lee', avatarColor: 'bg-purple-100 text-purple-600', initials: 'JL' },
      { id: 'f4', name: 'David Kim', avatarColor: 'bg-green-100 text-green-600', initials: 'DK' },
      { id: 'f5', name: 'Alex Thompson', avatarColor: 'bg-orange-100 text-orange-600', initials: 'AT' },
      { id: 'f6', name: 'Emily Wilson', avatarColor: 'bg-yellow-100 text-yellow-600', initials: 'EW' },
      { id: 'f7', name: 'Ryan Garcia', avatarColor: 'bg-red-100 text-red-600', initials: 'RG' },
      { id: 'f8', name: 'Olivia Martinez', avatarColor: 'bg-indigo-100 text-indigo-600', initials: 'OM' },
    ];

    const friend = MOCK_FRIENDS.find(f => f.id === friendId);
    
    // 2. Create new chat with correct details
    const newChat: Conversation = {
      id: friendId, // Using friendId as chat ID for simplicity in this mock
      name: friend ? friend.name : 'New Chat',
      lastMessage: 'Start a conversation',
      time: 'Now',
      unread: 0,
      isTyping: false,
      pinned: false,
      isGroup: false,
      archived: false,
      avatarColor: friend ? friend.avatarColor : 'bg-indigo-100 text-indigo-600',
      messages: []
    };

    setConversations(prev => [newChat, ...prev]);
    setSelectedChatId(newChat.id);
    setIsStartChatModalOpen(false);
    setIsActionModalOpen(false);
  };

  const handleJoinGroup = (groupId: string, type: 'request' | 'paid', cost?: number) => {
    setIsDiscoverGroupsModalOpen(false);
    if (type === 'paid') {
      alert(`Payment of ${cost} Magna Coins required. Wallet integration coming soon!`);
    } else {
      alert(`Request to join group sent!`);
    }
  };

  // Mock members data generator for the modal
  const getGroupMembers = (chat: Conversation) => {
    // Return mock members based on chat
    return [
      { id: 'm1', name: 'Victor Yoga', avatarColor: 'bg-blue-100 text-blue-600', initials: 'VY', role: 'admin' as const, messageCount: 145, joinedAt: '2 months ago' },
      { id: 'm2', name: 'Sarah Chen', avatarColor: 'bg-pink-100 text-pink-600', initials: 'SC', role: 'member' as const, messageCount: 89, joinedAt: '1 month ago' },
      { id: 'm3', name: 'Mike Johnson', avatarColor: 'bg-green-100 text-green-600', initials: 'MJ', role: 'member' as const, messageCount: 34, joinedAt: '2 weeks ago' },
      { id: 'm4', name: 'You', avatarColor: 'bg-black text-white', initials: 'ME', role: 'member' as const, messageCount: 12, joinedAt: 'Just now' },
    ];
  };

  // Mock contact data generator for the modal
  const getContactInfo = (chat: Conversation) => {
    return {
      id: chat.id,
      name: chat.name,
      email: `${chat.name.toLowerCase().replace(' ', '.')}@example.com`,
      bio: 'Ux Ui designer| Author | Deep Thinker | Content Creator | Artist 🎨 💻 📽️',
      roles: ['UX Designer', 'Product Designer'],
      lookingFor: ['Networking', 'Collaboration'],
      location: 'Nairobi, Kenya',
      status: 'Available',
      connected: true,
      avatarColor: chat.avatarColor,
      initials: chat.name.substring(0, 2).toUpperCase()
    };
  };

  return (
    <div className="h-screen bg-[#FDF8F5] font-sans text-[#444444] flex overflow-hidden">
      
      {/* TOP NAVIGATION BAR */}
      <div className={`${selectedChatId ? 'hidden md:block' : 'block'}`}>
        <TopNavigation 
          title="Messages" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          className="md:!left-0 lg:!left-0"
          searchPlaceholder="Search messages..."
          searchValue={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            <div className="absolute top-0 left-0 w-full h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <Link href="/" className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E50914]">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                   </div>
                   <span className="text-lg font-bold tracking-tight">
                      <span className="text-[#F4A261]">Magna</span>
                      <span className="text-[#E50914]">Coders</span>
                   </span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 space-y-6 pb-20">
                <LeftPanel 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  closeMenu={() => setIsMobileMenuOpen(false)} 
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        )}

      {/* MESSAGES LAYOUT */}
      <div className={`flex-1 flex overflow-hidden ${selectedChatId ? 'pt-0 md:pt-[71px]' : 'pt-[65px] md:pt-[71px]'}`}>
        
        {/* 1. CONVERSATIONS LIST (Left Panel) */}
        <div className={`w-full md:w-[320px] lg:w-[380px] bg-white border-r border-gray-100 flex flex-col h-full ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
          {/* Header */}
          <div className="p-4 md:p-6 pb-2">
            <div className="flex md:flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl md:block hidden">Chats</h2>
                <h2 className="font-bold text-xl md:hidden">Messages</h2>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors hidden md:block">
                    <Edit size={20} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors hidden md:block">
                    <MoreVertical size={20} />
                  </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
              {['Chats', 'My Groups', 'Unread', 'Archived'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item.toLowerCase() === 'my groups' ? 'groups' : item.toLowerCase() as any)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    (filter === 'groups' && item === 'My Groups') || filter === item.toLowerCase()
                      ? 'bg-black text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setIsDiscoverGroupsModalOpen(true)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-white border border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white flex items-center gap-1.5"
              >
                <Users size={12} />
                Discover Groups
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-4 pb-24 md:pb-4 space-y-1">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p>No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((chat) => (
                <ConversationItem 
                  key={chat.id}
                  name={chat.name}
                  message={chat.lastMessage}
                  time={chat.time}
                  unread={chat.unread}
                  isTyping={chat.isTyping}
                  active={selectedChatId === chat.id}
                  avatarColor={chat.avatarColor}
                  onClick={() => setSelectedChatId(chat.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* 2. CHAT WINDOW (Middle Panel) */}
        <div className={`flex-1 flex flex-col bg-[#FDF8F5] h-full pb-20 md:pb-0 ${!selectedChatId ? 'hidden md:flex' : 'flex'}`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
                <div 
                  className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    if (selectedChat.isGroup) {
                      setIsGroupInfoModalOpen(true);
                    } else {
                      setIsContactInfoModalOpen(true);
                    }
                  }}
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedChatId(null);
                    }} 
                    className="md:hidden text-gray-500"
                  >
                      <ChevronLeft size={24} />
                  </button>
                  
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full ${selectedChat.avatarColor} flex items-center justify-center font-bold text-sm`}>
                      {selectedChat.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h2 className="font-bold text-black text-lg leading-tight">{selectedChat.name}</h2>
                    {selectedChat.isTyping ? (
                      <p className="text-xs text-[#2ECC71] font-medium">typing...</p>
                    ) : selectedChat.isGroup ? (
                      <p className="text-xs text-gray-500">Tap for group info</p>
                    ) : (
                      <p className="text-xs text-gray-500">Tap for contact info</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 relative">
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                    <Video size={22} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                    <Phone size={22} />
                  </button>
                  <button 
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    onClick={() => setShowChatOptions(!showChatOptions)}
                  >
                    <MoreHorizontal size={22} />
                  </button>

                  {/* Chat Options Dropdown */}
                  {showChatOptions && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                      <button 
                        onClick={() => handleArchiveConversation(selectedChat.id)}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Archive size={16} />
                        {selectedChat.archived ? 'Unarchive' : 'Archive Chat'}
                      </button>
                      <button 
                        onClick={() => handleDeleteConversation(selectedChat.id)}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete Chat
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-center my-4">
                  <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">Today</span>
                </div>

                {selectedChat.messages.map((msg) => (
                  <MessageBubble 
                    key={msg.id}
                    message={msg}
                    onDelete={() => handleDeleteMessage(selectedChat.id, msg.id)}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form 
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-[#E50914] focus-within:ring-1 focus-within:ring-[#E50914] transition-all"
                >
                  <button type="button" className="p-2 text-gray-400 hover:text-[#E50914] transition-colors">
                    <Smile size={24} />
                  </button>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileUpload} 
                  />
                  <button 
                    type="button" 
                    className="p-2 text-gray-400 hover:text-[#E50914] transition-colors"
                    onClick={() => setIsAttachmentModalOpen(true)}
                  >
                    <Paperclip size={24} />
                  </button>
                  
                  <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-black placeholder-gray-400 focus:outline-none"
                  />

                  <button type="button" className="p-2 text-gray-400 hover:text-[#E50914] transition-colors">
                    <Mic size={24} />
                  </button>
                  <button 
                    type="submit" 
                    disabled={!messageInput.trim()}
                    className="p-2 bg-[#E50914] text-white rounded-xl hover:bg-[#cc0812] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} className="ml-0.5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <MessageSquare size={40} className="text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">Select a Conversation</h2>
              <p className="max-w-xs">Choose a chat from the left to start messaging or create a new group.</p>
            </div>
          )}
        </div>

        {/* 3. GROUP INFO (Right Panel) - Hidden on smaller screens */}
        {selectedChat && (
          <div className="w-[300px] bg-white border-l border-gray-100 hidden xl:flex flex-col h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-black text-lg">
                {selectedChat.isGroup ? 'Group Info' : 'Contact Info'}
              </h3>
            </div>
            
            <div className="p-6 flex flex-col items-center text-center">
              <div className={`w-24 h-24 rounded-2xl ${selectedChat.avatarColor} flex items-center justify-center text-2xl font-bold mb-4 shadow-lg`}>
                {selectedChat.name.substring(0, 2).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-black mb-1">{selectedChat.name}</h2>
              <p className="text-sm text-gray-500 mb-6">
                {selectedChat.isGroup ? 'Group • 12 Members' : 'Online'}
              </p>
              
              <div className="flex gap-4 w-full">
                <button className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-600 font-medium text-xs hover:bg-gray-100 transition-colors flex flex-col items-center gap-1">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                     <Phone size={16} />
                   </div>
                   Audio
                </button>
                <button className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-600 font-medium text-xs hover:bg-gray-100 transition-colors flex flex-col items-center gap-1">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                     <Video size={16} />
                   </div>
                   Video
                </button>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-6">
              <div>
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Description</h4>
                 <p className="text-sm text-gray-600 leading-relaxed">
                   Where Creativity Meets Strategy. Elevating brands through innovative design and captivating storytelling.
                 </p>
              </div>

              <div>
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex justify-between">
                   Media <span className="text-[#E50914] cursor-pointer">See All</span>
                 </h4>
                 <div className="grid grid-cols-3 gap-2">
                   <div className="aspect-square bg-gray-200 rounded-lg"></div>
                   <div className="aspect-square bg-gray-200 rounded-lg"></div>
                   <div className="aspect-square bg-gray-200 rounded-lg"></div>
                 </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FLOATING ACTION BUTTON & MODAL */}
      <div className={`fixed bottom-24 right-6 md:bottom-10 md:right-10 z-40 flex-col items-end gap-4 ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        {/* Modal Options */}
        {isActionModalOpen && (
          <div className="flex flex-col gap-3 mb-2 origin-bottom-right">
             <button 
                onClick={() => setIsCreateGroupModalOpen(true)}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-lg border border-gray-100 hover:bg-gray-50 transition-all group whitespace-nowrap"
             >
                <span className="text-sm font-bold text-gray-700 group-hover:text-[#E50914]">Create Group</span>
                <div className="w-8 h-8 rounded-full bg-[#F4A261]/10 text-[#F4A261] flex items-center justify-center group-hover:bg-[#E50914] group-hover:text-white transition-all">
                  <Users size={18} />
                </div>
             </button>
             
             <button 
                onClick={() => setIsStartChatModalOpen(true)}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-lg border border-gray-100 hover:bg-gray-50 transition-all group whitespace-nowrap"
             >
                <span className="text-sm font-bold text-gray-700 group-hover:text-[#E50914]">Start Chat</span>
                <div className="w-8 h-8 rounded-full bg-[#E50914]/10 text-[#E50914] flex items-center justify-center group-hover:bg-[#E50914] group-hover:text-white transition-all">
                  <MessageSquare size={18} />
                </div>
             </button>
          </div>
        )}

        {/* FAB Trigger */}
        <button 
          onClick={() => setIsActionModalOpen(!isActionModalOpen)}
          className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 ${
            isActionModalOpen 
              ? 'bg-gray-800 rotate-45' 
              : 'bg-[#E50914]'
          }`}
        >
          <Plus size={28} strokeWidth={2.5} />
        </button>
      </div>

      <CreateGroupModal 
        isOpen={isCreateGroupModalOpen} 
        onClose={() => setIsCreateGroupModalOpen(false)} 
        onCreateGroup={handleCreateGroup} 
      />

      <StartChatModal
        isOpen={isStartChatModalOpen}
        onClose={() => setIsStartChatModalOpen(false)}
        onStartChat={handleStartChat}
      />

      {selectedChat && selectedChat.isGroup && (
        <GroupInfoModal 
          isOpen={isGroupInfoModalOpen}
          onClose={() => setIsGroupInfoModalOpen(false)}
          group={{
            id: selectedChat.id,
            name: selectedChat.name,
            description: "A group for discussing project details and updates.", // Mock description
            avatarColor: selectedChat.avatarColor,
            members: getGroupMembers(selectedChat)
          }}
          onUpdateGroup={handleUpdateGroup}
          onLeaveGroup={handleLeaveGroup}
          onRemoveMember={handleRemoveMember}
          onPromoteMember={handlePromoteMember}
        />
      )}

      {selectedChat && !selectedChat.isGroup && (
        <ContactInfoModal
          isOpen={isContactInfoModalOpen}
          onClose={() => setIsContactInfoModalOpen(false)}
          contact={getContactInfo(selectedChat)}
        />
      )}

      <AttachmentModal
        isOpen={isAttachmentModalOpen}
        onClose={() => setIsAttachmentModalOpen(false)}
        onSelectType={handleAttachmentSelect}
      />

      <DiscoverGroupsModal
        isOpen={isDiscoverGroupsModalOpen}
        onClose={() => setIsDiscoverGroupsModalOpen(false)}
        onJoinGroup={handleJoinGroup}
      />

    </div>
  );
}

// --- SUBCOMPONENTS ---

interface ConversationItemProps {
  name: string;
  message: string;
  time: string;
  unread?: number;
  isTyping?: boolean;
  active: boolean;
  avatarColor: string;
  onClick: () => void;
}

function ConversationItem({ name, message, time, unread, isTyping, active, avatarColor, onClick }: ConversationItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
        active ? 'bg-[#FDF8F5] border border-[#E50914]/10' : 'hover:bg-gray-50 border border-transparent'
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center font-bold text-sm overflow-hidden`}>
           {name.substring(0, 2).toUpperCase()}
        </div>
        {isTyping && (
           <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h4 className={`text-sm truncate ${active ? 'font-bold text-black' : 'font-semibold text-gray-800'}`}>
            {name}
          </h4>
          <span className={`text-[10px] ${unread ? 'font-bold text-[#E50914]' : 'text-gray-400'}`}>
            {time}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className={`text-xs truncate max-w-[80%] ${isTyping ? 'text-[#2ECC71] font-medium' : unread ? 'text-black font-semibold' : 'text-gray-500'}`}>
            {message}
          </p>
          
          {unread && unread > 0 && (
            <div className="w-5 h-5 rounded-full bg-[#E50914] text-white flex items-center justify-center text-[10px] font-bold">
              {unread}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface MessageBubbleProps {
  message: Message;
  onDelete: () => void;
}

function MessageBubble({ message, onDelete }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className={`flex items-end gap-3 max-w-[90%] group ${message.isMe ? 'ml-auto flex-row-reverse' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${message.isMe ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}>
        {message.avatar}
      </div>
      
      <div className={`flex flex-col gap-1 ${message.isMe ? 'items-end' : 'items-start'}`}>
        <div className="flex items-baseline gap-2 mx-1">
          <span className="text-xs font-bold text-gray-700">{message.sender}</span>
          {showActions && message.isMe && (
            <button 
              onClick={onDelete}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete message"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
        
        <div className={`p-4 rounded-2xl shadow-sm border ${
          message.isMe 
            ? 'bg-[#E50914] text-white rounded-tr-none border-[#E50914]' 
            : 'bg-white text-gray-700 rounded-tl-none border-gray-100'
        }`}>
          {message.type === 'text' && (
            <p className="text-sm leading-relaxed">{message.text}</p>
          )}
          
          {message.type === 'file' && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm font-bold truncate max-w-[150px]">{message.fileName}</p>
                <p className="text-xs opacity-70">{message.fileSize}</p>
              </div>
              <button className="p-1 hover:bg-white/20 rounded-full transition-colors ml-2">
                <Download size={16} />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 mx-1">
           <span className="text-[10px] text-gray-400 font-medium">{message.time}</span>
           {message.isMe && (
              <CheckCheck size={12} className={message.read ? "text-[#E50914]" : "text-gray-300"} />
           )}
        </div>
      </div>
    </div>
  )
}
