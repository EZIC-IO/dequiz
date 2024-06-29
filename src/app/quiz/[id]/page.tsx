'use client';

import { useMemo, useState } from 'react';
import { useActiveAccount, useConnectModal } from 'thirdweb/react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';

import { Card } from '@/components/ui/card';
import { useGetQuizDetails } from '@/api/hooks/useGetQuizDetails';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { generateCharacter } from '@/utils/quiz';
import { GenImgDto, RPGVocation } from '@/api/models/gen-image.dto';
import { QuizForm, QuizResults } from '@/views/quiz';
import { Loader } from '@/components/ui/loader';
import { SwiperClass } from 'swiper/react';
import { FormValues } from '@/views/quiz/QuizForm/utils';
import { useGenerateImage } from '@/api/hooks/useGenerateImage';
import { CURRRENT_EPOCH_ID } from '@/constants/epoch';
import { hashWalletAddress } from '@/utils/signature';
import { thirdwebClient } from '@/config/thirdweb';
import { wallets } from '@/constants/wallets';
import { FormStorageKey } from '@/constants/storage';
import { useGenerateImageAttempts } from '@/hooks/useGenerateImageAttempts';
import { BlurredImage } from '@/components/ui/blurred-image';

const characterAppearanceImages = {
  gradientImage: '/gradient/gradient-6.webp',
  image: {
    src: '/quiz/hero-appearance.webp',
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
  const { decreaseLeftAttempts, hasAttempts } = useGenerateImageAttempts();

  const { quizDetails } = useGetQuizDetails(id);
  const {
    totalSupply,
    alreadyMintedGlobalAmount,
    mintPrice,
    isLoading,
    isConnected,
  } = useGetQuizContractData();

  const form = useForm<FormValues>();
  const { clear } = useFormPersist(FormStorageKey, {
    ...form,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });

  const handleGenerateImageSuccess = () => {
    clear();
    decreaseLeftAttempts();
  };

  const {
    generateImage,
    isPending: isGenerating,
    data: generationAction,
  } = useGenerateImage({
    onSuccess: handleGenerateImageSuccess,
  });

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

  const getWallet = async () => {
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
      ? await getWallet()
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
        eyeColor,
        gender,
        rpgVocation: character,
        facialHair: facialHair ?? false,
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
    <Card
      className='flex justify-between'
      background={currentSlideImages?.gradientImage}
    >
      <div className='max-h-[765px] w-[43%] overflow-y-auto py-14 pl-12 pr-16'>
        <QuizForm
          swiper={swiper}
          onSwiper={setSwiper}
          quiz={quizDetails}
          form={form}
          currentSlideIndex={currentSlideIndex}
          onSlideChange={setCurrentSlideIndex}
          onSubmit={handleGenerateCharacter}
        />
      </div>

      <div className='relative flex w-[57%] justify-end'>
        {currentSlideImages.image && (
          <BlurredImage
            fill
            alt={currentSlideImages.image.alt}
            src={currentSlideImages.image.src}
          />
        )}
      </div>
    </Card>
  );
};

export default QuizDetails;
