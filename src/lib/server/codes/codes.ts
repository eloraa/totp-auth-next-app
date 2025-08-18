'use server';

import { api } from '@/lib/api';
import { cookies, headers } from 'next/headers';

export interface Code {
  code: string;
  expires_at: string;
  id: string;
  name: string;
}

export type CodeResponse = Code[] | null;

export const getCode = async (params?: { id?: string; name?: string }): Promise<CodeResponse> => {
  const headerList = await headers();

  const headersObj: Record<string, string> = {};
  for (const [key, value] of headerList.entries()) {
    headersObj[key] = value;
  }

  const res = await api.get('/code', {
    headers: headersObj,
    params,
  });

  return await res.json();
};

export const getToken = async () => {
  const cookiesStore = await cookies();

  return { _token: cookiesStore.get('better-auth.session_token'), _secure_token: cookiesStore.get('__Secure-better-auth.session_token') };
};
