'use client';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { Line } from 'rc-progress';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import CharacterAppearance from './CharacterAppearance';
import Radio from '@/components/ui/radio';
import { QuizType } from '@/api/models/quiz';

type Props = {
  quiz: QuizType;
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  onGenerate: (values: Record<string, string>) => void;
};

const QuizDetails = (props: Props) => {
  const { quiz, onGenerate, currentSlideIndex, onSlideChange } = props;

  const [swiper, setSwiper] = useState<SwiperClass>();
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<Array<string>>(
    []
  );

  const { handleSubmit, control } = useForm<Record<string, string>>();

  const progress = (currentSlideIndex / (swiper?.slides?.length ?? 0)) * 100;
  const currentQuetion = quiz.questions[currentSlideIndex];
  const isNextQuestionAllowed =
    currentQuetion?.id && answeredQuestionIds.includes(currentQuetion.id);

  const onSubmit = handleSubmit(onGenerate);

  const handleNextQuestion = () => {
    if (!swiper) return;

    if (swiper.activeIndex === swiper.slides.length - 1) {
      onSubmit();
    } else {
      swiper?.slideNext();
    }
  };

  const handlePrevQuestion = () => {
    swiper?.slidePrev();
  };

  return (
    <>
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
            onSwiper={setSwiper}
            allowTouchMove={false}
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

            {/* TODO: */}
            {/* <SwiperSlide>
              <CharacterAppearance />
            </SwiperSlide> */}
          </Swiper>

          <div className='mt-10 flex justify-end'>
            <div className='flex gap-2'>
              {currentSlideIndex !== 0 && (
                <Button variant='secondary' onClick={handlePrevQuestion}>
                  Previous
                </Button>
              )}

              <Button
                disabled={!isNextQuestionAllowed}
                onClick={handleNextQuestion}
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default QuizDetails;
