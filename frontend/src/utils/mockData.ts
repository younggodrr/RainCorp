

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
    
    const base = {
      id,
      type,
      author: {
        name: getRandomItem(authorNames, seed + 1),
        avatar: '', // handled in component
        role: getRandomItem(roles, seed + 2)
      },
      createdAt: `${Math.floor(seededRandom(seed + 3) * 24)} hours ago`,
      likes: Math.floor(seededRandom(seed + 4) * 500),
      comments: Math.floor(seededRandom(seed + 5) * 50),
    };

    if (type === 'job') {
      const titles = ['Senior Frontend Developer', 'Backend Engineer', 'Product Designer', 'DevOps Specialist'];
      const companies = ['Magna Coders', 'Tech Corp', 'Startup Inc', 'Future Systems'];
      const timeLeftRange = ['Apply by Friday', 'Closing soon', '2 days left', '1 week left'];
      
      return {
        ...base,
        title: getRandomItem(titles, seed + 6),
        company: getRandomItem(companies, seed + 7),
        description: 'We are looking for a talented individual to join our team. Competitive salary and great benefits.',
        location: 'Remote',
        salary: '$120k - $150k',
        tags: ['React', 'TypeScript', 'Node.js'],
        jobType: 'Full-time',
        deadlineProgress: Math.floor(seededRandom(seed + 15) * 60) + 30, // Random progress between 30% and 90%
        timeLeft: getRandomItem(timeLeftRange, seed + 16)
      } as JobPost;
    } else if (type === 'project') {
      const titles = ['E-commerce Platform', 'Social Media App', 'AI Dashboard', 'Crypto Wallet'];
      const membersRange = ['2-3', '3-4', '1-2', '4-5'];
      const timeLeftRange = ['2 days left', '5 days left', '1 week left', 'Ending soon'];
      
      return {
        ...base,
        title: getRandomItem(titles, seed + 8),
        description: 'Building a new platform using the latest tech stack. Looking for collaborators!',
        tags: ['Next.js', 'Tailwind', 'Supabase'],
        membersNeeded: getRandomItem(membersRange, seed + 13),
        requestsSent: Math.floor(seededRandom(seed + 14) * 20) + 5, // Random number between 5 and 25
        deadlineProgress: Math.floor(seededRandom(seed + 15) * 60) + 30, // Random progress between 30% and 90%
        timeLeft: getRandomItem(timeLeftRange, seed + 16)
      } as ProjectPost;
    } else if (type === 'tech-news') {
      const titles = ['The Future of AI in 2026', 'New React Features Announced', 'WebAssembly Takes Over', 'Cybersecurity Trends'];
      const sources = ['TechCrunch', 'The Verge', 'Hacker News', 'Wired'];

      return {
        ...base,
        title: getRandomItem(titles, seed + 9),
        summary: 'A deep dive into the latest technological advancements and what they mean for developers in the coming year.',
        source: getRandomItem(sources, seed + 10),
        url: '#',
        imageUrl: '/api/placeholder/800/400'
      } as TechNewsPost;
    } else {
      const titles = ['Just launched!', 'Working on something new', 'Learning Rust', 'Office vibes'];
      
      return {
        ...base,
        title: getRandomItem(titles, seed + 11),
        content: 'Excited to share my latest progress. What do you guys think about this approach?',
        image: seededRandom(seed + 12) > 0.7 ? '/api/placeholder/800/400' : undefined
      } as RegularPost;
    }
}

export const generateMockComments = (postId: string, count: number): Comment[] => {
    // Parse seed from ID
    const match = postId.match(/post-(\d+)/);
    const baseSeed = match && match[1] ? parseInt(match[1], 10) : 99999;

    const names = ['Alice Smith', 'Bob Johnson', 'Charlie Brown', 'David Lee', 'Eve Wilson', 'Frank Miller'];
    const contents = [
        'This is amazing! Great work.',
        'I totally agree with this.',
        'Can you share more details about the implementation?',
        'Looking forward to seeing more updates.',
        'Interesting perspective.',
        'Wow, I learned a lot from this.',
        'Is this open source?',
        'Congrats on the launch!',
        'This saved me hours of debugging.',
        'Really cool concept.'
    ];

    return Array.from({ length: count }).map((_, index) => {
        const seed = baseSeed + index * 100; // Spread seeds
        const hoursAgo = Math.floor(seededRandom(seed + 3) * 10);
        return {
            id: `comment-${postId}-${index}`,
            author: {
                name: getRandomItem(names, seed + 1),
                avatar: undefined
            },
            content: getRandomItem(contents, seed + 2),
            createdAt: `${hoursAgo} hours ago`,
            timestamp: Date.now() - hoursAgo * 3600000,
            likes: Math.floor(seededRandom(seed + 4) * 50),
            isLiked: false,
            isOwner: false,
            replies: []
        };
    });
};

export const generateMockPosts = (page: number, limit: number): FeedPost[] => {
  return Array.from({ length: limit }).map((_, index) => {
    // Generate a deterministic ID based on page and index
    const virtualId = (page - 1) * 1000 + index;
    const uniqueId = `post-${virtualId}`;
    
    // Use the virtualId as the seed
    return generateMockPost(uniqueId, virtualId);
  });
};

export const getPostById = (id: string): FeedPost | null => {
  // Parse the ID to get the seed
  // ID format: post-{number}
  const match = id.match(/post-(\d+)/);
  
  if (match && match[1]) {
      const seed = parseInt(match[1], 10);
      return generateMockPost(id, seed);
  }
  
  // Fallback for unknown IDs
  return generateMockPost(id, 99999);
};
