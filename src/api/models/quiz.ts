export interface QustionType {
  id: string;
  question: string;
  options: string[];
}

export interface QuizType {
  id: string;
  title: string;
  description: string;
  isLive: boolean;
  mintedCount: number;
  image: string;
  mintPrice: number;
  questions: QustionType[];
}
