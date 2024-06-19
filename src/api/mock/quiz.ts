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
              [Character.WIZARD]: 1,
              [Character.WARRIOR]: 3,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 2,
            },
          },
          {
            id: '2',
            label: 'Creative/Artful',
            score: {
              [Character.WIZARD]: 2,
              [Character.WARRIOR]: 1,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 2,
            },
          },
          {
            id: '3',
            label: 'Wise/Analytical',
            score: {
              [Character.WIZARD]: 3,
              [Character.WARRIOR]: 1,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 1,
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
              [Character.WIZARD]: 1,
              [Character.WARRIOR]: 2,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 3,
            },
          },
          {
            id: '5',
            label: 'Mountains',
            score: {
              [Character.WIZARD]: 1,
              [Character.WARRIOR]: 3,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 2,
            },
          },
          {
            id: '6',
            label: 'Desert',
            score: {
              [Character.WIZARD]: 2,
              [Character.WARRIOR]: 1,
              [Character.ROGUE]: 3,
              [Character.RANGER]: 1,
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
              [Character.WIZARD]: 1,
              [Character.WARRIOR]: 3,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 2,
            },
          },
          {
            id: '8',
            label: 'Strategist',
            score: {
              [Character.WIZARD]: 3,
              [Character.WARRIOR]: 2,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 2,
            },
          },
          {
            id: '9',
            label: 'Innovator',
            score: {
              [Character.WIZARD]: 2,
              [Character.WARRIOR]: 1,
              [Character.ROGUE]: 3,
              [Character.RANGER]: 1,
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
              [Character.WIZARD]: 1,
              [Character.WARRIOR]: 2,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 3,
            },
          },
          {
            id: '11',
            label: 'Relaxing with a book',
            score: {
              [Character.WIZARD]: 3,
              [Character.WARRIOR]: 1,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 1,
            },
          },
          {
            id: '12',
            label: 'Working on a creative project/side-project',
            score: {
              [Character.WIZARD]: 1,
              [Character.WARRIOR]: 2,
              [Character.ROGUE]: 3,
              [Character.RANGER]: 1,
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
              [Character.WIZARD]: 1,
              [Character.WARRIOR]: 3,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 3,
            },
          },
          {
            id: '12',
            label: 'Knowledge',
            score: {
              [Character.WIZARD]: 3,
              [Character.WARRIOR]: 1,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 1,
            },
          },
          {
            id: '13',
            label: 'Harmony',
            score: {
              [Character.WIZARD]: 2,
              [Character.WARRIOR]: 2,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 2,
            },
          },
        ],
      },
    ],
  },
];
