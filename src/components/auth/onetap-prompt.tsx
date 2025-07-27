'use client';
import { authClient } from '@/lib/client/auth/auth';
import { useEffect } from 'react';

export const OneTapPrompt = () => {
  useEffect(() => {
    authClient.oneTap();
  }, []);
  return null;
};
