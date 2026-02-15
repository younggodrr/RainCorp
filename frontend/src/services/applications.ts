import { apiFetch } from './apiClient';

export type Application = {
  id: string;
  opportunity_id: string;
  user_id: string;
  cover_letter?: string;
  status?: string;
  submitted_at?: string;
  resume_url?: string;
  metadata?: any;
  user?: any;
};

export async function applyToOpportunity(opportunityId: string, payload: { resumeUrl?: string; coverLetter?: string; metadata?: any }) {
  return apiFetch<{ application_id: string; status: string; submitted_at: string }>(`/applications/${encodeURIComponent(opportunityId)}/apply`, { method: 'POST', body: payload });
}

export async function getMyApplications(params: Record<string, any> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v !== undefined && qs.append(k, String(v)));
  return apiFetch<{ total: number; items: Application[] }>(`/applications/me?${qs.toString()}`);
}

export async function getApplicationsForOpportunity(opportunityId: string, params: Record<string, any> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v !== undefined && qs.append(k, String(v)));
  return apiFetch<{ total: number; items: Application[] }>(`/applications/${encodeURIComponent(opportunityId)}/applications?${qs.toString()}`);
}

export async function updateApplicationStatus(opportunityId: string, applicationId: string, payload: { status: string; note?: string }) {
  return apiFetch(`/applications/${encodeURIComponent(opportunityId)}/applications/${encodeURIComponent(applicationId)}`, { method: 'PATCH', body: payload });
}

export async function withdrawApplication(opportunityId: string, applicationId: string) {
  return apiFetch(`/applications/${encodeURIComponent(opportunityId)}/applications/${encodeURIComponent(applicationId)}/withdraw`, { method: 'POST' });
}
