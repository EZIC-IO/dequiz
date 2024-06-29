'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from 'thirdweb/react';

import { thirdwebClient } from '@/config/thirdweb';
import { wallets } from '@/constants/wallets';

const Header = () => {
  return (
    <header className='flex justify-between py-10'>
      <Link href='/'>
        <Image alt='Logo' src='/Logo_1.svg' width={180} height={180} />
      </Link>

      <div className='hidden lg:block'>
        <ConnectButton client={thirdwebClient} wallets={wallets} />
      </div>
    </header>
  );
};

export default Header;
