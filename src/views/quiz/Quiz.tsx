import Link from 'next/link';
import Image from 'next/image';
import { Orbit } from 'lucide-react';

import { QuizType } from '@/api/models/quiz';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { weiToEth } from '@/utils/convert';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';

type Props = {
  quiz: QuizType;
};

const Quiz = (props: Props) => {
  const { quiz } = props;

  const { totalSupply, mintPrice, symbol, alreadyMintedGlobalAmount } =
    useGetQuizContractData();

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

            {symbol && <div className='text-2xl text-green'>{symbol}</div>}
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
                <Badge className='border-transparent bg-green text-primary hover:bg-green/80'>
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
