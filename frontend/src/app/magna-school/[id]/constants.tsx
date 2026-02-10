export interface Lesson {
  title: string;
  duration: string;
  type: "video" | "quiz";
  isFree: boolean;
}

export interface CurriculumSection {
  title: string;
  duration: string;
  videos: number;
  lessons: Lesson[];
}

export interface Instructor {
  name: string;
  role: string;
  avatar: string;
  students: number;
  courses: number;
  rating: number;
  bio: string;
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  instructor: Instructor;
  price: number;
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  lastUpdated: string;
  language: string;
  certificate: boolean;
  features: string[];
  curriculum: CurriculumSection[];
}

export const COURSE_DETAILS: Record<number, CourseDetail> = {
  1: {
    id: 1,
    title: "Complete React Native Bootcamp 2024",
    description: "Master React Native by building 5 real-world apps. Learn React Navigation, Firebase, Push Notifications, and publish to App Store & Play Store. This comprehensive course takes you from zero to hero in mobile app development.",
    instructor: {
      name: "Sarah Chen",
      role: "Senior Mobile Dev @ TechCorp",
      avatar: "SC",
      students: 12500,
      courses: 8,
      rating: 4.9,
      bio: "Sarah is a Senior Mobile Developer with 10+ years of experience. She has built apps for Fortune 500 companies and loves teaching complex concepts in simple ways."
    },
    price: 0,
    rating: 4.8,
    students: 1240,
    duration: "24h 30m",
    level: "Intermediate",
    category: "Mobile Development",
    lastUpdated: "January 2026",
    language: "English",
    certificate: true,
    features: [
      "24.5 hours on-demand video",
      "15 downloadable resources",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion"
    ],
    curriculum: [
      {
        title: "Section 1: Introduction to React Native",
        duration: "1h 15m",
        videos: 5,
        lessons: [
          { title: "Course Introduction", duration: "5:00", type: "video", isFree: true },
          { title: "Environment Setup (Windows & Mac)", duration: "15:30", type: "video", isFree: true },
          { title: "Creating Your First App", duration: "20:00", type: "video", isFree: false },
          { title: "Folder Structure Explained", duration: "10:15", type: "video", isFree: false },
          { title: "Running on Simulator vs Real Device", duration: "12:45", type: "video", isFree: false }
        ]
      },
      {
        title: "Section 2: Core Components & Styling",
        duration: "2h 30m",
        videos: 8,
        lessons: [
          { title: "View, Text & Image Components", duration: "18:00", type: "video", isFree: false },
          { title: "Styling with Flexbox", duration: "25:00", type: "video", isFree: false },
          { title: "Building a Login Screen UI", duration: "35:00", type: "video", isFree: false },
          { title: "ScrollView & FlatList", duration: "22:00", type: "video", isFree: false },
          { title: "Challenge: Build a Feed", duration: "15:00", type: "quiz", isFree: false }
        ]
      },
      {
        title: "Section 3: Navigation & Routing",
        duration: "3h 45m",
        videos: 12,
        lessons: [
          { title: "React Navigation Setup", duration: "12:00", type: "video", isFree: false },
          { title: "Stack Navigator", duration: "20:00", type: "video", isFree: false },
          { title: "Tab Navigator", duration: "18:00", type: "video", isFree: false },
          { title: "Passing Data Between Screens", duration: "25:00", type: "video", isFree: false }
        ]
      }
    ]
  }
};
