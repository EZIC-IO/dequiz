import { QuizType } from '../models/quiz';

export const quizes: QuizType[] = [
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
];
