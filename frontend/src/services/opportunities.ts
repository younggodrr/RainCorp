import { apiFetch } from './apiClient';

export type OpportunitySummary = {
  id: string;
  title: string;
  short_description?: string;
  company?: { id: string; name: string };
  location?: string;
  salary_min?: number;
  salary_max?: number;
  posted_at?: string;
  skills?: string[];
  is_bookmarked?: boolean;
  slug?: string;
};

export type Opportunity = OpportunitySummary & {
  description?: string;
  company?: any;
  location?: { city?: string; region?: string; country?: string; lat?: number; lng?: number };
  remote?: boolean;
  currency?: string;
  attachments?: any[];
  application_deadline?: string;
  views_count?: number;
  applicants_count?: number;
  application_status_for_current_user?: string | null;
};

export async function listOpportunities(params: Record<string, any> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) v.forEach((val) => qs.append(k, String(val)));
    else qs.append(k, String(v));
  });
  return apiFetch<{ meta: any; items: OpportunitySummary[] }>(`/opportunities?${qs.toString()}`);
}

export async function getOpportunity(idOrSlug: string) {
  return apiFetch<Opportunity>(`/opportunities/${encodeURIComponent(idOrSlug)}`);
}

export async function recordOpportunityEvent(opportunityId: string, type: string, metadata: any = {}) {
  return apiFetch(`/opportunities/${encodeURIComponent(opportunityId)}/event`, { method: 'POST', body: { type, metadata } });
}

export async function getSimilar(opportunityId: string, limit = 6) {
  return apiFetch<{ items: OpportunitySummary[] }>(`/opportunities/${encodeURIComponent(opportunityId)}/similar?limit=${limit}`);
}

export async function createOpportunity(payload: any) {
  return apiFetch(`/opportunities`, { method: 'POST', body: payload });
}

export async function updateOpportunity(id: string, payload: any) {
  return apiFetch(`/opportunities/${encodeURIComponent(id)}`, { method: 'PATCH', body: payload });
}

export async function deleteOpportunity(id: string) {
  return apiFetch(`/opportunities/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
