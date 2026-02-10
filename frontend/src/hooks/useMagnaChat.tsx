import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageBubbleProps } from '@/components/MagnaMessageBubble';
import { ChatSession } from '@/components/MagnaChatSidebar';
import MagnaNewIcon from '@/components/MagnaNewIcon';
import { Job } from '@/components/JobCard';
import { Builder } from '@/components/BuilderCard';
import { Project } from '@/components/ProjectCard';
import { Mic, BookOpen } from 'lucide-react';
import { COURSES, Course } from '@/app/magna-school/constants';

export interface ToastConfig {
  isVisible: boolean;
  message: string;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 101,
    title: "Decentralized Voting App",
    description: "A secure blockchain-based voting system ensuring transparency and anonymity.",
    category: "Blockchain",
    status: "open",
    level: "advanced",
    techStack: ["Solidity", "React", "Web3.js", "Ethereum"],
    teamCount: 5,
    date: "2024-02-01",
    location: "Global",
    image: null
  },
  {
    id: 102,
    title: "Health & Wellness Tracker",
    description: "Mobile app for tracking fitness goals, nutrition, and mental well-being.",
    category: "Health Tech",
    status: "in-progress",
    level: "intermediate",
    techStack: ["Flutter", "Firebase", "Dart"],
    teamCount: 4,
    date: "2024-01-28",
    location: "London, UK",
    image: null
  },
  {
    id: 103,
    title: "Smart Home Automation",
    description: "IoT dashboard to control and monitor smart home devices from a single interface.",
    category: "IoT",
    status: "planning",
    level: "advanced",
    techStack: ["React", "Node.js", "MQTT", "Raspberry Pi"],
    teamCount: 2,
    date: "2024-02-05",
    location: "Berlin, Germany",
    image: null
  },
  {
    id: 104,
    title: "Language Learning Bot",
    description: "AI-powered chatbot that helps users practice new languages through conversation.",
    category: "AI/ML",
    status: "open",
    level: "beginner",
    techStack: ["Python", "OpenAI API", "Telegram Bot API"],
    teamCount: 3,
    date: "2024-01-25",
    location: "Remote",
    image: null
  },
  {
    id: 105,
    title: "E-Commerce Dashboard",
    description: "Comprehensive admin dashboard for managing online stores and analytics.",
    category: "Web Dev",
    status: "open",
    level: "intermediate",
    techStack: ["Next.js", "Tailwind CSS", "Prisma"],
    teamCount: 3,
    date: "2024-02-10",
    location: "New York, USA",
    image: null
  }
];

const MOCK_BUILDERS: Builder[] = [
  {
    id: 1,
    name: 'Ashwa',
    email: 'ashwaashard@gmail.com',
    bio: 'Ux Ui designer| Author | Deep Thinker',
    roles: ['UX Designer', 'Designer'],
    lookingFor: ['Team Member', 'Mentor'],
    location: 'Nairobi',
    status: 'available',
    connected: false,
    avatar: null
  },
  {
    id: 2,
    name: 'abdijabar',
    email: 'abdijabarmadeyteno@gmail.com',
    bio: 'Great mind with ambitions, flowing with destiny',
    roles: ['AI/ML Engineer', 'Backend Developer'],
    lookingFor: ['Investment Prospect'],
    location: 'Mandera, Kenya',
    status: 'available',
    connected: true,
    avatar: null
  },
  {
    id: 3,
    name: 'Sarah Chen',
    email: 'sarah.c@example.com',
    bio: 'Full Stack Dev | Open Source Contributor',
    roles: ['Full Stack', 'Frontend'],
    lookingFor: ['Co-founder'],
    location: 'San Francisco',
    status: 'available',
    connected: false,
    avatar: null
  },
  {
    id: 4,
    name: 'Michael Ross',
    email: 'm.ross@example.com',
    bio: 'Product Manager turned Founder',
    roles: ['Product Manager', 'Strategy'],
    lookingFor: ['Technical Co-founder'],
    location: 'New York',
    status: 'available',
    connected: false,
    avatar: null
  },
  {
    id: 5,
    name: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    bio: 'Mobile App Developer (iOS/Android)',
    roles: ['Mobile Dev', 'React Native'],
    lookingFor: ['Design Assistance'],
    location: 'Austin',
    status: 'available',
    connected: true,
    avatar: null
  }
];

