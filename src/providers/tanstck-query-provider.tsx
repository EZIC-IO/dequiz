'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { QUERY_CONFIG } from '@/config/tanstack-query';

const queryClient = new QueryClient(QUERY_CONFIG);

export function TanstackProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
