import Image from 'next/image';
import { Hammer, Orbit } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { QuizType } from '@/api/models/quiz';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { Button } from '@/components/ui/button';
import Loader from '@/components/loader';
import { useConnectModal } from 'thirdweb/react';
import { wallets } from '@/constants/wallets';
import { thirdwebClient } from '@/config/thirdweb';

type Props = {
  quiz: QuizType;
};

const Quiz = (props: Props) => {
  const { quiz } = props;

  const router = useRouter();

  const { connect } = useConnectModal();
  const {
    isConnected,
    totalSupply,
    symbol,
    alreadyMintedGlobalAmount,
    isLoading,
    hasMinted,
    hasTotalSuplyMinted,
  } = useGetQuizContractData();

  const getStatus = () => {
    if (hasMinted) {
      return 'Minted';
    } else {
      return quiz.isLive && !hasTotalSuplyMinted ? 'Live' : 'Passed';
    }
  };

  const handleConnect = async () => {
    try {
      await connect({ client: thirdwebClient, wallets });

      router.push(`/quiz/${quiz.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const renderActionButton = () => {
    if (hasMinted) {
      return (
        <Link href={`/quiz/${quiz.id}`}>
          <Button variant='secondary'>View your NFT</Button>
        </Link>
      );
    }

    if (hasTotalSuplyMinted) {
      return null;
    }

    return isConnected ? (
      <Link href={`/quiz/${quiz.id}`}>
        <Button variant='secondary'>Start</Button>
      </Link>
    ) : (
      <Link href={`/quiz/${quiz.id}`} onClick={(e) => e.preventDefault()}>
        <Button variant='secondary' onClick={handleConnect}>
          Start
        </Button>
      </Link>
    );
  };

  if (isLoading) {
    return (
      <Loader title='Forging your destiny in the realms of fantasy... Prepare to unveil your true calling.' />
    );
  }

  return (
    <div className='flex h-full items-center'>
      <Card className='flex justify-between' background={quiz.gradientImage}>
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
              <Badge variant='outline' className='bg-[#4ade8014] text-primary'>
                {getStatus()}
              </Badge>

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

          <div
            className={`mt-10 flex items-center ${hasTotalSuplyMinted ? 'justify-end' : 'justify-between'}`}
          >
            {renderActionButton()}

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
    </div>
  );
};

export default Quiz;
