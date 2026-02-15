import { apiFetch } from './apiClient';

export type FileRecord = {
  id: string;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  uploaded_by?: string;
  uploaded_at?: string;
  purpose?: string;
};

export async function registerFile(payload: { url: string; filename: string; mime_type: string; size: number; purpose?: string }) {
  return apiFetch<FileRecord>(`/files`, { method: 'POST', body: payload });
}

export async function deleteFile(id: string) {
  return apiFetch<{ message: string }>(`/files/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
