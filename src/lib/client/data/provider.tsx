'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 10000,
      refetchInterval: 30 * 10000,
      refetchIntervalInBackground: true,
    },
  },
});

export const CodeProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
