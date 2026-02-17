export const MOCK_FRIENDS = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `Friend ${i + 1}`,
  username: `friend${i + 1}`,
  role: ['Full Stack Developer', 'UI/UX Designer', 'Backend Engineer', 'DevOps Specialist'][i % 4],
  company: ['Tech Corp', 'Startup Inc', 'Freelance', 'Global Systems'][i % 4],
  status: i % 3 === 0 ? 'online' : 'offline',
  mutual: Math.floor(Math.random() * 20) + 1,
  avatar: `https://i.pravatar.cc/150?u=${i + 1}`
}));
