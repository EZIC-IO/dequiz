'use client';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useMemo } from 'react';
import { Line } from 'rc-progress';
import pluralize from 'pluralize';
import { BadgeInfo } from 'lucide-react';
import { Controller, UseFormReturn } from 'react-hook-form';
import Link from 'next/link';

import CharacterAppearance from './CharacterAppearance';
import Radio from '@/components/ui/radio';
import { QuizType } from '@/api/models/quiz';
import { FormValues } from './utils';
import ShimmerButton from '@/components/ui/shimmer-button';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { useGenerateImageAttempts } from '@/hooks/useGenerateImageAttempts';

type Props = {
  quiz: QuizType;
  currentSlideIndex: number;
  swiper?: SwiperClass;
  onSwiper: (swiper: SwiperClass) => void;
  onSlideChange: (index: number) => void;
  onSubmit: (values: FormValues) => void;
  form: UseFormReturn<FormValues, any, undefined>;
};

const QuizDetails = (props: Props) => {
  const {
    quiz,
    onSubmit,
    currentSlideIndex,
    onSlideChange,
    swiper,
    onSwiper,
    form,
  } = props;

  const { handleSubmit, control, getValues } = form;
  const { hasMinted, isConnected } = useGetQuizContractData();
  const { attemptsLeft, hasAttempts } = useGenerateImageAttempts();

  const progress = (currentSlideIndex / (swiper?.slides?.length ?? 0)) * 100;
  const currentQuestion = quiz.questions[currentSlideIndex];
  const isLastSlide =
    swiper?.slides && swiper.activeIndex === swiper.slides.length - 1;
  const canGenerate = hasMinted || !hasAttempts || !form.formState.isValid;

  const values = getValues();
  const isNextQuestionAllowed = useMemo(() => {
    const currentQuestionValue = values[currentQuestion?.id];

    return !!currentQuestionValue;
  }, [currentQuestion?.id, values]);

  const handleFormSubmit = handleSubmit(onSubmit);

  const handleNextQuestion = () => {
    if (!isNextQuestionAllowed) return;

    swiper?.slideNext();
    // Trigger validation for persisted form if no fields touched
    form.trigger();
  };

  const handleGenerate = () => {
    if (!canGenerate) return;

    handleFormSubmit();
  };

  const handlePrevQuestion = () => {
    swiper?.slidePrev();
  };

  return (
    <div className='h-[50vh]'>
      <Line
        percent={progress}
        strokeWidth={4}
        trailWidth={4}
        strokeColor='#64748B'
        trailColor='#1E293B'
      />

      <div className='mt-20'>
        <form onSubmit={(e) => e.preventDefault()}>
          <Swiper
            autoHeight
            onSwiper={onSwiper}
            allowTouchMove={false}
            initialSlide={currentSlideIndex}
            onActiveIndexChange={(swiper) => onSlideChange(swiper.activeIndex)}
          >
            {quiz.questions.map((question, index) => (
              <SwiperSlide key={`${question.id}-${index}`}>
                <div className='flex-[1_1_auto] space-y-4'>
                  <div className='space-y-8'>
                    <h3 className='text-2xl font-semibold'>
                      {question.question}
                    </h3>

                    <ul className='space-y-6'>
                      {question.options.map((option) => (
                        <li key={option.id}>
                          <Controller
                            name={question.id}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Radio
                                {...field}
                                label={option.label}
                                icon={option.icon}
                                value={option.id}
                                name={question.id}
                                checked={field.value === option.id}
                              />
                            )}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <SwiperSlide>
              <CharacterAppearance control={control} />
            </SwiperSlide>
          </Swiper>

          <div className='mt-10 flex justify-end'>
            <div className='flex gap-2'>
              {currentSlideIndex !== 0 && (
                <ShimmerButton variant='secondary' onClick={handlePrevQuestion}>
                  Previous
                </ShimmerButton>
              )}

              {isLastSlide ? (
                <ShimmerButton onClick={handleGenerate} disabled={!canGenerate}>
                  Generate
                </ShimmerButton>
              ) : (
                <ShimmerButton
                  disabled={!isNextQuestionAllowed}
                  onClick={handleNextQuestion}
                >
                  Next
                </ShimmerButton>
              )}
            </div>
          </div>

          {isLastSlide && isConnected && (
            <div className='flex justify-end'>
              <div className='mt-3 flex items-center gap-2 text-xs'>
                <BadgeInfo />
                {hasMinted ? (
                  <>
                    Note: you&apos;ve already minted{' '}
                    <Link href='/minted'>your NFT</Link>
                  </>
                ) : (
                  <>
                    Note: you have {pluralize('attempt', attemptsLeft, true)}{' '}
                    remaining
                  </>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuizDetails;
