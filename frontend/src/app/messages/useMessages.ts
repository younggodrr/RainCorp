import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_CONVERSATIONS, Conversation, Message } from '@/utils/mockData';
import { MOCK_FRIENDS } from './constants';

export function useMessages() {
  const searchParams = useSearchParams();
  
  // State
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
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
    console.log(`Removing member ${memberId} from group ${groupId}`);
  };

  const handlePromoteMember = (groupId: string, memberId: string) => {
    console.log(`Promoting member ${memberId} to admin in group ${groupId}`);
  };

  const handleAttachmentSelect = (type: 'document' | 'media' | 'coin') => {
    setIsAttachmentModalOpen(false);
    
    if (type === 'coin') {
      alert('Magna Coin transfer feature coming soon!');
      return;
    }

    if (fileInputRef.current) {
      if (type === 'document') {
        fileInputRef.current.accept = ".pdf,.doc,.docx,.txt,.xls,.xlsx";
      } else if (type === 'media') {
        fileInputRef.current.accept = "image/*,video/*";
      }
      fileInputRef.current.click();
    }
  };

  const handleStartChat = (friendId: string) => {
    const existingChat = conversations.find(c => !c.isGroup && c.id === friendId);
    
    if (existingChat) {
      setSelectedChatId(existingChat.id);
      setIsStartChatModalOpen(false);
      setIsActionModalOpen(false);
      return;
    }

    const friend = MOCK_FRIENDS.find(f => f.id === friendId);
    
    const newChat: Conversation = {
      id: friendId, 
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

  return {
    // State
    conversations,
    selectedChatId,
    setSelectedChatId,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeTab,
    setActiveTab,
    isActionModalOpen,
    setIsActionModalOpen,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    messageInput,
    setMessageInput,
    showChatOptions,
    setShowChatOptions,
    isCreateGroupModalOpen,
    setIsCreateGroupModalOpen,
    isGroupInfoModalOpen,
    setIsGroupInfoModalOpen,
    isStartChatModalOpen,
    setIsStartChatModalOpen,
    isContactInfoModalOpen,
    setIsContactInfoModalOpen,
    isAttachmentModalOpen,
    setIsAttachmentModalOpen,
    isDiscoverGroupsModalOpen,
    setIsDiscoverGroupsModalOpen,
    isDarkMode,
    toggleTheme,

    // Refs
    fileInputRef,
    messagesEndRef,

    // Derived State
    selectedChat,
    filteredConversations,

    // Handlers
    handleSendMessage,
    handleDeleteConversation,
    handleDeleteMessage,
    handleArchiveConversation,
    handleCreateGroup,
    handleFileUpload,
    handleUpdateGroup,
    handleLeaveGroup,
    handleRemoveMember,
    handlePromoteMember,
    handleAttachmentSelect,
    handleStartChat,
    handleJoinGroup
  };
}
