'use client';

import { GenImgDto } from '../models/gen-image.dto';
import { useRequestMutation } from '../useRequest';
import { GenerationAction } from '../models/generation.dto';
import { UseMutationOptions } from '@tanstack/react-query';

type Options = UseMutationOptions<GenerationAction, void, GenImgDto, string[]>;

export const useGenerateImage = (options?: Options) => {
  const {
    data,
    mutate: generateImage,
    ...rest
  } = useRequestMutation<GenerationAction, void, GenImgDto>(
    '/gen-img',
    {
      method: 'POST',
    },
    options
  );

  return {
    data,
    generateImage,
    ...rest,
  };
};
