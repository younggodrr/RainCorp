"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Phone, Video, CheckCheck, 
  LayoutDashboard, Search, MessageSquare, Settings, Edit, MoreVertical, 
  LayoutGrid, Users, MessageCircleQuestion, Menu, X, Plus, Bell,
  FileText, Image as ImageIcon, Download, Trash2
} from 'lucide-react';
import Link from 'next/link';
import LeftPanel from '@/components/LeftPanel';
import TopNavigation from '@/components/TopNavigation';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
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
  const searchParams = useSearchParams();
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Derived State
  const selectedChat = conversations.find(c => c.id === selectedChatId);

  // Handle URL Params for starting chat
  useEffect(() => {
    if (!searchParams) return;
    
    const action = searchParams.get('action');
    const name = searchParams.get('name');
    const initials = searchParams.get('initials');

    if (action === 'start_chat' && name) {
      // Check if chat already exists
      const existingChat = conversations.find(c => c.name === name && !c.isGroup);
      
      if (existingChat) {
        setSelectedChatId(existingChat.id);
      } else {
        // Create new chat
        const newChat: Conversation = {
          id: `new-chat-${Date.now()}`,
          name: name,
          lastMessage: 'I have accepted your job application.',
          time: 'Now',
          unread: 0,
          isTyping: false,
          pinned: false,
          isGroup: false,
          archived: false,
          avatarColor: 'bg-indigo-100 text-indigo-600',
          messages: [
            {
              id: `msg-init-${Date.now()}`,
              sender: 'Me',
              text: 'I have accepted your job application. Let\'s discuss the details.',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              avatar: 'ME',
              isMe: true,
              type: 'text',
              read: true
            }
          ]
        };
        
        setConversations(prev => [newChat, ...prev]);
        setSelectedChatId(newChat.id);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    window.dispatchEvent(new Event('themeChanged'));
  };

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

  const handleUpdateGroup = (id: string, updates: Partial<Conversation>) => {
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
    <div className={`h-screen font-sans flex overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      
      {/* TOP NAVIGATION BAR */}
      <div className={`${selectedChatId ? 'hidden md:block' : 'block'}`}>
        <TopNavigation 
          title="Messages" 
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          className="md:!left-0 lg:!left-0"
          searchPlaceholder="Search messages..."
          searchValue={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            <div className={`absolute top-0 left-0 w-full h-full shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left ${isDarkMode ? 'bg-black border-r border-[#E70008]/20' : 'bg-white'}`}>
              <div className={`p-4 border-b flex items-center justify-between sticky top-0 z-10 ${isDarkMode ? 'bg-black border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
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
                  className={`p-2 rounded-full hover:bg-gray-100 ${isDarkMode ? 'text-gray-400 hover:bg-[#E70008]/10' : 'text-gray-500 hover:bg-gray-100'}`}
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
                  isDarkMode={isDarkMode}
                  toggleTheme={toggleTheme}
                />
              </div>
            </div>
          </div>
        )}

      {/* MESSAGES LAYOUT */}
      <div className={`flex-1 flex overflow-hidden ${selectedChatId ? 'pt-0 md:pt-[71px]' : 'pt-[65px] md:pt-[71px]'}`}>
        
        {/* 1. CONVERSATIONS LIST (Left Panel) */}
        <div className={`w-full md:w-[320px] lg:w-[380px] border-r flex flex-col h-full ${selectedChatId ? 'hidden md:flex' : 'flex'} ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
          {/* Header */}
          <div className="p-4 md:p-6 pb-2">
            <div className="flex md:flex items-center justify-between mb-4">
                <h2 className={`font-bold text-xl md:block hidden ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Chats</h2>
                <h2 className={`font-bold text-xl md:hidden ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>Messages</h2>
                <div className="flex gap-2">
                  <button className={`p-2 rounded-full transition-colors hidden md:block ${isDarkMode ? 'hover:bg-[#222] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                    <Edit size={20} />
                  </button>
                  <button className={`p-2 rounded-full transition-colors hidden md:block ${isDarkMode ? 'hover:bg-[#222] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
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
                      : isDarkMode ? 'bg-[#222] border border-gray-700 text-gray-400 hover:bg-[#333]' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setIsDiscoverGroupsModalOpen(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${isDarkMode ? 'bg-[#222] border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white' : 'bg-white border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white'}`}
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
                  isDarkMode={isDarkMode}
                />
              ))
            )}
          </div>
        </div>

        {/* 2. CHAT WINDOW (Middle Panel) */}
        <div className={`flex-1 flex flex-col h-full md:pb-0 ${!selectedChatId ? 'hidden md:flex' : 'flex'} ${isDarkMode ? 'bg-black' : 'bg-[#FDF8F5]'}`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <ChatHeader 
                selectedChat={selectedChat}
                isDarkMode={isDarkMode}
                onBack={() => setSelectedChatId(null)}
                onOpenGroupInfo={() => setIsGroupInfoModalOpen(true)}
                onOpenContactInfo={() => setIsContactInfoModalOpen(true)}
                onArchiveChat={handleArchiveConversation}
                onDeleteChat={handleDeleteConversation}
              />

              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-center my-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${isDarkMode ? 'bg-[#222] text-gray-400' : 'bg-gray-200 text-gray-500'}`}>Today</span>
                </div>

                {selectedChat.messages.map((msg) => (
                  <MessageBubble 
                    key={msg.id}
                    message={msg}
                    onDelete={() => handleDeleteMessage(selectedChat.id, msg.id)}
                    isDarkMode={isDarkMode}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <ChatInput 
                isDarkMode={isDarkMode}
                messageInput={messageInput}
                setMessageInput={setMessageInput}
                onSendMessage={handleSendMessage}
                onAttachClick={() => setIsAttachmentModalOpen(true)}
                onFileSelect={handleFileUpload}
                fileInputRef={fileInputRef}
              />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-[#222]' : 'bg-gray-100'}`}>
                <MessageSquare size={40} className="text-gray-300" />
              </div>
              <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select a Conversation</h2>
              <p className="max-w-xs">Choose a chat from the left to start messaging or create a new group.</p>
            </div>
          )}
        </div>

        {/* 3. GROUP INFO (Right Panel) - Hidden on smaller screens */}
        {selectedChat && (
          <div className={`w-[300px] border-l hidden xl:flex flex-col h-full overflow-y-auto ${isDarkMode ? 'bg-[#111] border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-[#E70008]/20' : 'border-gray-100'}`}>
              <h3 className={`font-bold text-lg ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>
                {selectedChat.isGroup ? 'Group Info' : 'Contact Info'}
              </h3>
            </div>
            
            <div className="p-6 flex flex-col items-center text-center">
              <div className={`w-24 h-24 rounded-2xl ${selectedChat.avatarColor} flex items-center justify-center text-2xl font-bold mb-4 shadow-lg`}>
                {selectedChat.name.substring(0, 2).toUpperCase()}
              </div>
              <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{selectedChat.name}</h2>
              <p className="text-sm text-gray-500 mb-6">
                {selectedChat.isGroup ? 'Group • 12 Members' : 'Online'}
              </p>
              
              <div className="flex gap-4 w-full">
                <button className={`flex-1 py-2 rounded-lg font-medium text-xs transition-colors flex flex-col items-center gap-1 ${isDarkMode ? 'bg-[#222] text-gray-300 hover:bg-[#333]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${isDarkMode ? 'bg-[#333]' : 'bg-white'}`}>
                     <Phone size={16} />
                   </div>
                   Audio
                </button>
                <button className={`flex-1 py-2 rounded-lg font-medium text-xs transition-colors flex flex-col items-center gap-1 ${isDarkMode ? 'bg-[#222] text-gray-300 hover:bg-[#333]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${isDarkMode ? 'bg-[#333]' : 'bg-white'}`}>
                     <Video size={16} />
                   </div>
                   Video
                </button>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-6">
              <div>
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Description</h4>
                 <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                   Where Creativity Meets Strategy. Elevating brands through innovative design and captivating storytelling.
                 </p>
              </div>

              <div>
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex justify-between">
                   Media <span className="text-[#E50914] cursor-pointer">See All</span>
                 </h4>
                 <div className="grid grid-cols-3 gap-2">
                   <div className={`aspect-square rounded-lg ${isDarkMode ? 'bg-[#222]' : 'bg-gray-200'}`}></div>
                   <div className={`aspect-square rounded-lg ${isDarkMode ? 'bg-[#222]' : 'bg-gray-200'}`}></div>
                   <div className={`aspect-square rounded-lg ${isDarkMode ? 'bg-[#222]' : 'bg-gray-200'}`}></div>
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
                className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-lg border transition-all group whitespace-nowrap ${isDarkMode ? 'bg-[#111] border-[#E70008]/20 hover:bg-[#222]' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
             >
                <span className={`text-sm font-bold group-hover:text-[#E50914] ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Create Group</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#E50914] group-hover:text-white transition-all ${isDarkMode ? 'bg-[#F4A261]/20 text-[#F4A261]' : 'bg-[#F4A261]/10 text-[#F4A261]'}`}>
                  <Users size={18} />
                </div>
             </button>
             
             <button 
                onClick={() => setIsStartChatModalOpen(true)}
                className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-lg border transition-all group whitespace-nowrap ${isDarkMode ? 'bg-[#111] border-[#E70008]/20 hover:bg-[#222]' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
             >
                <span className={`text-sm font-bold group-hover:text-[#E50914] ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Start Chat</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#E50914] group-hover:text-white transition-all ${isDarkMode ? 'bg-[#E50914]/20 text-[#E50914]' : 'bg-[#E50914]/10 text-[#E50914]'}`}>
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
        isDarkMode={isDarkMode}
      />

      <StartChatModal
        isOpen={isStartChatModalOpen}
        onClose={() => setIsStartChatModalOpen(false)}
        onStartChat={handleStartChat}
        isDarkMode={isDarkMode}
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
          isDarkMode={isDarkMode}
        />
      )}

      {selectedChat && !selectedChat.isGroup && (
        <ContactInfoModal
          isOpen={isContactInfoModalOpen}
          onClose={() => setIsContactInfoModalOpen(false)}
          contact={getContactInfo(selectedChat)}
          isDarkMode={isDarkMode}
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
        isDarkMode={isDarkMode}
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
  isDarkMode?: boolean;
  onClick: () => void;
}

function ConversationItem({ name, message, time, unread, isTyping, active, avatarColor, onClick, isDarkMode }: ConversationItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
        active 
          ? isDarkMode ? 'bg-[#222] border border-[#E50914]/40' : 'bg-[#FDF8F5] border border-[#E50914]/10' 
          : isDarkMode ? 'hover:bg-[#1a1a1a] border border-transparent' : 'hover:bg-gray-50 border border-transparent'
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
          <h4 className={`text-sm truncate ${
            active 
              ? isDarkMode ? 'font-bold text-[#F4A261]' : 'font-bold text-black' 
              : isDarkMode ? 'font-semibold text-[#F4A261]' : 'font-semibold text-gray-800'
          }`}>
            {name}
          </h4>
          <span className={`text-[10px] ${unread ? 'font-bold text-[#E50914]' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {time}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className={`text-xs truncate max-w-[80%] ${
            isTyping 
              ? 'text-[#2ECC71] font-medium' 
              : unread 
                ? isDarkMode ? 'text-[#F4A261] font-semibold' : 'text-black font-semibold' 
                : isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
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
  isDarkMode?: boolean;
}

function MessageBubble({ message, onDelete, isDarkMode }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className={`flex items-end gap-3 max-w-[90%] group ${message.isMe ? 'ml-auto flex-row-reverse' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${message.isMe ? (isDarkMode ? 'bg-[#E50914] text-white' : 'bg-black text-white') : (isDarkMode ? 'bg-[#222] text-gray-300' : 'bg-gray-200 text-gray-700')}`}>
        {message.avatar}
      </div>
      
      <div className={`flex flex-col gap-1 ${message.isMe ? 'items-end' : 'items-start'}`}>
        <div className="flex items-baseline gap-2 mx-1">
          <span className={`text-xs font-bold ${!message.isMe ? 'text-[#F4A261]' : isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{message.sender}</span>
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
            : isDarkMode 
              ? 'bg-[#222] text-[#F9E4AD] rounded-tl-none border-[#E70008]/20' 
              : 'bg-black text-[#F4A261] rounded-tl-none border-[#F4A261]'
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
