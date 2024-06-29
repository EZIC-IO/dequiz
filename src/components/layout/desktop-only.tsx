import { PropsWithChildren } from 'react';

import { FullScreenText } from '../ui/fullscreen-text';

const DesktopOnly = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <>
      <FullScreenText
        className='block lg:hidden'
        title='Sorry, but the mobile version is not available yet, please use the desktop one instead.'
      />

      <div className='hidden w-full flex-1 lg:flex'>{children}</div>
    </>
  );
};

export { DesktopOnly };
