import { quizes } from '../mock/quiz';

export const useGetQuizes = () => {
  //   const { data, ...rest } = useRequestQuery<Quiz>('/quizes');
  return { quizes, isLoading: false };
};
