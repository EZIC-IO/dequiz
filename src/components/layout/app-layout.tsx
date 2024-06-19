'use client';

import Header from '@/components/layout/header';

const AppLayout = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <div className='mx-auto max-w-[1440px] px-12'>
      <Header />

      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
