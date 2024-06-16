import { useCallback, useEffect, useState } from 'react';

import { QuizType } from '../models/quiz';
// import { useRequestQuery } from '../useRequest';

export const useGetQuizes = () => {
  //   const { data, ...rest } = useRequestQuery<Quiz>('/quizes');
  const [isLoading, setIsLoading] = useState(true);
  const [quizes, setQuizes] = useState<QuizType[]>();

  const fetchQuizes = useCallback(async () => {
    const getQuizes = () =>
      new Promise<QuizType[]>((resolve, reject) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              title: 'Epoch 1 - Quiz 1',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              image:
                'https://img.freepik.com/free-photo/cyberpunk-urban-scenery_23-2150712464.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718323200&semt=ais_user',
              mintedCount: 100,
              isLive: true,
              mintPrice: 0.01,
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
            },
            {
              id: '2',
              title: 'Epoch 2 - Quiz 2',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              image:
                'https://img.freepik.com/free-photo/cyberpunk-urban-scenery_23-2150712464.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718323200&semt=ais_user',
              mintedCount: 100,
              isLive: false,
              mintPrice: 0.001,
              questions: [
                {
                  id: '5',
                  question: 'What is 1 + 1?',
                  options: ['1', '2', '3', '4'],
                },
                {
                  id: '6',
                  question: 'What is 2 + 2?',
                  options: ['1', '2', '3', '4'],
                },
                {
                  id: '7',
                  question: 'What is 3 + 3?',
                  options: ['1', '2', '3', '4'],
                },
                {
                  id: '8',
                  question: 'What is 4 + 4?',
                  options: ['1', '2', '3', '4'],
                },
              ],
            },
          ]);
        }, 1000);
      });

    setIsLoading(true);

    const quiz = await getQuizes();

    setQuizes(quiz);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchQuizes();
  }, [fetchQuizes]);

  return { quizes, isLoading };
};
