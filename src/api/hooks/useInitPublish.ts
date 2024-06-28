'use client';

import { GenerationAction } from '../models/generation.dto';
import { InitPublishDto } from '../models/init-publish.dto';
import { useRequestMutation } from '../useRequest';

export const useInitPublishImage = () => {
  const {
    data,
    mutate: initPublish,
    ...rest
  } = useRequestMutation<GenerationAction, void, InitPublishDto>(
    '/init-publish',
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
