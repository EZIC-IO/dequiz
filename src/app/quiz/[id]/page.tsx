'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { Card } from '@/components/ui/card';
import { useGetQuizDetails } from '@/api/hooks/useGetQuizDetails';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { generateCharacter } from '@/utils/quiz';
import { GenPayloadDto, RPGVocation } from '@/api/models/gen-image';
import { QuizForm, QuizResults } from '@/views/quiz';
import Loader from '@/components/loader';
import { SwiperClass } from 'swiper/react';
import { FormValues } from '@/views/quiz/QuizForm/utils';
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
  const [genPayloadData, setGenPayloadData] = useState<GenPayloadDto>();

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

  const handleGenerateCharacter = (values: FormValues) => {
    const { hairLength, hairColor, facialHair, eyeColor, gender, ...rest } =
      values;

    const character = generateCharacter(quizDetails.questions, rest);
    const data: GenPayloadDto = {
      hairColor,
      hairLength,
      facialHair,
      eyeColor,
      gender,
      rpgVocation: character,
    };

    setCharacter(character);
    setGenPayloadData(data);

    generateImage(data);
  };

  const handleRegenerateCharacter = () => {
    if (genPayloadData) {
      generateImage(genPayloadData);
    }
  };

  if (character) {
    return (
      <QuizResults
        character={character}
        mintPrice={mintPrice}
        totalSupply={totalSupply}
        onRegenerate={handleRegenerateCharacter}
        alreadyMintedGlobalAmount={alreadyMintedGlobalAmount}
      />
    );
  }

  return (
    <div className='h-full w-full pl-4 pt-12'>
      <Card
        className='flex justify-between'
        background={currentSlideImages?.gradientImage}
      >
        <div className='w-[45%] overflow-y-scroll py-[60px] pl-[51px] pr-[66px]'>
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
