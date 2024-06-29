import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { getPlaceholderImage } from '@/utils/image';
import { BLURRED_IMAGE } from '@/constants/blurred-image';

type BlurredImage = {
  placeholder: string;
  src: string;
};

const BlurredImage = (props: ImageProps) => {
  const { title, src, className, alt, ...rest } = props;

  const [blurredImage, setBlurredImage] = useState<BlurredImage>();

  useEffect(() => {
    async function getBlurredImage() {
      if (!src) return;

      const blurredImage = await getPlaceholderImage(src as string);

      setBlurredImage(blurredImage);
    }

    getBlurredImage();
  }, [src]);

  return (
    <Image
      src={src}
      alt={alt}
      placeholder='blur'
      blurDataURL={blurredImage?.placeholder ?? BLURRED_IMAGE}
      className={cn('image', className, {
        ['image-blur']: !blurredImage,
      })}
      {...rest}
    />
  );
};

export { BlurredImage };
