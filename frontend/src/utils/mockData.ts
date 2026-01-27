
import { Globe } from 'lucide-react';

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
}

export interface ProjectPost extends BasePost {
  type: 'project';
  title: string;
  description: string;
  tags: string[];
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

// Mock Data Generator
export const generateMockPosts = (page: number, limit: number): FeedPost[] => {
  return Array.from({ length: limit }).map((_, index) => {
    const uniqueId = `post-${page}-${index}-${Date.now()}`;
    const rand = Math.random();
    let type: PostType = 'post';
    
    if (rand > 0.85) type = 'job';
    else if (rand > 0.70) type = 'project';
    else if (rand > 0.55) type = 'tech-news';
    
    const base = {
      id: uniqueId,
      type,
      author: {
        name: ['John Doe', 'Sarah Jenkins', 'Mike Ross', 'Emily Chen'][Math.floor(Math.random() * 4)],
        avatar: '', // handled in component
        role: ['Full Stack Dev', 'UI/UX Designer', 'Product Manager', 'DevOps Engineer'][Math.floor(Math.random() * 4)]
      },
      createdAt: `${Math.floor(Math.random() * 24)} hours ago`,
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 50),
    };

    if (type === 'job') {
      return {
        ...base,
        title: ['Senior Frontend Developer', 'Backend Engineer', 'Product Designer', 'DevOps Specialist'][Math.floor(Math.random() * 4)],
        company: ['Magna Coders', 'Tech Corp', 'Startup Inc', 'Future Systems'][Math.floor(Math.random() * 4)],
        description: 'We are looking for an experienced professional to join our team and help build the future of tech.',
        location: 'Remote',
        salary: '$100k - $150k',
        tags: ['React', 'TypeScript', 'Node.js'],
        jobType: 'Full-time'
      } as JobPost;
    } else if (type === 'project') {
      return {
        ...base,
        title: ['E-commerce Platform', 'Social Media App', 'AI Dashboard', 'Crypto Wallet'][Math.floor(Math.random() * 4)],
        description: 'Building a new platform using the latest tech stack. Looking for collaborators!',
        tags: ['Next.js', 'Tailwind', 'Supabase']
      } as ProjectPost;
    } else if (type === 'tech-news') {
      return {
        ...base,
        title: ['The Future of AI in 2026', 'New React Features Announced', 'WebAssembly Takes Over', 'Cybersecurity Trends'][Math.floor(Math.random() * 4)],
        summary: 'A deep dive into the latest technological advancements and what they mean for developers in the coming year.',
        source: ['TechCrunch', 'The Verge', 'Hacker News', 'Wired'][Math.floor(Math.random() * 4)],
        url: '#',
        imageUrl: '/api/placeholder/800/400'
      } as TechNewsPost;
    } else {
      return {
        ...base,
        title: ['Just launched!', 'Working on something new', 'Learning Rust', 'Office vibes'][Math.floor(Math.random() * 4)],
        content: 'Excited to share my latest progress. What do you guys think about this approach?',
        image: Math.random() > 0.7 ? '/api/placeholder/800/400' : undefined
      } as RegularPost;
    }
  });
};

export const getPostById = (id: string): FeedPost | null => {
  // Since we are using random generation, we can't really "find" the exact post by ID from a static list.
  // We will simulate finding it by parsing the ID or just returning a random one that matches the ID structure
  // or just a fresh random one.
  // Ideally, in a real app, this fetches from API.
  
  // For this demo, let's generate a single post and force its ID to match.
  const posts = generateMockPosts(1, 1);
  return { ...posts[0], id };
};
