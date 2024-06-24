'use client';

import {
  ReportSuccessfulMintDto,
  UpdatedFields,
} from '../models/report-successful-mint.dto';
import { useRequestMutation } from '../useRequest';

export const useReportSuccessfulMint = () => {
  const {
    data,
    mutate: reportSuccessfulMint,
    ...rest
  } = useRequestMutation<UpdatedFields, void, ReportSuccessfulMintDto>(
    '/report-successful-mint',
    {
      method: 'POST',
    }
  );

  return {
    data,
    reportSuccessfulMint,
    ...rest,
  };
};
