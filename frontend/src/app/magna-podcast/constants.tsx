export interface Podcast {
  id: number;
  title: string;
  host: string;
  role: string;
  duration: string;
  date: string;
  listeners: string;
  image: string;
  description: string;
  tags: string[];
}

export const PODCASTS: Podcast[] = [
  {
    id: 1,
    title: "The Future of AI Development",
    host: "Sarah Chen",
    role: "AI Researcher",
    duration: "45 min",
    date: "Oct 24, 2023",
    listeners: "1.2k",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    description: "Discussing the latest trends in artificial intelligence and what it means for developers in 2024.",
    tags: ["AI", "Tech", "Future"]
  },
  {
    id: 2,
    title: "Building Scalable Systems",
    host: "Alex Rivera",
    role: "Senior Architect",
    duration: "52 min",
    date: "Oct 22, 2023",
    listeners: "850",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    description: "Deep dive into microservices architecture and how to scale your applications effectively.",
    tags: ["Architecture", "Backend", "Scaling"]
  },
  {
    id: 3,
    title: "Web3 & The Decentralized Web",
    host: "Michael Chang",
    role: "Blockchain Dev",
    duration: "38 min",
    date: "Oct 20, 2023",
    listeners: "2.1k",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    description: "Exploring the current state of Web3, DeFi, and what's next for blockchain technology.",
    tags: ["Web3", "Blockchain", "Crypto"]
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    host: "Emma Wilson",
    role: "Product Designer",
    duration: "41 min",
    date: "Oct 18, 2023",
    listeners: "1.5k",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    description: "Essential design principles every developer should know to build better user interfaces.",
    tags: ["Design", "UI/UX", "Frontend"]
  },
  {
    id: 5,
    title: "DevOps Best Practices",
    host: "David Kim",
    role: "DevOps Engineer",
    duration: "55 min",
    date: "Oct 15, 2023",
    listeners: "920",
    image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?auto=format&fit=crop&q=80&w=800",
    description: "Streamlining your deployment pipeline and managing infrastructure as code.",
    tags: ["DevOps", "Cloud", "CI/CD"]
  },
  {
    id: 6,
    title: "The Indie Hacker Journey",
    host: "Jessica Lee",
    role: "Founder",
    duration: "60 min",
    date: "Oct 12, 2023",
    listeners: "3.4k",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    description: "Real stories from indie hackers building profitable businesses alongside their day jobs.",
    tags: ["Startup", "Indie Hacker", "Business"]
  }
];
