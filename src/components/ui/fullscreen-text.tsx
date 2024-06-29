import { Wand } from 'lucide-react';

import { Card } from './card';
import { cn } from '@/lib/utils';

export type FullScreenTextProps = {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  animated?: boolean;
};

const FullScreenText = (props: FullScreenTextProps) => {
  const { title, icon, animated = false, className } = props;

  return (
    <div className={cn('flex-grow', className)}>
      <Card
        className='relative h-full w-full p-10'
        background='/gradient/loader-gradient.webp'
      >
        <div
          className={cn(
            'flex h-full w-full flex-col items-center justify-center',
            {
              'animate-pulse': animated,
            }
          )}
        >
          {icon ?? <Wand width={60} height={60} color='#fff' />}

          <h3 className='font-tangak max-w-[805px] pt-10 text-center text-3xl font-extrabold !leading-snug lg:text-5xl'>
            {title}
          </h3>
        </div>
      </Card>
    </div>
  );
};

export { FullScreenText };
