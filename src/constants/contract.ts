import { baseSepolia } from 'thirdweb/chains';
import { getContract } from 'thirdweb/contract';

import { abi } from '@/config/abi';
import { thirdwebClient } from '@/config/thirdweb';

export const contractAddress = '0xF3081AD87919E2A49173821422d4a4203A5FdF07';

export const contract = getContract({
  client: thirdwebClient,
  chain: baseSepolia,
  address: contractAddress,
  abi: abi as any[],
});