const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechFlow Systems",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    salary: "$140k - $180k",
    postedAt: "2 days ago",
    description: "We are looking for an experienced Frontend Engineer to lead our core product team. You will be working with React, Next.js, and TypeScript.",
    tags: ["React", "TypeScript", "Next.js"],
    logoColor: "bg-blue-500",
    category: "recommended"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "DataStream Inc",
    location: "Remote",
    type: "Contract",
    salary: "$60 - $80 / hr",
    postedAt: "5 hours ago",
    description: "Join our backend team to build scalable APIs and microservices. Experience with Node.js, Python, and AWS is required.",
    tags: ["Node.js", "Python", "AWS"],
    logoColor: "bg-green-500",
    category: "saved",
    isExpired: false,
    timeLeft: "5 days left"
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Creative Pulse",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $150k",
    postedAt: "1 day ago",
    description: "We need a visionary Product Designer to shape the future of our creative tools. Proficiency in Figma and prototyping is a must.",
    tags: ["Figma", "UI/UX", "Prototyping"],
    logoColor: "bg-purple-500",
    category: "recommended"
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudScale Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$130k - $170k",
    postedAt: "3 days ago",
    description: "Looking for a DevOps Engineer to manage our CI/CD pipelines and cloud infrastructure. Kubernetes and Docker experience preferred.",
    tags: ["Kubernetes", "Docker", "CI/CD"],
    logoColor: "bg-orange-500",
    category: "saved",
    isExpired: true,
    timeLeft: "Expired"
  },
  {
    id: 5,
    title: "Full Stack Developer",
    company: "Innovate Labs",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    postedAt: "4 days ago",
    description: "Seeking a Full Stack Developer proficient in the MERN stack. You will be responsible for end-to-end feature development.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    logoColor: "bg-indigo-500",
    category: "recommended"
  }
];

