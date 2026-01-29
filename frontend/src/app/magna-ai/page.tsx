'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users,
  Settings, 
  Plus, 
  BookOpen, 
  FolderKanban,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  ChevronRight,
  ChevronLeft,
  Bot,
  Zap,
  Bug,
  Globe,
  Sparkles,
  ArrowRight,
  Send,
  Paperclip,
  Image as ImageIcon,
  Mic,
  History,
  PanelLeftClose,
  PanelLeftOpen,
  MoreVertical,
  Edit,
  Menu,
  Bell,
  Search,
  Archive,
  Share2,
  Flag,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MagnaNewIcon from '@/components/MagnaNewIcon';
import Toast from '@/components/Toast';

interface MessageBubbleProps {
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

function MessageBubble({ id, sender, text, time, avatar, color, isMe = false, onEdit, isDarkMode = false }: MessageBubbleProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(text);

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

interface ChatSession {
  id: string;
  title: string;
  category: 'Today' | 'Yesterday' | 'Previous 7 Days';
  isArchived: boolean;
}

export default function MagnaAIPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Magna AI');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageBubbleProps[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toastConfig, setToastConfig] = useState({ isVisible: false, message: '' });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mobileInputRef = useRef<HTMLTextAreaElement>(null);
  const desktopInputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }

