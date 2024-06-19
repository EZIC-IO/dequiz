import { Character } from './character';

export interface OptionType {
  id: string;
  label: string;
  score: Record<Character, number>;
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
