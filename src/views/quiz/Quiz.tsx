import { useCurrentQuiz } from '@/api/hooks/useGetCurrentQuiz';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';

const Quiz = () => {
  const { quiz, isLoading } = useCurrentQuiz();

  if (isLoading) {
    return (
      <div className='flex flex-col space-y-3'>
        <Skeleton className='h-[125px] min-w-[500px] rounded-xl' />
        <div className='space-y-2'>
          <Skeleton className='h-8 min-w-[500px]' />
          <Skeleton className='h-8 min-w-[500px]' />
          <Skeleton className='h-8 min-w-[500px]' />
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <p className='text-muted-foreground text-lg font-semibold'>
        Sorry, no quiz for today, please check again later!
      </p>
    );
  }

  return (
    <div>
      <h2 className='text-center text-3xl font-semibold'>{quiz?.title}</h2>

      <p className='text-muted-foreground text-center text-lg'>
        {quiz.description}
      </p>

      <div className='space-y-4'>
        {quiz.questions.map((question) => (
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
  );
};

export default Quiz;
