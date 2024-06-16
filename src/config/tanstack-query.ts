import { MutationCache, QueryClientConfig } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
  mutationCache: new MutationCache({
    onError: (error: any) => {
      if (error.errorMessage) {
        toast.error(error.errorMessage ?? 'Something went wrong!');
      }
    },
  }),
};
