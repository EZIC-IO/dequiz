'use client';

import { Quiz } from '@/views/quiz';
import { useGetQuizes } from '@/api/hooks/useGetQuizes';

export default function Home() {
  const { quizes } = useGetQuizes();

  return quizes.map((quiz) => <Quiz quiz={quiz} key={quiz.id} />);
}
