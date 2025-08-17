export interface ApiRequestInit extends RequestInit {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

type ApiMethod = (input: string | URL | Request, init?: ApiRequestInit) => Promise<Response>;

function buildUrl(input: string | URL | Request, init?: ApiRequestInit) {
  const url = input instanceof Request ? input.url : input.toString();
  const isAbsolute = /^https?:\/\//i.test(url);
  const base = isAbsolute ? undefined : process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  const urlObj = new URL(url, base);

  if (init?.params) {
    Object.entries(init.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });
  }
  return urlObj.toString();
}

function buildHeaders(init?: ApiRequestInit) {
  let headers: Record<string, string> = { ...(init?.headers || {}) };
  if (init?.body instanceof FormData) {
    const { ['Content-Type']: _, ...rest } = headers;
    headers = rest;
  }
  return headers;
}

export const api: Record<string, ApiMethod> = {
  get(input, init) {
    return fetch(buildUrl(input, init), { ...init, method: 'GET', headers: buildHeaders(init) });
  },
  post(input, init) {
    return fetch(buildUrl(input, init), { ...init, method: 'POST', headers: buildHeaders(init) });
  },
  put(input, init) {
    return fetch(buildUrl(input, init), { ...init, method: 'PUT', headers: buildHeaders(init) });
  },
  patch(input, init) {
    return fetch(buildUrl(input, init), { ...init, method: 'PATCH', headers: buildHeaders(init) });
  },
  delete(input, init) {
    return fetch(buildUrl(input, init), { ...init, method: 'DELETE', headers: buildHeaders(init) });
  },
};
