import Image from 'next/image';

import { useGetQuizDetails } from '@/api/hooks/useGetQuizDetails';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';

const QuizDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { quizDetails, isLoading } = useGetQuizDetails(id);

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

  return (
    <div className='w-full'>
      <h2 className='mb-8 text-center text-3xl font-semibold'>
        {quizDetails.title}
      </h2>

      <div className='flex w-full gap-8'>
        <div className='flex flex-col gap-4'>
          <Image
            src={quizDetails.image}
            alt={quizDetails.title}
            width={600}
            height={350}
          />

          <p className='text-muted-foreground max-w-[600px] text-lg'>
            {quizDetails.description}
          </p>

          <div>
            <Badge variant='outline'>
              Minted: {quizDetails.mintedCount}/1000
            </Badge>
          </div>
        </div>

        <div className='flex-[1_1_auto] space-y-4'>
          {quizDetails.questions.map((question) => (
            <div key={question.id} className='space-y-2'>
              <h3 className='text-lg font-semibold'>{question.question}</h3>
              <ul className='space-y-4'>
                {question.options.map((option) => (
                  <li key={option} className='flex items-center space-x-2'>
                    <Checkbox id={option} />
                    <label
                      htmlFor={option}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
