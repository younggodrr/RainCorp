

// Types for Feed
export type PostType = 'job' | 'project' | 'post' | 'tech-news';

export interface BasePost {
  id: string;
  type: PostType;
  author: {
    name: string;
    avatar: string; // url or color
    role?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

export interface JobPost extends BasePost {
  type: 'job';
  title: string;
  company: string;
  description: string;
  location: string;
  salary: string;
  tags: string[];
  jobType: string; // Full-time, etc.
  deadlineProgress: number; // 0 to 100 percentage of time elapsed
  timeLeft: string;
}

export interface ProjectPost extends BasePost {
  type: 'project';
  title: string;
  description: string;
  tags: string[];
  membersNeeded: string;
  requestsSent: number;
  deadlineProgress: number; // 0 to 100 percentage of time elapsed
  timeLeft: string;
}

export interface RegularPost extends BasePost {
  type: 'post';
  title: string;
  content: string;
  image?: string;
}

export interface TechNewsPost extends BasePost {
  type: 'tech-news';
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl?: string;
}

export type FeedPost = JobPost | ProjectPost | RegularPost | TechNewsPost;

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  timestamp: number;
  likes: number;
  isLiked?: boolean;
  isOwner?: boolean;
  replies?: Comment[];
}

// Simple seeded random number generator
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Helper to get random item from array using seed
function getRandomItem<T>(arr: T[], seed: number): T {
    const index = Math.floor(seededRandom(seed) * arr.length);
    return arr[index];
}

// Mock Data Generator
export const generateMockPost = (id: string, seed: number): FeedPost => {
    // Use the seed to determine the type
    const typeRand = seededRandom(seed);
    let type: PostType = 'post';
    
    if (typeRand > 0.85) type = 'job';
    else if (typeRand > 0.70) type = 'project';
    else if (typeRand > 0.55) type = 'tech-news';

    const authorNames = ['John Doe', 'Sarah Jenkins', 'Mike Ross', 'Emily Chen'];
    const roles = ['Full Stack Dev', 'UI/UX Designer', 'Product Manager', 'DevOps Engineer'];
    
    const author = {
        name: getRandomItem(authorNames, seed),
        avatar: getRandomItem(['JD', 'SJ', 'MR', 'EC'], seed),
        role: getRandomItem(roles, seed + 1)
    };

    const base = {
        id,
        author,
        createdAt: '2h ago',
        likes: Math.floor(seededRandom(seed + 2) * 100),
        comments: Math.floor(seededRandom(seed + 3) * 20),
    };

    if (type === 'job') {
        return {
            ...base,
            type: 'job',
            title: getRandomItem(['Senior React Developer', 'Backend Engineer', 'Product Designer'], seed + 4),
            company: getRandomItem(['TechCorp', 'StartUp Inc', 'Global Solutions'], seed + 5),
            description: 'We are looking for a talented developer to join our team...',
            location: 'Remote',
            salary: '$120k - $150k',
            tags: ['React', 'TypeScript', 'Node.js'],
            jobType: 'Full-time',
            deadlineProgress: 30,
            timeLeft: '5 days left'
        };
    } else if (type === 'project') {
        return {
            ...base,
            type: 'project',
            title: getRandomItem(['E-commerce Platform', 'Social Media App', 'AI Tool'], seed + 6),
            description: 'Building a new platform for creators. Need help with frontend.',
            tags: ['Next.js', 'Tailwind', 'Supabase'],
            membersNeeded: '2 Developers',
            requestsSent: 5,
            deadlineProgress: 45,
            timeLeft: '2 weeks left'
        };
    } else if (type === 'tech-news') {
        return {
            ...base,
            type: 'tech-news',
            title: getRandomItem(['New React Version Released', 'AI Breakthrough', 'Tech Market Trends'], seed + 7),
            summary: 'The latest update brings significant performance improvements...',
            source: 'TechCrunch',
            url: '#'
        };
    } else {
        return {
            ...base,
            type: 'post',
            title: 'Just finished a new feature!',
            content: 'Check out this cool animation I made using Framer Motion.',
        };
    }
};

export const generateMockPosts = (page: number, limit: number): FeedPost[] => {
    const posts: FeedPost[] = [];
    for (let i = 0; i < limit; i++) {
        posts.push(generateMockPost(`post-${page}-${i}`, page * limit + i));
    }
    return posts;
};

export const generateMockComments = (postId: string, count: number): Comment[] => {
    const comments: Comment[] = [];
    for(let i=0; i<count; i++) {
        comments.push({
            id: `comment-${postId}-${i}`,
            author: {
                name: `User ${i}`,
                avatar: 'U'
            },
            content: 'Great post! Thanks for sharing.',
            createdAt: '1h ago',
            timestamp: Date.now() - i * 3600000,
            likes: Math.floor(Math.random() * 10),
            isLiked: false,
            replies: []
        });
    }
    return comments;
};

// --- CHAT TYPES & MOCK DATA ---

export type MessageType = 'text' | 'file' | 'image';

export interface Message {
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

export interface Conversation {
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

export const generateMockMessages = (count: number, isGroup: boolean): Message[] => {
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

export const MOCK_CONVERSATIONS: Conversation[] = [
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
