'use client';

import { useState } from 'react';
import { GenImgDto, RPGVocation } from '../models/gen-image.dto';
import { useRequestMutation } from '../useRequest';
import {
  GenerationAction,
  GenerationActionStatus,
} from '../models/generation.dto';
import { UseMutationOptions } from '@tanstack/react-query';

export type GenerationActionResponse = GenerationAction & { _id: string };

type Options = UseMutationOptions<
  GenerationActionResponse,
  void,
  GenImgDto,
  string[]
>;

export const useGenerateImage = (options?: Options) => {
  // TODO: uncomment while API integration
  const {
    data,
    mutate: generateImage,
    ...rest
  } = useRequestMutation<GenerationActionResponse, void, GenImgDto>(
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

  // const [isLoading, setIsLoading] = useState(false);

  // const data = {
  //   identityHash: '',
  //   status: GenerationActionStatus.GENERATED,
  //   vocation: RPGVocation.KNIGHT,
  //   imageUrl: '/quiz/quiz-results.png',
  //   imageBareIPFS: '',
  //   imageGatewayIPFS: '',
  //   metadataBareIPFS: '',
  //   metadata: {},
  //   mintTx: '',
  //   txBlockExplorerUrl: '',
  //   openSeaUrl: '',
  //   createdAt: 1,
  //   epochId: '',
  // } as GenerationActionResponse;

  // const generateImage = async (args: GenImgDto) => {
  //   setIsLoading(true);

  //   const result = await new Promise((resolve, reject) =>
  //     setTimeout(() => resolve(args), 3000)
  //   );

  //   options?.onSuccess?.(data, {} as any, []);
  //   setIsLoading(false);

  //   return result;
  // };

  // return {
  //   isPending: isLoading,
  //   generateImage,
  //   data,
  // };
};
