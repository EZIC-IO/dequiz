import { quizes } from '../mock/quiz';

export const useGetQuizDetails = (id: string) => {
  //   const { data, ...rest } = useRequestQuery<Quiz>(`/quizes/${id}`);
  const quizDetails = quizes.find((quiz) => quiz.id === id);

  return { quizDetails, isLoading: false };
};
