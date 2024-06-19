'use client';

import Image from 'next/image';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useState } from 'react';

import { useGetQuizDetails } from '@/api/hooks/useGetQuizDetails';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { generateCharacter } from '@/utils/quiz';
import { Character } from '@/api/models/character';

const QuizDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [swiper, setSwiper] = useState<SwiperClass>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [character, setCharacter] = useState<Character>();

  const { quizDetails, isLoading } = useGetQuizDetails(id);
  const { totalSupply, alreadyMintedGlobalAmount } = useGetQuizContractData();

  const isActionDisabled =
    !answers[quizDetails?.questions[currentSlideIndex]?.id as string];

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

  return (
    <div className='w-full'>
      <h2 className='mb-8 text-center text-3xl font-semibold'>
        {quizDetails.title}
      </h2>

      <div className='flex w-full gap-8'>
        <div className='flex w-[50%] flex-col gap-4'>
          <Image
            src={quizDetails.image}
            alt={quizDetails.title}
            width={600}
            height={350}
          />

          <p className='max-w-[600px] text-lg text-muted-foreground'>
            {quizDetails.description}
          </p>

          {alreadyMintedGlobalAmount && totalSupply && (
            <div>
              <Badge variant='outline' className='text-lg'>
                Minted: {Number(alreadyMintedGlobalAmount)}/
                {Number(totalSupply)}
              </Badge>
            </div>
          )}
        </div>

        <div className='w-[50%] space-y-8'>
          {!character ? (
            <Swiper
              autoHeight
              onSwiper={setSwiper}
              allowTouchMove={false}
              onActiveIndexChange={(swiper) =>
                setCurrentSlideIndex(swiper.activeIndex)
              }
            >
              {quizDetails.questions.map((question, index) => (
                <SwiperSlide key={question.id}>
                  <div className='flex-[1_1_auto] space-y-4' key={question.id}>
                    <div className='space-y-8'>
                      <h3 className='text-lg font-semibold'>
                        {index + 1}. {question.question}
                      </h3>
                      <ul className='space-y-4'>
                        {question.options.map((option) => (
                          <li
                            key={option.id}
                            className='flex items-center space-x-2'
                          >
                            <Checkbox
                              id={option.id}
                              onClick={() =>
                                handleChooseOption(question.id, option.id)
                              }
                            />
                            <label
                              htmlFor={option.id}
                              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              {option.label}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className='text-center text-2xl'>
              <div>Congratulations!</div>
              <div>You are {character}</div>
            </div>
          )}

          {!character ? (
            <>
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
            </>
          ) : (
            <div className='flex justify-center'>
              <Button>Mint</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
