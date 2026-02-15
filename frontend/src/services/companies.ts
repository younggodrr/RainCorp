import { apiFetch } from './apiClient';

export type Company = {
  id: string;
  name: string;
  slug?: string;
  logo_url?: string;
  website_url?: string;
  description?: string;
  verified?: boolean;
  location?: any;
};

export async function getCompanyById(id: string) {
  return apiFetch<Company>(`/companies/${encodeURIComponent(id)}`);
}

export async function getCompanyBySlug(slug: string) {
  return apiFetch<Company>(`/companies/slug/${encodeURIComponent(slug)}`);
}

export async function getCompanyOpportunities(companyId: string, params: Record<string, any> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v !== undefined && qs.append(k, String(v)));
  return apiFetch<{ total: number; items: any[] }>(`/companies/${encodeURIComponent(companyId)}/opportunities?${qs.toString()}`);
}
