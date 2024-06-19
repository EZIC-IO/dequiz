import Image from 'next/image';
import { Hammer, Orbit } from 'lucide-react';
import Link from 'next/link';

import { QuizType } from '@/api/models/quiz';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { Button } from '@/components/ui/button';
import Loader from '@/components/loader';

type Props = {
  quiz: QuizType;
};

const Quiz = (props: Props) => {
  const { quiz } = props;

  const { totalSupply, symbol, alreadyMintedGlobalAmount, isLoading } =
    useGetQuizContractData();

  if (isLoading) {
    return (
      <Loader title='Forging your destiny in the realms of fantasy... Prepare to unveil your true calling.' />
    );
  }

  return (
    <Card className='flex justify-between' background='/quiz/gradient-1.png'>
      <div className='w-[50%]'>
        <Image
          src={quiz.previewImage}
          alt={quiz.title}
          width={682}
          height={563}
          loading='eager'
          quality={100}
        />
      </div>

      <CardContent className='flex w-[50%] flex-[1_1_auto] flex-col justify-between pl-[92px] pr-[56px] pt-[63px]'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-5'>
            {quiz.isLive && (
              <Badge variant='outline' className='bg-[#4ade8014] text-primary'>
                Live
              </Badge>
            )}

            <Badge variant='outline' className='flex gap-2 text-primary'>
              <Orbit color='#4ADE80' />
              <span>Epoch {quiz.epochId}</span>
            </Badge>

            {symbol && (
              <Badge variant='outline' className='text-primary'>
                {symbol}
              </Badge>
            )}
          </div>
        </div>

        <h1 className='mt-5 text-5xl font-extrabold'>{quiz.title}</h1>

        <div className='mt-5'>{quiz.description}</div>

        <div className='mt-10 flex items-center justify-between'>
          <Link href={`/quiz/${quiz.id}`}>
            <Button variant='secondary'>Start</Button>
          </Link>

          {alreadyMintedGlobalAmount && totalSupply && (
            <div>
              <Badge variant='outline' className='flex gap-2 text-lg'>
                <Hammer />

                <span>
                  Minted: {Number(alreadyMintedGlobalAmount)}/
                  {Number(totalSupply)}
                </span>
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;