    // Listen for theme changes
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('theme');
      setIsDarkMode(currentTheme === 'dark');
    };

    window.addEventListener('themeChanged', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);

    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const [conversations, setConversations] = useState<ChatSession[]>([
    { id: '1', title: 'React Component optimization', category: 'Today', isArchived: false },
    { id: '2', title: 'Debug API Integration', category: 'Today', isArchived: false },
    { id: '3', title: 'Project Architecture Planning', category: 'Yesterday', isArchived: false },
    { id: '4', title: 'Tailwind CSS Grid Layout', category: 'Yesterday', isArchived: false },
    { id: '5', title: 'Next.js App Router', category: 'Yesterday', isArchived: false },
    { id: '6', title: 'Authentication Flow', category: 'Previous 7 Days', isArchived: false },
    { id: '7', title: 'Database Schema Design', category: 'Previous 7 Days', isArchived: false },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    [mobileInputRef, desktopInputRef].forEach(ref => {
      if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${Math.min(ref.current.scrollHeight, 80)}px`;
      }
    });
  }, [searchQuery]);

  const handleServiceClick = (service: string) => {
    setSelectedChat(service);
    const userMsg: MessageBubbleProps = {
      id: Date.now().toString(),
      sender: 'John Doe',
      text: `I'm interested in ${service}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'JD',
      isMe: true
    };
    setMessages([userMsg]);
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      let responseText = '';
      switch (service) {
        case 'Job Opportunities':
          responseText = "Great! We have several open positions for developers and designers. Are you looking for a specific role or stack?";
          break;
        case 'Search Builders & Collabs':
          responseText = "I can help you find builders and collaborators for your next project. What skills are you looking for?";
          break;
        case 'Debug Code':
          responseText = "Sure, I can help debug your code. Please paste the snippet you're having trouble with.";
          break;
        default:
          responseText = `How can I help you with ${service} today?`;
      }

      const aiMsg: MessageBubbleProps = {
        id: (Date.now() + 1).toString(),
        sender: 'Magna AI',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
        color: 'bg-red-100'
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!searchQuery.trim()) return;

    if (!selectedChat) {
      // Start a new generic chat if none selected
      setSelectedChat("New Conversation");
      setMessages([]);
    }

    const userMsg: MessageBubbleProps = {
      id: Date.now().toString(),
      sender: 'John Doe',
      text: searchQuery,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'JD',
      isMe: true
    };

    setMessages(prev => [...prev, userMsg]);
    setSearchQuery('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: MessageBubbleProps = {
        id: (Date.now() + 1).toString(),
        sender: 'Magna AI',
        text: "I understand. Could you provide more details so I can assist you better?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
        color: 'bg-red-100'
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleEditMessage = (id: string, newText: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, text: newText } : msg
    ));
  };

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
      id: newChatId,
      title: 'New Conversation',
      category: 'Today',
      isArchived: false
    };
    setConversations(prev => [newChat, ...prev]);
    handleChatSelect('New Conversation');
  };

  const handleArchiveChat = () => {
    if (selectedChat) {
      setConversations(prev => prev.map(chat => 
        chat.title === selectedChat ? { ...chat, isArchived: !chat.isArchived } : chat
      ));
      setSelectedChat(null); // Return to home after archiving
      setShowChatOptions(false);
      setToastConfig({ isVisible: true, message: 'Chat archived' });
    }
  };

  const handleDeleteClick = () => {
    setShowChatOptions(false);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedChat) {
      setConversations(prev => prev.filter(chat => chat.title !== selectedChat));
      setSelectedChat(null); // Return to home after deleting
      setShowDeleteConfirm(false);
      setToastConfig({ isVisible: true, message: 'Chat deleted' });
    }
  };

  const handleChatSelect = (chatName: string) => {
    setSelectedChat(chatName);
    setIsHistoryOpen(false); // Close history on mobile when chat selected
    // Reset messages for history items (simulated) with scrollable content
    const mockMessages: MessageBubbleProps[] = [
        {
            id: '1',
            sender: 'Magna AI',
            text: `Hello! I see you're interested in ${chatName}. How can I help you with that today?`,
            time: "10:00 AM",
            avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
            color: 'bg-red-100'
        },
        {
            id: '2',
            sender: 'John Doe',
            text: "I've been working on this for a while but running into some issues.",
            time: "10:05 AM",
            avatar: 'JD',
            isMe: true
        },
        {
            id: '3',
            sender: 'Magna AI',
            text: "I understand. Can you describe the specific errors or behaviors you're observing?",
            time: "10:06 AM",
            avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
            color: 'bg-red-100'
        },
        {
            id: '4',
            sender: 'John Doe',
            text: "It seems like a state management problem. The component doesn't update when the data changes.",
            time: "10:10 AM",
            avatar: 'JD',
            isMe: true
        },
        {
            id: '5',
            sender: 'Magna AI',
            text: "That sounds like it could be related to how you're using useEffect or useState. Are you mutating state directly?",
            time: "10:11 AM",
            avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
            color: 'bg-red-100'
        },
        {
            id: '6',
            sender: 'John Doe',
            text: "I might be. Let me check my reducer logic.",
            time: "10:15 AM",
            avatar: 'JD',
            isMe: true
        },
        {
            id: '7',
            sender: 'Magna AI',
            text: "Also check if you are passing the correct dependencies to your effect hooks.",
            time: "10:16 AM",
            avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
            color: 'bg-red-100'
        }
    ];
    setMessages(mockMessages);
  };

  return (
    <div className={`h-[100dvh] font-sans flex overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-[#F9E4AD]' : 'bg-[#FDF8F5] text-[#444444]'}`}>
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 w-full transition-all duration-300 relative h-full flex overflow-hidden">
        
        {/* MOBILE BACKDROP */}
        {isHistoryOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsHistoryOpen(false)}
          />
        )}

        {/* HISTORY PANEL (Retractable) */}
        <div className={`border-r flex flex-col transition-all duration-300 overflow-hidden fixed left-0 md:relative z-[100] md:z-auto top-0 md:top-0 bottom-[80px] md:bottom-auto md:h-full ${isHistoryOpen ? 'w-[260px]' : 'w-0 md:w-[72px]'} ${isDarkMode ? 'bg-black border-[#E70008]/20' : 'bg-[#F9F9F9] border-gray-200'}`}>
           <div className={`p-4 flex items-center ${isHistoryOpen ? 'justify-between' : 'flex-col gap-4'}`}>
              <button 
                onClick={handleNewChat}
                className={`flex items-center gap-2 text-sm font-semibold rounded-lg transition-colors ${isHistoryOpen ? 'flex-1 px-3 py-2' : 'p-2 justify-center w-full'} ${isDarkMode ? 'text-gray-300 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-200'}`}
                title="New Chat"
              >
                 <Plus size={20} />
                 {isHistoryOpen && <span>New Chat</span>}
              </button>
              <button 
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-[#222]' : 'text-gray-500 hover:text-black hover:bg-gray-200'}`}
                title={isHistoryOpen ? "Collapse" : "Expand"}
              >
                 {isHistoryOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
              </button>
           </div>

           <div className={`flex-1 overflow-y-auto py-2 space-y-6 ${isHistoryOpen ? 'px-2' : 'px-2 scrollbar-hide'}`}>
              {isHistoryOpen ? (
                <>
                  {/* Today */}
                  {conversations.some(c => c.category === 'Today' && !c.isArchived) && (
                    <div>
                       <h4 className="px-2 text-xs font-bold text-gray-400 uppercase mb-2">Today</h4>
                       <div className="space-y-1">
                          {conversations.filter(c => c.category === 'Today' && !c.isArchived).map(chat => (
                            <button 
                              key={chat.id}
                              onClick={() => handleChatSelect(chat.title)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${selectedChat === chat.title ? (isDarkMode ? 'bg-[#222] font-semibold text-white' : 'bg-gray-200 font-semibold text-gray-900') : (isDarkMode ? 'text-gray-400 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-200')}`}
                            >
                               {chat.title}
                            </button>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* Yesterday */}
                  {conversations.some(c => c.category === 'Yesterday' && !c.isArchived) && (
                    <div>
                       <h4 className="px-2 text-xs font-bold text-gray-400 uppercase mb-2">Yesterday</h4>
                       <div className="space-y-1">
                          {conversations.filter(c => c.category === 'Yesterday' && !c.isArchived).map(chat => (
                            <button 
                              key={chat.id}
                              onClick={() => handleChatSelect(chat.title)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${selectedChat === chat.title ? (isDarkMode ? 'bg-[#222] font-semibold text-white' : 'bg-gray-200 font-semibold text-gray-900') : (isDarkMode ? 'text-gray-400 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-200')}`}
                            >
                               {chat.title}
                            </button>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* Previous 7 Days */}
                  {conversations.some(c => c.category === 'Previous 7 Days' && !c.isArchived) && (
                    <div>
                       <h4 className="px-2 text-xs font-bold text-gray-400 uppercase mb-2">Previous 7 Days</h4>
                       <div className="space-y-1">
                          {conversations.filter(c => c.category === 'Previous 7 Days' && !c.isArchived).map(chat => (
                            <button 
                              key={chat.id}
                              onClick={() => handleChatSelect(chat.title)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${selectedChat === chat.title ? (isDarkMode ? 'bg-[#222] font-semibold text-white' : 'bg-gray-200 font-semibold text-gray-900') : (isDarkMode ? 'text-gray-400 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-200')}`}
                            >
                               {chat.title}
                            </button>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* Archived Section */}
                  {conversations.some(c => c.isArchived) && (
                    <div>
                       <h4 className="px-2 text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
                         <Archive size={12} />
                         Archived
                       </h4>
                       <div className="space-y-1 opacity-70">
                          {conversations.filter(c => c.isArchived).map(chat => (
                            <button 
                              key={chat.id}
                              onClick={() => handleChatSelect(chat.title)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${selectedChat === chat.title ? (isDarkMode ? 'bg-[#222] font-semibold text-white' : 'bg-gray-200 font-semibold text-gray-900') : (isDarkMode ? 'text-gray-400 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-200')}`}
                            >
                               {chat.title}
                            </button>
                          ))}
                       </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 pt-2 opacity-50">
                   {/* Icons only for collapsed state - simplified visualization of history */}
                   <div className="w-8 h-1 rounded-full bg-gray-300"></div>
                   <div className="w-8 h-1 rounded-full bg-gray-300"></div>
                   <div className="w-8 h-1 rounded-full bg-gray-300"></div>
                </div>
              )}
           </div>


        </div>

        {/* CHAT INTERFACE CONTAINER */}
        <div className="flex-1 flex flex-col relative h-full">

          {/* Notification Icon (Top Right) */}
          <div className={`absolute top-4 right-4 ${selectedChat ? 'z-0' : 'z-30'}`}>
            <button className="relative p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Bell size={24} className="text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E50914] rounded-full"></span>
            </button>
          </div>

          {/* Desktop Back Button (Top Left) */}
          {!selectedChat && (
            <div className="absolute top-4 left-4 z-30 hidden md:block">
              <button 
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-700"
                title="Go Back"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
          )}

          {/* Mobile History Toggle (Top Left) */}
          <div className={`absolute top-4 left-4 md:hidden ${selectedChat ? 'z-0' : 'z-30'}`}>
            <button 
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <PanelLeftOpen size={24} className="text-gray-700" />
            </button>
          </div>
        

        {/* AI INTERFACE CONTENT */}
        <div className="flex-1 flex flex-col h-full relative">
          
          {selectedChat ? (
            /* ACTIVE CHAT VIEW */
            <div className="flex-1 flex flex-col h-full">
              {/* Chat Header */}
              <div className={`px-6 py-4 border-b flex items-center justify-between sticky top-0 z-10 pt-4 ${isDarkMode ? 'bg-black border-[#E70008]/20' : 'bg-white border-gray-100'}`}>
                 <div className="flex items-center gap-3">
                   <button 
                     onClick={() => setSelectedChat(null)}
                     className={`p-2 -ml-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222]' : 'text-gray-500 hover:bg-gray-100'}`}
                   >
                     <ChevronLeft size={24} />
                   </button>
                   <div>
                     <h2 className={`font-bold text-lg ${isDarkMode ? 'text-[#F9E4AD]' : 'text-black'}`}>{selectedChat}</h2>
                   </div>
                 </div>
                 <div className="flex items-center gap-2 relative">
                   <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222]' : 'text-gray-400 hover:bg-gray-100'}`}>
                     <Search size={20} />
                   </button>
                   <button 
                     onClick={() => setShowChatOptions(!showChatOptions)}
                     className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#222]' : 'text-gray-400 hover:bg-gray-100'}`}
                   >
                     <MoreVertical size={20} />
                   </button>

                   <AnimatePresence>
                     {showChatOptions && (
                       <motion.div
                         initial={{ opacity: 0, scale: 0.9, y: 10 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.9, y: 10 }}
                         className={`absolute top-12 right-0 rounded-xl shadow-lg border py-2 min-w-[160px] z-50 ${isDarkMode ? 'bg-[#111] border-[#333]' : 'bg-white border-gray-100'}`}
                       >
                         <button 
                           onClick={handleArchiveChat}
                           className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-50'}`}
                         >
                           <Archive size={16} />
                           <span>Archive</span>
                         </button>
                         <button className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-50'}`}>
                           <Share2 size={16} />
                           <span>Share</span>
                         </button>
                         <button className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-[#222]' : 'text-gray-700 hover:bg-gray-50'}`}>
                           <Flag size={16} />
                           <span>Report</span>
                         </button>
                         <div className={`h-px my-1 ${isDarkMode ? 'bg-[#333]' : 'bg-gray-100'}`} />
                         <button 
                          onClick={handleDeleteClick}
                          className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm text-red-600 ${isDarkMode ? 'hover:bg-[#222]' : 'hover:bg-red-50'}`}
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-6 pb-40 overflow-y-auto">
                 <div className="flex justify-center my-4">
                   <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">Today</span>
                 </div>
                 
                 <AnimatePresence>
                   {messages.map((msg, index) => (
                     <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MessageBubble {...msg} onEdit={handleEditMessage} isDarkMode={isDarkMode} />
                    </motion.div>
                   ))}
                 </AnimatePresence>

                 {isTyping && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-end gap-3 max-w-[80%]"
                    >
                         <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 bg-red-100 text-red-800">
                            AI
                         </div>
                         <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1] }} 
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                className="w-2 h-2 bg-gray-400 rounded-full" 
                            />
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1] }} 
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                className="w-2 h-2 bg-gray-400 rounded-full" 
                            />
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1] }} 
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                className="w-2 h-2 bg-gray-400 rounded-full" 
                            />
                         </div>
                    </motion.div>
                 )}
                 <div ref={messagesEndRef} />
              </div>
            </div>
          ) : (
            /* DEFAULT GREETING VIEW */
            <div className="flex-1 overflow-y-auto px-6 md:px-8 pt-20 md:pt-24 pb-40 md:pb-8 flex flex-col items-start justify-start w-full max-w-4xl mx-auto gap-8">
              {/* Greeting */}
              <div className="w-full text-left">

                <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 text-[#F4A261] flex items-center gap-2">
                  <MagnaNewIcon className="w-8 h-8 text-[#E50914]" />
                  <span className="font-bold">Hi <span className="text-[#E50914]">John</span></span>
                </h1>
                <p className="text-2xl md:text-4xl font-medium text-[#F4A261] leading-snug break-words max-w-full">
                  I help you solve technical problems, design systems, write code, and turn ideas into working software — fast.
                </p>
            </div>

            {/* Desktop Input Area */}
            <div className="hidden md:block w-full">
               <div className={`relative flex items-end rounded-[28px] px-4 py-2 shadow-sm border transition-colors ${isDarkMode ? 'bg-[#111] border-[#333]' : 'bg-[#F0F4F9] border-transparent hover:border-gray-200'}`}>
                  <button className={`p-2 rounded-full transition-colors mr-2 flex-shrink-0 mb-1 ${isDarkMode ? 'hover:bg-[#222] text-[#F4A261]' : 'hover:bg-gray-200 text-[#F4A261]'}`}>
                     <Plus size={24} />
                  </button>
                  <textarea 
                    ref={desktopInputRef}
                    placeholder="Ask Magna AI" 
                    className={`flex-1 bg-transparent border-none focus:outline-none text-base min-w-0 resize-none py-3 overflow-hidden ${isDarkMode ? 'text-gray-200 placeholder-[#F4A261]' : 'text-gray-700 placeholder-[#F4A261]'}`}
                    rows={1}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="flex items-center gap-2 flex-shrink-0 mb-1">
                     <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#222] text-[#F4A261]' : 'hover:bg-gray-200 text-[#F4A261]'}`}>
                        <ImageIcon size={20} />
                     </button>
                     <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#222] text-[#F4A261]' : 'hover:bg-gray-200 text-[#F4A261]'}`}>
                        <Mic size={20} />
                     </button>
                     <button 
                        onClick={handleSendMessage}
                        className="p-2 rounded-full bg-[#E50914] text-white hover:bg-[#b80710] transition-colors"
                     >
                        <Send size={18} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Services Section */}
              <div className="w-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-3 md:gap-4">
                    {/* Job Opportunities */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleServiceClick('Job Opportunities')}
                      className={`flex items-center gap-3 px-5 py-2 rounded-full transition-colors w-fit md:w-auto min-h-[48px] shadow-sm bg-[#E50914] hover:bg-[#cc0812]`}
                    >
                      <div className={`flex items-center justify-center flex-shrink-0 text-white`}>
                        <Briefcase size={18} />
                      </div>
                      <span className={`font-medium text-sm text-black`}>Job Opportunities</span>
                    </motion.button>

                    {/* Search Builders & Collabs */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleServiceClick('Search Builders & Collabs')}
                      className={`flex items-center gap-3 px-5 py-2 rounded-full transition-colors w-fit md:w-auto min-h-[48px] shadow-sm bg-[#E50914] hover:bg-[#cc0812]`}
                    >
                      <div className={`flex items-center justify-center flex-shrink-0 text-white`}>
                        <Users size={18} />
                      </div>
                      <span className={`font-medium text-sm text-black`}>Search Builders & Collabs</span>
                    </motion.button>

                    {/* Debug Code */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleServiceClick('Debug Code')}
                      className={`flex items-center gap-3 px-5 py-2 rounded-full transition-colors w-fit md:w-auto min-h-[48px] shadow-sm bg-[#E50914] hover:bg-[#cc0812]`}
                    >
                      <div className={`flex items-center justify-center flex-shrink-0 text-white`}>
                        <Bug size={18} />
                      </div>
                      <span className={`font-medium text-sm text-black`}>Debug Code</span>
                    </motion.button>
                  </div>
              </div>
            </div>
          )}

          {/* Fixed Bottom Input Area for Desktop */}
          {selectedChat && (
            <div className="hidden md:block absolute bottom-6 left-0 right-0 px-8 z-20">
              <div className="max-w-4xl mx-auto w-full">
                <div className={`relative flex items-end rounded-[28px] px-4 py-2 shadow-lg border transition-colors ${isDarkMode ? 'bg-[#111] border-[#333]' : 'bg-white border-gray-100'}`}>
                  <button className={`p-2 rounded-full transition-colors mr-2 flex-shrink-0 mb-1 ${isDarkMode ? 'hover:bg-[#222] text-[#F4A261]' : 'hover:bg-gray-100 text-[#F4A261]'}`}>
                     <Plus size={24} />
                  </button>
                  <textarea 
                  ref={desktopInputRef}
                  placeholder="Ask Magna AI" 
                  className={`flex-1 bg-transparent border-none focus:outline-none text-base min-w-0 resize-none py-3 overflow-hidden ${isDarkMode ? 'text-gray-200 placeholder-[#F4A261]' : 'text-gray-700 placeholder-[#F4A261]'}`}
                  rows={1}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex items-center gap-2 flex-shrink-0 mb-1">
                     <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#222] text-[#F4A261]' : 'hover:bg-gray-100 text-[#F4A261]'}`}>
                        <ImageIcon size={20} />
                     </button>
                     <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#222] text-[#F4A261]' : 'hover:bg-gray-100 text-[#F4A261]'}`}>
                        <Mic size={20} />
                     </button>
                     <button 
                        onClick={handleSendMessage}
                        className="p-2 rounded-full bg-[#E50914] text-white hover:bg-[#b80710] transition-colors"
                     >
                        <Send size={18} />
                     </button>
                  </div>
                </div>
                <div className="text-center mt-2">
                   <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Magna AI can make mistakes. Check important info.</p>
                </div>
              </div>
            </div>
          )}

          {/* Fixed Bottom Input Area for Mobile */}
          <div className={`fixed bottom-[80px] left-0 right-0 p-4 bg-transparent pb-0 md:hidden ${isHistoryOpen ? 'z-0' : 'z-[60]'}`}>
            <div className="max-w-4xl mx-auto w-full">
               <div className={`relative flex items-end rounded-[28px] px-4 py-2 shadow-sm transition-colors ${isDarkMode ? 'bg-[#111] border border-[#333]' : 'bg-[#F0F4F9]'}`}>
                  <button className={`p-2 rounded-full transition-colors mr-2 flex-shrink-0 mb-1 ${isDarkMode ? 'hover:bg-[#222] text-[#F4A261]' : 'hover:bg-gray-200 text-[#F4A261]'}`}>
                     <Plus size={24} />
                  </button>
                  <textarea 
                    ref={mobileInputRef}
                    placeholder="Ask Magna AI" 
                    className={`flex-1 bg-transparent border-none focus:outline-none text-base min-w-0 resize-none py-3 overflow-hidden ${isDarkMode ? 'text-gray-200 placeholder-[#F4A261]' : 'text-gray-700 placeholder-[#F4A261]'}`}
                    rows={1}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex items-center gap-2 flex-shrink-0 mb-1">
                     <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#222] text-[#F4A261]' : 'hover:bg-gray-200 text-[#F4A261]'}`}>
                        <ImageIcon size={20} />
                     </button>
                     <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#222] text-[#F4A261]' : 'hover:bg-gray-200 text-[#F4A261]'}`}>
                        <Mic size={20} />
                     </button>
                     <button 
                        onClick={handleSendMessage}
                        className="p-2 rounded-full bg-[#E50914] text-white hover:bg-[#b80710] transition-colors"
                     >
                        <Send size={18} />
                     </button>
                  </div>
               </div>
            </div>
          </div>


        </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className={`rounded-2xl p-6 max-w-sm w-full shadow-xl ${isDarkMode ? 'bg-[#111] border border-[#333]' : 'bg-white'}`}>
            <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Delete Chat?</h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Are you sure you want to delete this chat? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-[#222]' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-[#E50914] text-white hover:bg-[#b80710] rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast 
        message={toastConfig.message}
        isVisible={toastConfig.isVisible}
        onClose={() => setToastConfig(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}