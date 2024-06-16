'use client';

import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/header';

const AppLayout = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <div className='mx-auto max-w-[1440px] px-6'>
      <Header />

      <Separator />

      <div className='flex justify-center py-6'>{children}</div>
    </div>
  );
};

export default AppLayout;
