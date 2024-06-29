'use client';

import Header from '@/components/layout/header';
import { DesktopOnly } from './desktop-only';

const AppLayout = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <div className='mx-auto flex min-h-screen max-w-[1440px] flex-col px-12'>
      <Header />

      <main className='flex flex-1 pb-12'>
        <DesktopOnly>{children}</DesktopOnly>
      </main>
    </div>
  );
};

export default AppLayout;
