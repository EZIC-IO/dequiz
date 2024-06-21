'use client';

import Header from '@/components/layout/header';

const AppLayout = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <div className='mx-auto flex h-[100dvh] max-w-[1440px] flex-col px-12'>
      <Header />

      <main className='flex grow pb-12'>{children}</main>
    </div>
  );
};

export default AppLayout;
