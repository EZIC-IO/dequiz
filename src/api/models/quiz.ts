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
}

export interface QuizType {
  id: string;
  title: string;
  description: string;
  isLive: boolean;
  image: string;
  questions: QustionType[];
}
