import { apiFetch } from './apiClient';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  // Add other profile fields as needed
}

export const userService = {
  getProfile: async (userId: string) => {
    return apiFetch<UserProfile>(`/auth/profile/${userId}`);
  },

  updateProfile: async (userId: string, data: Partial<UserProfile>) => {
    return apiFetch<UserProfile>(`/auth/profile/${userId}`, { method: 'PUT', body: data });
  },
};
