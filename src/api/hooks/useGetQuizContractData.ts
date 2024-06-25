'use client';

import { useActiveAccount, useReadContract } from 'thirdweb/react';

import { contract } from '@/constants/contract';

const useGetQuizContractData = () => {
  const account = useActiveAccount();
  const isConnected = !!account;

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
  const { data: balanceOf, isLoading: isBalanceOfMintLoading } =
    useReadContract({
      method: 'balanceOf',
      contract,
      params: [account?.address],
      queryOptions: {
        enabled: isConnected,
      },
    });

  const isLoading =
    isTotalSupplyLoading ||
    isMintPriceLoading ||
    isSymbolLoading ||
    isAlreadyMintedGlobalAmountLoading ||
    isBalanceOfMintLoading;

  const hasTotalSuplyMinted =
    totalSupply &&
    alreadyMintedGlobalAmount &&
    Number(totalSupply) === Number(alreadyMintedGlobalAmount);
  const hasMinted = balanceOf && Number(balanceOf) > 0;

  return {
    isConnected,
    isLoading,
    balanceOf,
    totalSupply,
    mintPrice,
    symbol,
    hasMinted,
    hasTotalSuplyMinted,
    alreadyMintedGlobalAmount,
  };
};

export default useGetQuizContractData;
