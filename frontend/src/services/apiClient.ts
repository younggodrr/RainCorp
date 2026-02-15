const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

type FetchOptions = {
  method?: string;
  body?: any;
  token?: string | null;
  headers?: Record<string, string>;
};

function buildUrl(path: string) {
  if (!path) return API_BASE;
  return path.startsWith('/') ? `${API_BASE}${path}` : `${API_BASE}/${path}`;
}

function getStoredToken(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    const keys = ['accessToken', 'access_token', 'ACCESS_TOKEN', 'token', 'authToken', 'AUTH_TOKEN'];
    for (const k of keys) {
      const v = localStorage.getItem(k);
      if (v && v.trim()) return v.trim().replace(/^Bearer\s+/i, '');
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function apiFetch<T = any>(path: string, options: FetchOptions = {}): Promise<T> {
  const url = buildUrl(path);
  const method = options.method || 'GET';
  const token = options.token ?? getStoredToken();

  const headers: Record<string, string> = {
    ...(options.headers || {}),
  };

  let body: BodyInit | undefined;
  if (options.body !== undefined && options.body !== null) {
    if (options.body instanceof FormData) {
      body = options.body;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(options.body);
    }
  }

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, { method, headers, body });
  const text = await res.text();
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    let payload: any = text;
    try { payload = contentType.includes('application/json') ? JSON.parse(text) : text; } catch {}
    const err: any = new Error(payload?.message || res.statusText || 'API error');
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  if (!text) return {} as T;
  return contentType.includes('application/json') ? JSON.parse(text) : (text as unknown as T);
}

export { API_BASE };
