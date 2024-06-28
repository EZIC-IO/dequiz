import { baseSepolia } from 'thirdweb/chains';
import { getContract } from 'thirdweb/contract';

import { abi } from '@/config/abi';
import { thirdwebClient } from '@/config/thirdweb';

export const contractAddress = '0x6a879d9E6CE4a9185976e33097A92bAC1f12265c';

export const contract = getContract({
  client: thirdwebClient,
  chain: baseSepolia,
  address: contractAddress,
  abi: abi as any[],
});
