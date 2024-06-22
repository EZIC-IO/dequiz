'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { Card } from '@/components/ui/card';
import { useGetQuizDetails } from '@/api/hooks/useGetQuizDetails';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { generateCharacter } from '@/utils/quiz';
import { RPGVocation } from '@/api/models/gen-image';
import { QuizForm, QuizResults } from '@/views/quiz';
import Loader from '@/components/loader';
import { SwiperClass } from 'swiper/react';
import {
  FormValues,
  mapFormValuesToGenPayload,
} from '@/views/quiz/QuizForm/utils';
import { useGenerateImage } from '@/api/hooks/useGenerateImage';

const characterAppearanceImages = {
  gradientImage: '/gradient/gradient-6.png',
  image: {
    src: '/quiz/hero-appearance.png',
    alt: "Shape Your Hero's Appearance",
  },
};

const QuizDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [character, setCharacter] = useState<RPGVocation | null>(null);
  const [swiper, setSwiper] = useState<SwiperClass>();

  const { generateImage, isPending: isGenerating } = useGenerateImage();
  const { quizDetails } = useGetQuizDetails(id);
  const { totalSupply, alreadyMintedGlobalAmount, mintPrice, isLoading } =
    useGetQuizContractData();

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

  const handleReset = () => {
    setCharacter(null);
    setCurrentSlideIndex(0);
  };

  const handleGenerateCharacter = (values: FormValues) => {
    const { hairLength, hairColor, facialHair, eyeColor, gender, ...rest } =
      values;

    const character = generateCharacter(quizDetails.questions, rest);

    setCharacter(character);

    generateImage(
      mapFormValuesToGenPayload(
        {
          hairLength,
          hairColor,
          facialHair,
          eyeColor,
          gender,
        },
        character
      )
    );
  };

  if (character) {
    return (
      <QuizResults
        character={character}
        mintPrice={mintPrice}
        onReset={handleReset}
        totalSupply={totalSupply}
        alreadyMintedGlobalAmount={alreadyMintedGlobalAmount}
      />
    );
  }

  return (
    <div className='h-full w-full pt-12 pl-4'>
      <Card
        className='flex justify-between'
        background={currentSlideImages?.gradientImage}
      >
        <div className='w-[45%] py-[60px] pl-[51px] pr-[66px]'>
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
