'use client';

import { InitPublishDto } from '../models/init-publish.dto';
import { ReportSuccessfulMintDto } from '../models/report-successful-mint.dto';
import { useRequestMutation } from '../useRequest';

export const useInitPublishImage = () => {
  const {
    data,
    mutate: initPublish,
    ...rest
  } = useRequestMutation<ReportSuccessfulMintDto, void, InitPublishDto>(
    '/gen-img',
    {
      method: 'POST',
    }
  );

  return {
    data,
    initPublish,
    ...rest,
  };
};
