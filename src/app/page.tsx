'use client';

import Quiz from '@/views/quiz';
import { Separator } from '@/components/ui/separator';
import { useGetQuizes } from '@/api/hooks/useGetQuizes';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { quizes, isLoading } = useGetQuizes();

  if (isLoading) {
    return (
      <div className='w-full space-y-6'>
        <div className='flex flex-col space-y-3'>
          <Skeleton className='h-[125px] min-w-[500px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-8 min-w-[500px]' />
            <Skeleton className='h-8 min-w-[500px]' />
            <Skeleton className='h-8 min-w-[500px]' />
          </div>
        </div>
        <div className='flex flex-col space-y-3'>
          <Skeleton className='h-[125px] min-w-[500px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-8 min-w-[500px]' />
            <Skeleton className='h-8 min-w-[500px]' />
            <Skeleton className='h-8 min-w-[500px]' />
          </div>
        </div>
      </div>
    );
  }

  if (!quizes?.length) {
    return (
      <p className='text-muted-foreground text-lg font-semibold'>
        Sorry, no quizes yet, please check again later!
      </p>
    );
  }
  return (
    <div className='w-full'>
      {quizes.map((quiz, index) => (
        <div key={quiz.id} className='space-y-6'>
          <Quiz quiz={quiz} />

          {index !== quizes.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
