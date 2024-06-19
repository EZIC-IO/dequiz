import { QuizType } from '../models/quiz';
import { Character } from '../models/character';

export const quizes: QuizType[] = [
  {
    id: '1',
    title: 'Epoch 1 - Quiz 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image:
      'https://img.freepik.com/free-photo/cyberpunk-urban-scenery_23-2150712464.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718323200&semt=ais_user',
    isLive: true,
    questions: [
      {
        id: '1',
        question: 'How would you describe your personality?',
        options: [
          {
            id: '1',
            label: 'Adventurous/Brave',
            score: {
              [Character.Wizard]: 1,
              [Character.Knight]: 3,
              [Character.Rogue]: 2,
            },
          },
          {
            id: '2',
            label: 'Creative/Artful',
            score: {
              [Character.Wizard]: 2,
              [Character.Knight]: 1,
              [Character.Rogue]: 2,
            },
          },
          {
            id: '3',
            label: 'Wise/Analytical',
            score: {
              [Character.Wizard]: 3,
              [Character.Knight]: 1,
              [Character.Rogue]: 1,
            },
          },
        ],
      },
      {
        id: '2',
        question: 'Which type of environment resonates most with your soul?',
        options: [
          {
            id: '4',
            label: 'Forest',
            score: {
              [Character.Wizard]: 1,
              [Character.Knight]: 2,
              [Character.Rogue]: 2,
            },
          },
          {
            id: '5',
            label: 'Mountains',
            score: {
              [Character.Wizard]: 1,
              [Character.Knight]: 3,
              [Character.Rogue]: 1,
            },
          },
          {
            id: '6',
            label: 'Desert',
            score: {
              [Character.Wizard]: 2,
              [Character.Knight]: 1,
              [Character.Rogue]: 3,
            },
          },
        ],
      },
      {
        id: '3',
        question: 'What role do you often take in a group?',
        options: [
          {
            id: '7',
            label: 'Leader',
            score: {
              [Character.Wizard]: 1,
              [Character.Knight]: 3,
              [Character.Rogue]: 1,
            },
          },
          {
            id: '8',
            label: 'Strategist',
            score: {
              [Character.Wizard]: 3,
              [Character.Knight]: 2,
              [Character.Rogue]: 1,
            },
          },
          {
            id: '9',
            label: 'Innovator',
            score: {
              [Character.Wizard]: 2,
              [Character.Knight]: 1,
              [Character.Rogue]: 3,
            },
          },
        ],
      },
      {
        id: '4',
        question: 'How do you prefer to spend your leisure time?',
        options: [
          {
            id: '10',
            label: 'Traveling',
            score: {
              [Character.Wizard]: 1,
              [Character.Knight]: 2,
              [Character.Rogue]: 2,
            },
          },
          {
            id: '11',
            label: 'Relaxing with a book',
            score: {
              [Character.Wizard]: 3,
              [Character.Knight]: 1,
              [Character.Rogue]: 1,
            },
          },
          {
            id: '12',
            label: 'Working on a creative project/side-project',
            score: {
              [Character.Wizard]: 1,
              [Character.Knight]: 2,
              [Character.Rogue]: 3,
            },
          },
        ],
      },
      {
        id: '5',
        question: 'What is your ultimate goal in life?',
        options: [
          {
            id: '11',
            label: 'Adventure',
            score: {
              [Character.Wizard]: 1,
              [Character.Knight]: 3,
              [Character.Rogue]: 2,
            },
          },
          {
            id: '12',
            label: 'Knowledge',
            score: {
              [Character.Wizard]: 3,
              [Character.Knight]: 1,
              [Character.Rogue]: 1,
            },
          },
          {
            id: '13',
            label: 'Harmony',
            score: {
              [Character.Wizard]: 2,
              [Character.Knight]: 2,
              [Character.Rogue]: 2,
            },
          },
        ],
      },
    ],
  },
];
