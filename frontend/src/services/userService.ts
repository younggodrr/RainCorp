import apiClient from './apiClient';

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
    const response = await apiClient.get<UserProfile>(`/api/auth/profile/${userId}`);
    return response.data;
  },

  updateProfile: async (userId: string, data: Partial<UserProfile>) => {
    const response = await apiClient.put<UserProfile>(`/api/auth/profile/${userId}`, data);
    return response.data;
  },
};
