export interface Qustion {
  id: string;
  question: string;
  options: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Qustion[];
}
