import Image, { ImageProps } from 'next/image';

import { Badge } from './badge';

type Props = ImageProps & {
  title?: string;
};

const BadgedImage = (props: Props) => {
  const { title, alt, ...rest } = props;

  return (
    <div className='relative'>
      <Image alt={alt} {...rest} />

      {title && (
        <Badge
          variant='outline'
          className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2'
        >
          {title}
        </Badge>
      )}
    </div>
  );
};

export { BadgedImage };
