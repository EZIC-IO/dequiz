'use client';

import { getContract } from 'thirdweb/contract';
import { useReadContract } from 'thirdweb/react';
import { baseSepolia } from 'thirdweb/chains';

import { abi } from '@/config/abi';
import { thirdwebClient, contractAddress } from '@/config/thirdweb';

const useGetQuizContractData = () => {
  const contract = getContract({
    client: thirdwebClient,
    chain: baseSepolia,
    address: contractAddress,
    abi: abi as any[],
  });

  const { data: totalSupply } = useReadContract({
    method: 'totalSupply',
    contract,
    params: [],
  });
  const { data: mintPrice } = useReadContract({
    method: 'MINT_PRICE',
    contract,
    params: [],
  });
  const { data: symbol } = useReadContract({
    method: 'symbol',
    contract,
    params: [],
  });
  const { data: alreadyMintedGlobalAmount } = useReadContract({
    method: 'alreadyMintedGlobalAmount',
    contract,
    params: [],
  });

  return {
    totalSupply,
    mintPrice,
    symbol,
    alreadyMintedGlobalAmount,
  };
};

export default useGetQuizContractData;
