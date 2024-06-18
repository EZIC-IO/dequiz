import Link from 'next/link';
import Image from 'next/image';
import { Orbit } from 'lucide-react';
import { useReadContract } from 'thirdweb/react';
import { baseSepolia } from 'thirdweb/chains';
import { getContract } from 'thirdweb/contract';

import { QuizType } from '@/api/models/quiz';
import { thirdwebClient, contractAddress } from '@/config/thirdweb';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { abi } from '@/config/abi';
import { weiToEth } from '@/utils/convert';

type Props = {
  quiz: QuizType;
};

const Quiz = (props: Props) => {
  const { quiz } = props;

  const contract = getContract({
    client: thirdwebClient,
    chain: baseSepolia,
    address: contractAddress,
    abi: abi as any[],
  });

  const { isLoading: totalSupplyLoading, data: totalSupply } = useReadContract({
    method: 'totalSupply',
    contract,
    params: ['0x267b6E6B5B91a793122996b1EbDdEB31b4a3a31b'],
  });
  const { isLoading: mintPriceLoading, data: mintPrice } = useReadContract({
    method: 'MINT_PRICE',
    contract,
    params: ['0x267b6E6B5B91a793122996b1EbDdEB31b4a3a31b'],
  });
  const { isLoading: symbolLoading, data: symbol } = useReadContract({
    method: 'symbol',
    contract,
    params: ['0x267b6E6B5B91a793122996b1EbDdEB31b4a3a31b'],
  });
  const {
    isLoading: alreadyMintedGlobalAmountLoading,
    data: alreadyMintedGlobalAmount,
  } = useReadContract({
    method: 'alreadyMintedGlobalAmount',
    contract,
    params: ['0x267b6E6B5B91a793122996b1EbDdEB31b4a3a31b'],
  });

  return (
    <Link href={`/quiz/${quiz.id}`}>
      <Card className='flex bg-gray-400 bg-opacity-10 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter'>
        <Image
          className='rounded-xl border border-primary p-1'
          src={quiz.image}
          alt={quiz.title}
          width={600}
          height={350}
        />

        <CardContent className='flex flex-[1_1_auto] flex-col justify-between'>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-4 text-3xl'>
              <Orbit color='#3e9392' />

              {quiz.title}
            </CardTitle>

            {symbol && <div className='text-green text-2xl'>{symbol}</div>}
          </div>

          <div className='text-lg'>{quiz.description}</div>

          <div className='flex items-center justify-between'>
            {alreadyMintedGlobalAmount && totalSupply && (
              <div>
                <Badge variant='outline' className='text-lg'>
                  Minted: {Number(alreadyMintedGlobalAmount)}/
                  {Number(totalSupply)}
                </Badge>
              </div>
            )}

            {mintPrice && (
              <div className='tex-tlg font-semibold'>
                {weiToEth(mintPrice)} ETH
              </div>
            )}

            {quiz.isLive && (
              <div>
                <Badge className='bg-green hover:bg-green/80 border-transparent text-primary'>
                  Live
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Quiz;
