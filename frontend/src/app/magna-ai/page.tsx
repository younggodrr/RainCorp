'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  ChevronLeft, 
  Bell,
  PanelLeftOpen
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MagnaNewIcon from '@/components/MagnaNewIcon';
import Toast from '@/components/Toast';
import MagnaMessageBubble, { MessageBubbleProps } from '@/components/MagnaMessageBubble';
import MagnaChatSidebar, { ChatSession } from '@/components/MagnaChatSidebar';
import MagnaChatInput from '@/components/MagnaChatInput';
import MagnaWelcomeScreen from '@/components/MagnaWelcomeScreen';
import MagnaActiveChat from '@/components/MagnaActiveChat';

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
        <MagnaChatSidebar
           conversations={conversations}
           isHistoryOpen={isHistoryOpen}
           setIsHistoryOpen={setIsHistoryOpen}
           selectedChat={selectedChat}
           handleNewChat={handleNewChat}
           handleChatSelect={handleChatSelect}
           isDarkMode={isDarkMode}
        />

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
            <MagnaActiveChat 
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              isDarkMode={isDarkMode}
              showChatOptions={showChatOptions}
              setShowChatOptions={setShowChatOptions}
              handleArchiveChat={handleArchiveChat}
              handleDeleteClick={handleDeleteClick}
              messages={messages}
              handleEditMessage={handleEditMessage}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSendMessage={handleSendMessage}
              inputRef={desktopInputRef as React.RefObject<HTMLTextAreaElement>}
            />
          ) : (
            /* DEFAULT GREETING VIEW */
            <MagnaWelcomeScreen 
              userName="John"
              isDarkMode={isDarkMode}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSendMessage={handleSendMessage}
              handleServiceClick={handleServiceClick}
              inputRef={desktopInputRef as React.RefObject<HTMLTextAreaElement>}
            />
          )}

          {/* Fixed Bottom Input Area for Mobile */}
          <div className={`fixed bottom-[80px] left-0 right-0 p-4 bg-transparent pb-0 md:hidden ${isHistoryOpen ? 'z-0' : 'z-[60]'}`}>
            <div className="max-w-4xl mx-auto w-full">
               <MagnaChatInput 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSendMessage={handleSendMessage}
                  isDarkMode={isDarkMode}
                  inputRef={mobileInputRef as React.RefObject<HTMLTextAreaElement>}
                  className={isDarkMode ? 'bg-[#111] border border-[#333]' : 'bg-[#F0F4F9]'}
               />
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
