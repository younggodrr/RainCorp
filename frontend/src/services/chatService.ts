import { apiFetch } from './apiClient';

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
    const url = type ? `/chat?type=${type}` : '/chat';
    return apiFetch<Chat[]>(url);
  },

  // Create a direct chat
  createDirectChat: async (data: CreateDirectChatDto) => {
    return apiFetch<Chat>('/chat/direct', { method: 'POST', body: data });
  },

  // Create a group chat
  createGroupChat: async (data: CreateGroupChatDto) => {
    return apiFetch<Chat>('/chat/group', { method: 'POST', body: data });
  },

  // Get messages for a specific chat
  getMessages: async (chatId: string) => {
    return apiFetch<Message[]>(`/chat/${chatId}/messages`);
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
