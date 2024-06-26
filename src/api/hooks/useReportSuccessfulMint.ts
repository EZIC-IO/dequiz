'use client';

import { UseMutationOptions } from '@tanstack/react-query';
import {
  ReportSuccessfulMintDto,
  UpdatedFields,
} from '../models/report-successful-mint.dto';
import { useRequestMutation } from '../useRequest';

type Options = UseMutationOptions<
  UpdatedFields,
  void,
  ReportSuccessfulMintDto,
  string[]
>;

export const useReportSuccessfulMint = (options?: Options) => {
  const {
    data,
    mutate: reportSuccessfulMint,
    ...rest
  } = useRequestMutation<UpdatedFields, void, ReportSuccessfulMintDto>(
    '/report-successful-mint',
    {
      method: 'POST',
    },
    options
  );

  return {
    data,
    reportSuccessfulMint,
    ...rest,
  };
};
