'use client';

import { useState } from 'react';
import { GenImgDto, GenPayloadDto } from '../models/gen-image';
import { useRequestMutation } from '../useRequest';

export const useGenerateImage = () => {
  // TODO: uncomment while API integration
  //   const {
  //     data,
  //     mutate: generateImage,
  //     ...rest
  //   } = useRequestMutation<GenImgDto, void, GenPayloadDto>('/gen-img');

  //   return {
  //     data,
  //     generateImage,
  //     ...rest,
  //   };

  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (args: GenPayloadDto) => {
    setIsLoading(true);

    const result = await new Promise((resolve, reject) =>
      setTimeout(() => resolve(args), 3000)
    );

    setIsLoading(false);

    return result;
  };

  return { isPending: isLoading, generateImage };
};