export function useMagnaChat() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Magna AI');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageBubbleProps[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toastConfig, setToastConfig] = useState<ToastConfig>({ isVisible: false, message: '' });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chatState, setChatState] = useState<'IDLE' | 'WAITING_FOR_JOB_STACK' | 'WAITING_FOR_BUILDER_SKILL'>('IDLE');
  
  const mobileInputRef = useRef<HTMLTextAreaElement>(null);
  const desktopInputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<ChatSession[]>([
    { id: '1', title: 'React Component optimization', category: 'Today', isArchived: false },
    { id: '2', title: 'Debug API Integration', category: 'Today', isArchived: false },
    { id: '3', title: 'Project Architecture Planning', category: 'Yesterday', isArchived: false },
    { id: '4', title: 'Tailwind CSS Grid Layout', category: 'Yesterday', isArchived: false },
    { id: '5', title: 'Next.js App Router', category: 'Yesterday', isArchived: false },
    { id: '6', title: 'Authentication Flow', category: 'Previous 7 Days', isArchived: false },
    { id: '7', title: 'Database Schema Design', category: 'Previous 7 Days', isArchived: false },
  ]);

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
          setChatState('WAITING_FOR_JOB_STACK');
          break;
        case 'Search Builders & Collabs':
          responseText = "I can help you find builders and collaborators for your next project. What skills are you looking for?";
          setChatState('WAITING_FOR_BUILDER_SKILL');
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
    
    // Store query for use in response
    const currentQuery = searchQuery;
    setSearchQuery('');
    setIsTyping(true);

    // Handle "Open Magna Podcast" command
    if (currentQuery.toLowerCase().includes('open magna podcast')) {
       const loadingMsgId = (Date.now() + 1).toString();
       
       setTimeout(() => {
         // Show Loading Animation with Podcast Icon
         const loadingMsg: MessageBubbleProps = {
           id: loadingMsgId,
           sender: 'Magna AI',
           text: "Opening Magna Podcast...",
           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
           avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
           color: 'bg-red-100',
           isLoading: true,
           loadingIcon: <Mic size={12} className="text-[#E50914]" />
         };
         setMessages(prev => [...prev, loadingMsg]);
         setIsTyping(false);
 
         // Navigate after delay
         setTimeout(() => {
            router.push('/magna-podcast');
         }, 1500);
       }, 500);
       return;
    }

    // Handle "Open Magna School" command
    if (currentQuery.toLowerCase().includes('open magna school')) {
       const loadingMsgId = (Date.now() + 1).toString();
       
       setTimeout(() => {
         // Show Loading Animation with Book Icon
         const loadingMsg: MessageBubbleProps = {
           id: loadingMsgId,
           sender: 'Magna AI',
           text: "Opening Magna School...",
           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
           avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
           color: 'bg-red-100',
           isLoading: true,
           loadingIcon: <BookOpen size={12} className="text-[#E50914]" />
         };
         setMessages(prev => [...prev, loadingMsg]);
         setIsTyping(false);
 
         // Navigate after delay
         setTimeout(() => {
            router.push('/magna-school');
         }, 1500);
       }, 500);
       return;
    }

    // Handle "Tell me more about Magna School" command
    if (currentQuery.toLowerCase().includes('tell me more about magna school')) {
       const loadingMsgId = (Date.now() + 1).toString();
       
       setTimeout(() => {
         // 1. Show Loading Animation
         const loadingMsg: MessageBubbleProps = {
           id: loadingMsgId,
           sender: 'Magna AI',
           text: "Finding top courses...",
           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
           avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
           color: 'bg-red-100',
           isLoading: true
         };
         setMessages(prev => [...prev, loadingMsg]);
         setIsTyping(false);
 
         // 2. Show Results after delay
         setTimeout(() => {
           setMessages(prev => prev.map(msg => {
             if (msg.id === loadingMsgId) {
               return {
                 ...msg,
                 text: `Here are some top-rated courses from Magna School:`,
                 isLoading: false,
                 schoolResults: COURSES,
                 onViewMore: () => setToastConfig({ isVisible: true, message: 'Unlock full access with 100 Magna Coins' })
               };
             }
             return msg;
           }));
           setChatState('IDLE');
         }, 2000);
       }, 1000);
       return;
    }

    // Handle Project Search (Keywords: "project", "projects")
    if (currentQuery.toLowerCase().includes('project')) {
       const loadingMsgId = (Date.now() + 1).toString();
       
       setTimeout(() => {
         // 1. Show Loading Animation
         const loadingMsg: MessageBubbleProps = {
           id: loadingMsgId,
           sender: 'Magna AI',
           text: "Looking for trending projects...",
           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
           avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
           color: 'bg-red-100',
           isLoading: true
         };
         setMessages(prev => [...prev, loadingMsg]);
         setIsTyping(false);
 
         // 2. Show Results after delay
         setTimeout(() => {
           setMessages(prev => prev.map(msg => {
             if (msg.id === loadingMsgId) {
               return {
                 ...msg,
                 text: `Here are some trending projects I found for you:`,
                 isLoading: false,
                 projectResults: MOCK_PROJECTS,
                 onViewMore: () => setToastConfig({ isVisible: true, message: 'Unlock this feature with 100 Magna Coins' })
               };
             }
             return msg;
           }));
           setChatState('IDLE');
         }, 2000);
       }, 1000);
       return;
    }

    // Handle Job Stack Response
    if (chatState === 'WAITING_FOR_JOB_STACK') {
      const loadingMsgId = (Date.now() + 1).toString();
      
      setTimeout(() => {
        // 1. Show Loading Animation
        const loadingMsg: MessageBubbleProps = {
          id: loadingMsgId,
          sender: 'Magna AI',
          text: "Finding opportunities...",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
          color: 'bg-red-100',
          isLoading: true
        };
        setMessages(prev => [...prev, loadingMsg]);
        setIsTyping(false);

        // 2. Show Results after delay
        setTimeout(() => {
          setMessages(prev => prev.map(msg => {
            if (msg.id === loadingMsgId) {
              return {
                ...msg,
                text: `Here are some ${currentQuery} opportunities I found for you:`,
                isLoading: false,
                jobResults: MOCK_JOBS,
                onViewMore: () => setToastConfig({ isVisible: true, message: 'Unlock this feature with 100 Magna Coins' })
              };
            }
            return msg;
          }));
          setChatState('IDLE');
        }, 2000);
      }, 1000);
      return;
    }

    // Handle Builder Search Response
    if (chatState === 'WAITING_FOR_BUILDER_SKILL') {
      const loadingMsgId = (Date.now() + 1).toString();
      
      setTimeout(() => {
        // 1. Show Loading Animation
        const loadingMsg: MessageBubbleProps = {
          id: loadingMsgId,
          sender: 'Magna AI',
          text: "Looking for builders...",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: <MagnaNewIcon className="w-5 h-5 text-red-600" />,
          color: 'bg-red-100',
          isLoading: true
        };
        setMessages(prev => [...prev, loadingMsg]);
        setIsTyping(false);

        // 2. Show Results after delay
        setTimeout(() => {
          setMessages(prev => prev.map(msg => {
            if (msg.id === loadingMsgId) {
              return {
                ...msg,
                text: `Here are some builders skilled in ${currentQuery}:`,
                isLoading: false,
                builderResults: MOCK_BUILDERS,
                onViewMore: () => setToastConfig({ isVisible: true, message: 'Unlock this feature with 100 Magna Coins' })
              };
            }
            return msg;
          }));
          setChatState('IDLE');
        }, 2000);
      }, 1000);
      return;
    }

    // Simulate AI response for other cases
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

  return {
    activeTab,
    isHistoryOpen,
    setIsHistoryOpen,
    searchQuery,
    setSearchQuery,
    selectedChat,
    setSelectedChat,
    messages,
    isTyping,
    showChatOptions,
    setShowChatOptions,
    showDeleteConfirm,
    setShowDeleteConfirm,
    toastConfig,
    setToastConfig,
    isDarkMode,
    mobileInputRef,
    desktopInputRef,
    messagesEndRef,
    conversations,
    handleServiceClick,
    handleSendMessage,
    handleEditMessage,
    handleNewChat,
    handleArchiveChat,
    handleDeleteClick,
    confirmDelete,
    handleChatSelect
  };
}
