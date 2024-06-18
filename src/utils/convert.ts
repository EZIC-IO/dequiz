import { ethers, BigNumberish } from 'ethers';

export const weiToEth = (wei: BigNumberish) => {
  return ethers.formatEther(wei);
};
