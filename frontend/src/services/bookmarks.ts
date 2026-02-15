import { apiFetch } from './apiClient';

export async function toggleBookmark(opportunityId: string) {
  return apiFetch<{ bookmarked: boolean; id?: string }>(`/bookmarks/${encodeURIComponent(opportunityId)}/bookmark`, { method: 'POST' });
}

export async function getBookmarkState(opportunityId: string) {
  return apiFetch<{ bookmarked: boolean; id?: string | null }>(`/bookmarks/${encodeURIComponent(opportunityId)}/bookmark`);
}
