'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useActiveAccount, useConnectModal } from 'thirdweb/react';

import { Card } from '@/components/ui/card';
import { useGetQuizDetails } from '@/api/hooks/useGetQuizDetails';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { generateCharacter } from '@/utils/quiz';
import { GenImgDto, RPGVocation } from '@/api/models/gen-image.dto';
import { QuizForm, QuizResults } from '@/views/quiz';
import Loader from '@/components/loader';
import { SwiperClass } from 'swiper/react';
import { FormValues } from '@/views/quiz/QuizForm/utils';
import { useGenerateImage } from '@/api/hooks/useGenerateImage';
import { CURRRENT_EPOCH_ID } from '@/constants/epoch';
import { hashWalletAddress } from '@/utils/signature';
import { thirdwebClient } from '@/config/thirdweb';
import { wallets } from '@/constants/wallets';
import { useGenerateImageAttempts } from '@/hooks/useGenerateImageAttempts';

const characterAppearanceImages = {
  gradientImage: '/gradient/gradient-6.png',
  image: {
    src: '/quiz/hero-appearance.png',
    alt: "Shape Your Hero's Appearance",
  },
};

const QuizDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { connect } = useConnectModal();

  const activeAccount = useActiveAccount();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [character, setCharacter] = useState<RPGVocation | null>(null);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [formValues, setFormValues] = useState<FormValues>();
  const { increaseLeftAttempts, hasAttempts } = useGenerateImageAttempts();

  const {
    generateImage,
    isPending: isGenerating,
    data: generationAction,
  } = useGenerateImage({
    onSuccess: increaseLeftAttempts,
  });
  const { quizDetails } = useGetQuizDetails(id);
  const {
    totalSupply,
    alreadyMintedGlobalAmount,
    mintPrice,
    isLoading,
    isConnected,
  } = useGetQuizContractData();

  const currentQuestion = quizDetails?.questions[currentSlideIndex];
  const isCharacterAppearanceSlide = swiper?.slides
    ? currentSlideIndex === swiper?.slides?.length - 1
    : false;
  const currentSlideImages = useMemo(() => {
    if (isCharacterAppearanceSlide) {
      return characterAppearanceImages;
    }

    return {
      gradientImage: currentQuestion?.gradientImage ?? '',
      image: {
        src: currentQuestion?.previewImage ?? '',
        alt: currentQuestion?.question ?? '',
      },
    };
  }, [
    currentQuestion?.gradientImage,
    currentQuestion?.previewImage,
    currentQuestion?.question,
    isCharacterAppearanceSlide,
  ]);

  const handleConnect = async () => {
    try {
      const wallet = await connect({ client: thirdwebClient, wallets });

      return (wallet as any).getAccount().address as string;
    } catch (e) {
      console.error(e);
      return '';
    }
  };

  const handleGenerateCharacter = async (values: FormValues) => {
    if (!hasAttempts) return;

    const walletAddress = !isConnected
      ? await handleConnect()
      : activeAccount?.address;

    if (!walletAddress || !quizDetails) return;

    const { hairLength, hairColor, facialHair, eyeColor, gender, ...rest } =
      values;

    const character = generateCharacter(quizDetails.questions, rest);
    const data: GenImgDto = {
      epochId: CURRRENT_EPOCH_ID,
      identityHash: hashWalletAddress(walletAddress),
      payload: {
        hairColor,
        hairLength,
        facialHair,
        eyeColor,
        gender,
        rpgVocation: character,
      },
    };

    setCharacter(character);
    setFormValues(values);

    generateImage(data);
  };

  const handleRegenerateCharacter = async () => {
    if (formValues) {
      handleGenerateCharacter(formValues);
    }
  };

  if (isLoading) {
    return (
      <Loader title='Forging your destiny in the realms of fantasy... Prepare to unveil your true calling.' />
    );
  }

  if (isGenerating) {
    return <Loader title='Hold tight, your epic destiny is being forged!' />;
  }

  if (!quizDetails) {
    return null;
  }

  if (character && generationAction) {
    return (
      <QuizResults
        character={character}
        mintPrice={mintPrice}
        totalSupply={totalSupply}
        generationAction={generationAction}
        onRegenerate={handleRegenerateCharacter}
        alreadyMintedGlobalAmount={alreadyMintedGlobalAmount}
      />
    );
  }

  return (
    <div className='h-full w-full pl-4'>
      <Card
        className='flex justify-between'
        background={currentSlideImages?.gradientImage}
      >
        <div className='w-[55%] overflow-y-scroll py-[60px] pl-[51px] pr-[66px]'>
          <QuizForm
            swiper={swiper}
            onSwiper={setSwiper}
            quiz={quizDetails}
            currentSlideIndex={currentSlideIndex}
            onSlideChange={setCurrentSlideIndex}
            onSubmit={handleGenerateCharacter}
          />
        </div>

        <div className='relative flex w-[45%] justify-end'>
          {currentSlideImages.image && (
            <Image
              width={773}
              height={769}
              quality={100}
              alt={currentSlideImages.image.alt}
              src={currentSlideImages.image.src}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizDetails;
