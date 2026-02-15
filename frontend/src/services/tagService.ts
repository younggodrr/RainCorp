import { apiFetch } from './apiClient';

export interface Tag {
  id: string;
  name: string;
}

export const tagService = {
  getAll: async (search?: string) => {
    const url = search ? `/tags?search=${encodeURIComponent(search)}` : '/tags';
    return apiFetch<Tag[]>(url);
  },
  getPopular: async (limit = 10) => {
    return apiFetch<Tag[]>(`/tags/popular?limit=${limit}`);
  }
};
