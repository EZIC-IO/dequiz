import { base } from 'thirdweb/chains';
import { getContract } from 'thirdweb/contract';

import { abi } from '@/config/abi';
import { thirdwebClient } from '@/config/thirdweb';

export const contractAddress = '0x111df4658E0BeB085C4485d528026081122F9407';

export const contract = getContract({
  client: thirdwebClient,
  chain: base,
  address: contractAddress,
  abi: abi as any[],
});
