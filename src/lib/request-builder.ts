import {
  DefaultError,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export function buildRequestQuery(api: AxiosInstance) {
  return function useRequestQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
  >(
    url: string,
    config?: AxiosRequestConfig<TData>,
    options?: Partial<UseQueryOptions>
  ) {
    return useQuery<TQueryFnData, TError, TData, string[]>({
      queryKey: [url, config?.params],
      queryFn: async () => {
        const response = await api.request<
          TQueryFnData,
          AxiosResponse<TQueryFnData>,
          TData
        >({
          ...config,
          url,
        });

        return response.data;
      },
      ...(options ?? ({} as any)),
    });
  };
}

export function buildRequestMutation(api: AxiosInstance) {
  return function useRequestMutation<
    TData = unknown,
    TError = DefaultError,
    TVariables = unknown,
    TContext = string[],
  >(
    url: string,
    config?: AxiosRequestConfig<TData>,
    options?: Partial<UseMutationOptions<TData, TError, TVariables, TContext>>
  ) {
    return useMutation<TData, TError, TVariables, TContext>({
      mutationFn: async (data) => {
        const response = await api.request<
          TData,
          AxiosResponse<TData>,
          TVariables
        >({
          ...config,
          url,
          data,
        });

        return response.data;
      },
      ...(options ?? ({} as any)),
    });
  };
}
