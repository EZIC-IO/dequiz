'use client';

import { useActiveAccount } from 'thirdweb/react';
import { GenerationAction } from '../models/generation.dto';
import { useRequestQuery } from '../useRequest';
import { hashWalletAddress } from '@/utils/signature';

const useGetMintedAction = () => {
  const activeAccount = useActiveAccount();

  const identityHash = hashWalletAddress(activeAccount?.address ?? '');

  const { data: mintedAction, ...rest } = useRequestQuery<GenerationAction>(
    `/minted-gen-action/${identityHash}`,
    undefined,
    {
      enabled: !!identityHash,
    }
  );

  return {
    mintedAction,
    ...rest,
  };
};

export default useGetMintedAction;
