'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Card } from '@/components/ui/card';
import { useGetQuizDetails } from '@/api/hooks/useGetQuizDetails';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { generateCharacter } from '@/utils/quiz';
import { Character } from '@/api/models/character';
import { QuizForm, QuizResults } from '@/views/quiz';
import Loader from '@/components/loader';

const QuizDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [character, setCharacter] = useState<Character | null>(null);

  const { quizDetails } = useGetQuizDetails(id);
  const { totalSupply, alreadyMintedGlobalAmount, mintPrice, isLoading } =
    useGetQuizContractData();

  const currentQuestion = quizDetails?.questions[currentSlideIndex];

  if (isLoading) {
    return (
      <Loader title='Forging your destiny in the realms of fantasy... Prepare to unveil your true calling.' />
    );
  }

  if (!quizDetails) {
    return null;
  }

  const handleReset = () => {
    setCharacter(null);
    setCurrentSlideIndex(0);
  };

  const handleGenerateCharacter = (values: Record<string, string>) => {
    const result = generateCharacter(quizDetails.questions, values);

    setCharacter(result);
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
    <div className='h-full w-full pt-12'>
      <Card
        className='flex justify-between'
        background={currentQuestion?.gradientImage}
      >
        <div className='w-[40%] py-[60px] pl-[51px] pr-[66px]'>
          <QuizForm
            quiz={quizDetails}
            currentSlideIndex={currentSlideIndex}
            onSlideChange={setCurrentSlideIndex}
            onGenerate={handleGenerateCharacter}
          />
        </div>

        <div className='relative flex w-[60%] justify-end'>
          {currentQuestion && (
            <Image
              src={currentQuestion.previewImage}
              alt={currentQuestion.question}
              width={773}
              height={769}
              quality={100}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizDetails;
