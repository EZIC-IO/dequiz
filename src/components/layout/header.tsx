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
        <Image
          alt='Logo'
          src='https://companieslogo.com/img/orig/COIN-a63dbab3.png?t=1648737284'
          width={80}
          height={80}
        />
      </Link>

      <div className='flex items-center'>
        <ConnectButton client={thirdwebClient} wallets={wallets} />
      </div>
    </header>
  );
};

export default Header;
