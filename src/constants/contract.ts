import { baseSepolia } from 'thirdweb/chains';
import { getContract } from 'thirdweb/contract';

import { abi } from '@/config/abi';
import { thirdwebClient } from '@/config/thirdweb';

export const contractAddress = '0x85962Dcf3eB36C8d460dB56F9c945E67eB9D78f0';

export const contract = getContract({
  client: thirdwebClient,
  chain: baseSepolia,
  address: contractAddress,
  abi: abi as any[],
});
