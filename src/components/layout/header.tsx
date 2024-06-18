'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';

import { thirdwebClient } from '@/config/thirdweb';

const wallets = [createWallet('io.metamask'), createWallet('io.rabby')];

const Header = () => {
  return (
    <div className='flex justify-between py-6'>
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
    </div>
  );
};

export default Header;
