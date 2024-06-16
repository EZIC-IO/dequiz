'use client';

import { ConnectButton, useActiveWallet } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';

import { thirdwebClient } from '@/config/thirdweb';
import Quiz from '@/views/quiz';
import { Separator } from '@/components/ui/separator';

const wallets = [createWallet('io.metamask'), createWallet('io.rabby')];

export default function Home() {
  const wallet = useActiveWallet();

  return (
    <div className='px-6'>
      <div className='flex justify-end py-6'>
        <ConnectButton client={thirdwebClient} wallets={wallets} />
      </div>

      {!!wallet && (
        <>
          <Separator />

          <div className='flex justify-center py-6'>
            <Quiz />
          </div>
        </>
      )}
    </div>
  );
}
