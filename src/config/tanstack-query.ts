import { MutationCache, QueryClientConfig } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => {
      const errorMessage = (error as AxiosError<{ message: string }>).response
        ?.data?.message;

      if (errorMessage) {
        toast.error(errorMessage ?? 'Something went wrong!');
      }
    },
  }),
};
