'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ConnectButton } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';

import { thirdwebClient } from '@/config/thirdweb';
import { createAuth } from 'thirdweb/auth';

const wallets = [createWallet('io.metamask'), createWallet('io.rabby')];

const thirdwebAuth = createAuth({
  domain: 'localhost:3000',
  client: thirdwebClient,
});

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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
        <ConnectButton
          autoConnect={false}
          client={thirdwebClient}
          wallets={wallets}
          auth={{
            getLoginPayload: async (params) => {
              return await thirdwebAuth.generatePayload({
                address: params.address,
                chainId: params.chainId ?? undefined,
              });
            },
            doLogin: async (params) => {
              const verifiedPayload = await thirdwebAuth.verifyPayload(params);

              setLoggedIn(verifiedPayload.valid);
            },
            isLoggedIn: async () => {
              return loggedIn;
            },
            doLogout: async () => {
              setLoggedIn(false);
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;
