import { BadgeInfo, Hammer, Orbit } from 'lucide-react';
import Link from 'next/link';
import pluralize from 'pluralize';
import { TypeAnimation } from 'react-type-animation';

import { QuizType } from '@/api/models/quiz';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { Loader } from '@/components/ui/loader';
import { useConnectModal } from 'thirdweb/react';
import { wallets } from '@/constants/wallets';
import { thirdwebClient } from '@/config/thirdweb';
import ShimmerButton from '@/components/ui/shimmer-button';
import { useGenerateImageAttempts } from '@/hooks/useGenerateImageAttempts';
import { BlurredImage } from '@/components/ui/blurred-image';

type Props = {
  quiz: QuizType;
};

const Quiz = (props: Props) => {
  const { quiz } = props;

  const { hasAttempts, attemptsLeft } = useGenerateImageAttempts();
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
  const showAttemptsLeftCount =
    !hasMinted && !hasTotalSuplyMinted && isConnected;

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
    } catch (e) {
      console.error(e);
    }
  };

  const renderActionButton = () => {
    if (hasMinted) {
      return (
        <Link href='/minted'>
          <ShimmerButton>View your NFT</ShimmerButton>
        </Link>
      );
    }

    if (hasTotalSuplyMinted) {
      return null;
    }

    return isConnected ? (
      <Link href={`/quiz/${quiz.id}`} aria-disabled={!hasAttempts}>
        <ShimmerButton disabled={!hasAttempts}>Start</ShimmerButton>
      </Link>
    ) : (
      <Link href={`/quiz/${quiz.id}`} onClick={(e) => e.preventDefault()}>
        <ShimmerButton onClick={handleConnect}>Connect to start</ShimmerButton>
      </Link>
    );
  };

  if (isLoading) {
    return (
      <Loader title='Forging your destiny in the realms of fantasy... Prepare to unveil your true calling.' />
    );
  }

  return (
    <Card
      className='flex max-h-[583px] justify-between'
      background={quiz.gradientImage}
    >
      <div className='relative w-[50%]'>
        <BlurredImage
          fill
          src={quiz.previewImage}
          alt={quiz.title}
          loading='eager'
        />
      </div>

      <CardContent className='flex w-[50%] flex-[1_1_auto] flex-col justify-between overflow-y-auto py-10 pl-20 pr-14'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-5'>
            <Badge variant='success'>{getStatus()}</Badge>

            <Badge className='flex gap-2'>
              <Orbit size={16} color='#4ADE80' />
              <span>Epoch {quiz.epochId}</span>
            </Badge>

            {symbol && <Badge variant='secondary'>{symbol}</Badge>}
          </div>
        </div>

        <h1 className='font-tangak mt-8 max-w-[400px] text-5xl'>
          <TypeAnimation
            cursor={false}
            sequence={[quiz.title, 1000]}
            speed={50}
          />
        </h1>

        <div className='mt-5 text-sm leading-6'>{quiz.description}</div>

        <div
          className={`mt-6 flex items-center gap-4 ${hasTotalSuplyMinted ? 'justify-end' : 'justify-between'}`}
        >
          {renderActionButton()}

          {alreadyMintedGlobalAmount && totalSupply && (
            <div>
              <Badge className='flex gap-2'>
                <Hammer size={16} />

                <span>
                  Minted: {Number(alreadyMintedGlobalAmount)}/
                  {Number(totalSupply)}
                </span>
              </Badge>
            </div>
          )}
        </div>

        {showAttemptsLeftCount && (
          <div className='mt-4 flex items-center gap-1 text-xs'>
            <BadgeInfo size={16} />
            Note: you have {pluralize(
              'generation attempt',
              attemptsLeft,
              true
            )}{' '}
            remaining
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Quiz;
