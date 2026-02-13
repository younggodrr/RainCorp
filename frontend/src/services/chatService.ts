import apiClient from './apiClient';

export interface Chat {
  id: string;
  type: 'DIRECT' | 'GROUP';
  name?: string; // Only for group chats
  participants: string[]; // User IDs
  createdAt: string;
  lastMessage?: Message;
  unreadCount?: number;
  avatar?: string; // Helper for UI
}

export interface Message {
  id: string;
  content: string;
  chatId: string;
  senderId: string;
  createdAt: string;
  read?: boolean;
}

export interface CreateDirectChatDto {
  userId: string; // The other user's ID
}

export interface CreateGroupChatDto {
  name: string;
  participantIds: string[];
}

export interface SendMessageDto {
  content: string;
}

export const chatService = {
  // Get all chats for current user
  getChats: async (type?: 'DIRECT' | 'GROUP') => {
    const params = type ? { type } : {};
    const response = await apiClient.get<Chat[]>('/api/chat', { params });
    return response.data;
  },

  // Create a direct chat
  createDirectChat: async (data: CreateDirectChatDto) => {
    const response = await apiClient.post<Chat>('/api/chat/direct', data);
    return response.data;
  },

  // Create a group chat
  createGroupChat: async (data: CreateGroupChatDto) => {
    const response = await apiClient.post<Chat>('/api/chat/group', data);
    return response.data;
  },

  // Get messages for a specific chat
  getMessages: async (chatId: string) => {
    const response = await apiClient.get<Message[]>(`/api/chat/${chatId}/messages`);
    return response.data;
  },

  // Send a message
  sendMessage: async (chatId: string, data: SendMessageDto) => {
    const response = await apiClient.post<Message>(`/api/chat/${chatId}/messages`, data);
    return response.data;
  },

  // Leave a chat
  leaveChat: async (chatId: string) => {
    const response = await apiClient.delete(`/api/chat/${chatId}/leave`);
    return response.data;
  }
};
