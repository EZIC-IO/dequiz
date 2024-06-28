import { quizes } from '../mock/quiz';

export const useGetQuizDetails = (id: string) => {
  const quizDetails = quizes.find((quiz) => quiz.id === id);

  return { quizDetails, isLoading: false };
};
