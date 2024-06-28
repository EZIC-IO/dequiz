import { RPGVocation } from './gen-image.dto';

export interface OptionType {
  id: string;
  label: string;
  score: Record<RPGVocation, number>;
  icon?: React.ReactNode;
}

export interface QustionType {
  id: string;
  question: string;
  options: OptionType[];
  previewImage: string;
  gradientImage: string;
}

export interface QuizType {
  id: string;
  epochId: string;
  title: string;
  description: string;
  isLive: boolean;
  previewImage: string;
  gradientImage: string;
  questions: QustionType[];
}
