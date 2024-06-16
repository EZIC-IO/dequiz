import { useCallback, useEffect, useState } from 'react';

import { Quiz } from '../models/quiz';
// import { useRequestQuery } from '../useRequest';

export const useCurrentQuiz = () => {
  //   const { data, ...rest } = useRequestQuery<Quiz>('/quiz/current');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>();

  const fetchQuiz = useCallback(async () => {
    const getQuiz = () =>
      new Promise<Quiz>((resolve, reject) => {
        setTimeout(() => {
          resolve({
            id: '1',
            title: 'Quiz 1',
            description: 'This is a quiz',
            questions: [
              {
                id: '1',
                question: 'What is 1 + 1?',
                options: ['1', '2', '3', '4'],
              },
              {
                id: '2',
                question: 'What is 2 + 2?',
                options: ['1', '2', '3', '4'],
              },
              {
                id: '3',
                question: 'What is 3 + 3?',
                options: ['1', '2', '3', '4'],
              },
              {
                id: '4',
                question: 'What is 4 + 4?',
                options: ['1', '2', '3', '4'],
              },
            ],
          } as Quiz);
        }, 3000);
      });

    setIsLoading(true);

    const quiz = await getQuiz();

    setCurrentQuiz(quiz);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  return { quiz: currentQuiz, isLoading };
};
