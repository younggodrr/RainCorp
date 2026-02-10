export interface Course {
  id: number;
  title: string;
  instructor: string;
  role: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  thumbnail: null;
  certificate: boolean;
  bestseller: boolean;
}

export const COURSES: Course[] = [
  {
    id: 1,
    title: "Complete React Native Bootcamp 2024",
    instructor: "Sarah Chen",
    role: "Senior Mobile Dev @ TechCorp",
    price: 0,
    rating: 4.8,
    students: 1240,
    duration: "24h 30m",
    level: "Intermediate",
    category: "Mobile Development",
    thumbnail: null, // Placeholder
    certificate: true,
    bestseller: true
  },
  {
    id: 2,
    title: "Advanced System Design for Scale",
    instructor: "David Miller",
    role: "Principal Architect",
    price: 6500,
    rating: 4.9,
    students: 850,
    duration: "18h 15m",
    level: "Advanced",
    category: "System Design",
    thumbnail: null,
    certificate: true,
    bestseller: false
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass: From Zero to Hero",
    instructor: "Jessica Wong",
    role: "Lead Designer @ CreativeStudio",
    price: 3800,
    rating: 4.7,
    students: 2100,
    duration: "32h 00m",
    level: "Beginner",
    category: "Design",
    thumbnail: null,
    certificate: true,
    bestseller: true
  },
  {
    id: 4,
    title: "Python for Data Science & Machine Learning",
    instructor: "Dr. Alex Thompson",
    role: "AI Researcher",
    price: 0,
    rating: 4.9,
    students: 1560,
    duration: "45h 45m",
    level: "All Levels",
    category: "Data Science",
    thumbnail: null,
    certificate: true,
    bestseller: true
  },
  {
    id: 5,
    title: "DevOps Engineering: Docker, Kubernetes & AWS",
    instructor: "Mark Wilson",
    role: "DevOps Lead",
    price: 7000,
    rating: 4.8,
    students: 920,
    duration: "28h 10m",
    level: "Advanced",
    category: "DevOps",
    thumbnail: null,
    certificate: true,
    bestseller: false
  },
  {
    id: 6,
    title: "Full Stack Web Development with Next.js 14",
    instructor: "Emma Davis",
    role: "Full Stack Developer",
    price: 4200,
    rating: 4.8,
    students: 3400,
    duration: "52h 20m",
    level: "Intermediate",
    category: "Web Development",
    thumbnail: null,
    certificate: true,
    bestseller: true
  }
];

export const CATEGORIES = ["All", "Web Development", "Mobile Development", "Data Science", "Design", "DevOps", "System Design"];
