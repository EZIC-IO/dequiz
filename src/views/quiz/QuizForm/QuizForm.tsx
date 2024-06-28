'use client';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useMemo, useState } from 'react';
import { Line } from 'rc-progress';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import CharacterAppearance from './CharacterAppearance';
import Radio from '@/components/ui/radio';
import { QuizType } from '@/api/models/quiz';
import { defaultValues, FormValues } from './utils';
import ShimmerButton from '@/components/ui/shimmer-button';

type Props = {
  quiz: QuizType;
  currentSlideIndex: number;
  swiper?: SwiperClass;
  onSwiper: (swiper: SwiperClass) => void;
  onSlideChange: (index: number) => void;
  onSubmit: (values: FormValues) => void;
};

const QuizDetails = (props: Props) => {
  const { quiz, onSubmit, currentSlideIndex, onSlideChange, swiper, onSwiper } =
    props;
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<Array<string>>(
    []
  );

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: defaultValues as FormValues,
  });

  const progress = (currentSlideIndex / (swiper?.slides?.length ?? 0)) * 100;
  const currentQuetion = quiz.questions[currentSlideIndex];
  const isLastSlide =
    swiper && swiper?.slides && swiper.activeIndex === swiper.slides.length - 1;

  const isNextQuestionAllowed = useMemo(() => {
    if (isLastSlide) {
      return true;
    }

    return (
      currentQuetion?.id && answeredQuestionIds.includes(currentQuetion.id)
    );
  }, [answeredQuestionIds, currentQuetion?.id, isLastSlide]);

  const handleFormSubmit = handleSubmit(onSubmit);

  const handleNextQuestion = () => {
    if (!swiper || !isNextQuestionAllowed) return;

    if (isLastSlide) {
      handleFormSubmit();
    } else {
      swiper?.slideNext();
    }
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
                            render={({ field }) => (
                              <Radio
                                {...field}
                                label={option.label}
                                icon={option.icon}
                                value={option.id}
                                name={question.id}
                                onChange={(value) => {
                                  field.onChange(value);
                                  setAnsweredQuestionIds((prev) => [
                                    ...prev,
                                    question.id,
                                  ]);
                                }}
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

              <ShimmerButton
                disabled={!isNextQuestionAllowed}
                onClick={handleNextQuestion}
              >
                {isLastSlide ? 'Generate' : 'Next'}
              </ShimmerButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizDetails;
