export type NotificationType = 'like' | 'comment' | 'connection_request' | 'connection_accepted' | 'project_invite' | 'project_application' | 'system' | 'job_request' | 'project_request' | 'job_approved' | 'project_approved';

export interface Notification {
  id: number;
  type: NotificationType;
  actor: {
    name: string;
    avatar: string | null;
    initials: string;
  };
  content: string;
  target?: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  requestStatus?: 'pending' | 'accepted' | 'declined';
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'connection_request',
    actor: { name: 'Sarah Chen', avatar: null, initials: 'SC' },
    content: 'sent you a connection request',
    timestamp: '2 mins ago',
    read: false,
    actionRequired: true,
    requestStatus: 'pending'
  },
  {
    id: 2,
    type: 'like',
    actor: { name: 'David Miller', avatar: null, initials: 'DM' },
    content: 'liked your post',
    target: '"Building a scalable architecture with Next.js..."',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 3,
    type: 'project_invite',
    actor: { name: 'Alex Thompson', avatar: null, initials: 'AT' },
    content: 'invited you to join',
    target: 'AI Image Generator Project',
    timestamp: '3 hours ago',
    read: true,
    actionRequired: true,
    requestStatus: 'pending'
  },
  {
    id: 4,
    type: 'comment',
    actor: { name: 'Maria Garcia', avatar: null, initials: 'MG' },
    content: 'commented on your post',
    target: '"Great insights on the new features!"',
    timestamp: '5 hours ago',
    read: true
  },
  {
    id: 5,
    type: 'system',
    actor: { name: 'Magna Team', avatar: null, initials: 'MT' },
    content: 'Welcome to Magna Coders! Complete your profile to get started.',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: 6,
    type: 'connection_accepted',
    actor: { name: 'James Wilson', avatar: null, initials: 'JW' },
    content: 'accepted your connection request',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: 7,
    type: 'project_application',
    actor: { name: 'Lisa Wang', avatar: null, initials: 'LW' },
    content: 'applied to your project',
    target: 'E-commerce Platform',
    timestamp: '2 days ago',
    read: true,
    actionRequired: true,
    requestStatus: 'pending'
  },
  // New Mock Data for Job Opportunities
  {
    id: 8,
    type: 'job_request',
    actor: { name: 'Michael Chen', avatar: null, initials: 'MC' },
    content: 'requested to join your job opportunity',
    target: 'Senior React Developer',
    timestamp: '30 mins ago',
    read: false,
    actionRequired: true,
    requestStatus: 'pending'
  },
  {
    id: 9,
    type: 'job_request',
    actor: { name: 'Emily Davis', avatar: null, initials: 'ED' },
    content: 'requested to join your job opportunity',
    target: 'Senior React Developer',
    timestamp: '45 mins ago',
    read: false,
    actionRequired: true,
    requestStatus: 'pending'
  },
  {
    id: 10,
    type: 'job_approved',
    actor: { name: 'TechCorp Inc.', avatar: null, initials: 'TC' },
    content: 'approved your application for',
    target: 'Full Stack Engineer',
    timestamp: '1 day ago',
    read: true
  },
  // New Mock Data for Projects
  {
    id: 11,
    type: 'project_request',
    actor: { name: 'Robert Taylor', avatar: null, initials: 'RT' },
    content: 'requested to join your project',
    target: 'Decentralized Social Network',
    timestamp: '2 hours ago',
    read: false,
    actionRequired: true,
    requestStatus: 'pending'
  },
  {
    id: 12,
    type: 'project_approved',
    actor: { name: 'CryptoStart', avatar: null, initials: 'CS' },
    content: 'approved your request to join',
    target: 'Blockchain Wallet App',
    timestamp: '3 days ago',
    read: true
  }
];
