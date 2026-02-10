import { Conversation } from '@/utils/mockData';

export const MOCK_FRIENDS = [
  { id: 'f1', name: 'Sarah Chen', avatarColor: 'bg-pink-100 text-pink-600', initials: 'SC' },
  { id: 'f2', name: 'Mike Johnson', avatarColor: 'bg-blue-100 text-blue-600', initials: 'MJ' },
  { id: 'f3', name: 'Jessica Lee', avatarColor: 'bg-purple-100 text-purple-600', initials: 'JL' },
  { id: 'f4', name: 'David Kim', avatarColor: 'bg-green-100 text-green-600', initials: 'DK' },
  { id: 'f5', name: 'Alex Thompson', avatarColor: 'bg-orange-100 text-orange-600', initials: 'AT' },
  { id: 'f6', name: 'Emily Wilson', avatarColor: 'bg-yellow-100 text-yellow-600', initials: 'EW' },
  { id: 'f7', name: 'Ryan Garcia', avatarColor: 'bg-red-100 text-red-600', initials: 'RG' },
  { id: 'f8', name: 'Olivia Martinez', avatarColor: 'bg-indigo-100 text-indigo-600', initials: 'OM' },
];

export const getGroupMembers = (chat: Conversation) => {
  return [
    { id: 'm1', name: 'Victor Yoga', avatarColor: 'bg-blue-100 text-blue-600', initials: 'VY', role: 'admin' as const, messageCount: 145, joinedAt: '2 months ago' },
    { id: 'm2', name: 'Sarah Chen', avatarColor: 'bg-pink-100 text-pink-600', initials: 'SC', role: 'member' as const, messageCount: 89, joinedAt: '1 month ago' },
    { id: 'm3', name: 'Mike Johnson', avatarColor: 'bg-green-100 text-green-600', initials: 'MJ', role: 'member' as const, messageCount: 34, joinedAt: '2 weeks ago' },
    { id: 'm4', name: 'You', avatarColor: 'bg-black text-white', initials: 'ME', role: 'member' as const, messageCount: 12, joinedAt: 'Just now' },
  ];
};

export const getContactInfo = (chat: Conversation) => {
  return {
    id: chat.id,
    name: chat.name,
    email: `${chat.name.toLowerCase().replace(' ', '.')}@example.com`,
    bio: 'Ux Ui designer| Author | Deep Thinker | Content Creator | Artist 🎨 💻 📽️',
    roles: ['UX Designer', 'Product Designer'],
    lookingFor: ['Networking', 'Collaboration'],
    location: 'Nairobi, Kenya',
    status: 'Available',
    connected: true,
    avatarColor: chat.avatarColor,
    initials: chat.name.substring(0, 2).toUpperCase()
  };
};
