import { Github, Linkedin, MessageSquare, LucideIcon } from 'lucide-react';

export interface Social {
  name: string;
  icon: LucideIcon;
  url: string;
  color: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Project {
  title: string;
  description: string;
  image: string | null;
  tags: string[];
}

export interface Activity {
  type: string;
  text: string;
  time: string;
}

export interface Connection {
  name: string;
  role: string;
  initials: string;
  color: string;
}

export interface UserStats {
  connections: number;
  mutualConnections: number;
  projects: number;
  skills: number;
}

export interface UserProfile {
  name: string;
  username: string;
  role: string;
  secondaryRole: string;
  location: string;
  status: string;
  bio: string;
  stats: UserStats;
  socials: Social[];
  skillsList: Skill[];
  projectsList: Project[];
  activitiesList: Activity[];
  connectionsList: Connection[];
}

export const USER_DATA: UserProfile = {
  name: "Ashwa",
  username: "@ashwa",
  role: "UX Designer",
  secondaryRole: "Designer",
  location: "Nairobi",
  status: "available",
  bio: "Ux Ui designer | Author | Deep Thinker | Content Creator | Artist 🎨 📓 📽️",
  stats: {
    connections: 42,
    mutualConnections: 12,
    projects: 15,
    skills: 8
  },
  socials: [
    { name: "GitHub", icon: Github, url: "#", color: "text-gray-800" },
    { name: "LinkedIn", icon: Linkedin, url: "#", color: "text-blue-600" },
    { name: "WhatsApp", icon: MessageSquare, url: "#", color: "text-green-500" }
  ],
  skillsList: [
    { name: "UI/UX Design", level: "Expert" },
    { name: "Figma", level: "Expert" },
    { name: "Adobe XD", level: "Advanced" },
    { name: "Prototyping", level: "Expert" },
    { name: "User Research", level: "Advanced" },
    { name: "HTML/CSS", level: "Intermediate" },
    { name: "React", level: "Beginner" }
  ],
  projectsList: [
    { title: "E-commerce App Redesign", description: "Complete overhaul of a mobile shopping experience focused on conversion optimization.", image: null, tags: ["UI/UX", "Mobile"] },
    { title: "Finance Dashboard", description: "Web-based analytics dashboard for personal finance tracking.", image: null, tags: ["Web", "Dashboard"] },
    { title: "Travel Booking Platform", description: "User-centered design for a flight and hotel booking service.", image: null, tags: ["Product Design"] }
  ],
  activitiesList: [
    { type: "project", text: "Published a new project: E-commerce App Redesign", time: "2 days ago" },
    { type: "connection", text: "Connected with Sarah Jenkins", time: "1 week ago" },
    { type: "comment", text: "Commented on 'Future of AI in Design' post", time: "2 weeks ago" }
  ],
  connectionsList: [
    { name: "Sarah Jenkins", role: "Product Designer", initials: "SJ", color: "from-purple-500 to-pink-500" },
    { name: "Michael Chen", role: "Full Stack Developer", initials: "MC", color: "from-blue-500 to-cyan-500" },
    { name: "Jessica Wu", role: "Frontend Engineer", initials: "JW", color: "from-green-500 to-emerald-500" },
    { name: "David Miller", role: "UX Researcher", initials: "DM", color: "from-orange-500 to-red-500" },
    { name: "Alex Thompson", role: "Product Manager", initials: "AT", color: "from-indigo-500 to-purple-500" }
  ]
};

export const PROFILE_TABS = ['Overview', 'Skills', 'Projects', 'Activities', 'Connections'];
