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
      const statusCode = (error as AxiosError).response?.status;
      const errorMessage = (error as AxiosError<{ message: string }>).response
        ?.data?.message;
      const message =
        statusCode === 429
          ? 'Generation attempts exceeded. Please try again in a couple of hours.'
          : errorMessage;

      if (message) {
        toast.error(message ?? 'Something went wrong!');
      }
    },
  }),
};
