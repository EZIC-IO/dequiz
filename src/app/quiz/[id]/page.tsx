'use client';

import Image from 'next/image';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { Line } from 'rc-progress';

import { Card } from '@/components/ui/card';
import { useGetQuizDetails } from '@/api/hooks/useGetQuizDetails';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { generateCharacter } from '@/utils/quiz';
import { Character } from '@/api/models/character';
import { QuizResults } from '@/views/quiz';
import Loader from '@/components/loader';
import Radio from '@/components/ui/radio';

const QuizDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [swiper, setSwiper] = useState<SwiperClass>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [character, setCharacter] = useState<Character>();

  const { quizDetails } = useGetQuizDetails(id);
  const { totalSupply, alreadyMintedGlobalAmount, mintPrice, isLoading } =
    useGetQuizContractData();

  const currentQuetion = quizDetails?.questions[currentSlideIndex];
  const isActionDisabled = !answers[currentQuetion?.id as string];
  const progress =
    (currentSlideIndex / (quizDetails?.questions?.length ?? 0)) * 100;

  if (isLoading) {
    return (
      <div className='flex w-full flex-col space-y-3'>
        <Skeleton className='h-[125px] min-w-[500px] rounded-xl' />
        <div className='space-y-2'>
          <Skeleton className='h-8 min-w-[500px]' />
          <Skeleton className='h-8 min-w-[500px]' />
          <Skeleton className='h-8 min-w-[500px]' />
        </div>
      </div>
    );
  }

  if (!quizDetails) {
    return null;
  }

  const handleNextQuestion = () => {
    swiper?.slideNext();
  };

  const handleFinish = () => {
    const result = generateCharacter(quizDetails.questions, answers);

    setCharacter(result);
  };

  const handleChooseOption = (questionId: string, optionId: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleReset = () => {
    setCharacter(undefined);
    setAnswers({});
    setCurrentSlideIndex(0);
    swiper?.slideTo(0);
  };

  if (isLoading) {
    return (
      <Loader title='Forging your destiny in the realms of fantasy... Prepare to unveil your true calling.' />
    );
  }

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
    <div className='h-full w-full pt-12'>
      <Card
        className='flex justify-between'
        background={currentQuetion?.gradientImage}
      >
        <div className='w-[40%] pl-[51px] pr-[66px] pt-[60px]'>
          <Line
            percent={progress}
            strokeWidth={4}
            trailWidth={4}
            strokeColor='#64748B'
            trailColor='#1E293B'
          />

          <div className='mt-20'>
            <Swiper
              autoHeight
              onSwiper={setSwiper}
              allowTouchMove={false}
              onActiveIndexChange={(swiper) =>
                setCurrentSlideIndex(swiper.activeIndex)
              }
            >
              {quizDetails.questions.map((question) => (
                <SwiperSlide key={question.id}>
                  <div className='flex-[1_1_auto] space-y-4' key={question.id}>
                    <div className='space-y-8'>
                      <h3 className='text-2xl font-semibold'>
                        {question.question}
                      </h3>
                      <ul className='space-y-6'>
                        {question.options.map((option) => (
                          <li key={option.id}>
                            <Radio
                              name={question.question}
                              label={option.label}
                              icon={option.icon}
                              value={option.id}
                              onChange={() =>
                                handleChooseOption(question.id, option.id)
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className='mt-10 flex justify-end'>
              {currentSlideIndex !== quizDetails.questions.length - 1 ? (
                <Button
                  disabled={isActionDisabled}
                  onClick={handleNextQuestion}
                >
                  Next
                </Button>
              ) : (
                <Button disabled={isActionDisabled} onClick={handleFinish}>
                  Finish
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className='relative w-[60%]'>
          {currentQuetion && (
            <Image
              src={currentQuetion.previewImage}
              alt={currentQuetion.question}
              width={773}
              height={769}
              quality={100}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizDetails;
