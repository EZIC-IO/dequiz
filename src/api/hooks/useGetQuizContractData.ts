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

  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useReadContract({
      method: 'totalSupply',
      contract,
      params: [],
    });
  const { data: mintPrice, isLoading: isMintPriceLoading } = useReadContract({
    method: 'MINT_PRICE',
    contract,
    params: [],
  });
  const { data: symbol, isLoading: isSymbolLoading } = useReadContract({
    method: 'symbol',
    contract,
    params: [],
  });
  const {
    data: alreadyMintedGlobalAmount,
    isLoading: isAlreadyMintedGlobalAmountLoading,
  } = useReadContract({
    method: 'alreadyMintedGlobalAmount',
    contract,
    params: [],
  });

  const isLoading =
    isTotalSupplyLoading ||
    isMintPriceLoading ||
    isSymbolLoading ||
    isAlreadyMintedGlobalAmountLoading;

  return {
    isLoading,
    totalSupply,
    mintPrice,
    symbol,
    alreadyMintedGlobalAmount,
  };
};

export default useGetQuizContractData;
