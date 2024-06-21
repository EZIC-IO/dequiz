import {
  BookHeart,
  Crown,
  Glasses,
  Lightbulb,
  MountainSnow,
  Palette,
  Rocket,
  Search,
  Shell,
  Sun,
  TentTree,
  TreePine,
  WandSparkles,
  Zap,
} from 'lucide-react';

import { QuizType } from '../models/quiz';
import { Character } from '../models/character';

export const quizes: QuizType[] = [
  {
    id: '1',
    epochId: '1',
    title: "What's your fantasy world occupation?",
    gradientImage: '/gradient/home-gradient.png',
    description:
      'In a realm where magic weaves through every corner and creatures lurk in the shadows, everyone dreams of their perfect role. Ever felt destined for something more than the ordinary? Maybe your true calling is to be a powerful mage, a brave ranger, or a cunning rogue. Or perhaps you have a more unique destiny? Take the test and discover your true fantasy vocation. Once revealed, mint your character and embark on your epic adventure!',
    previewImage: '/quiz/quiz-preview.png',
    isLive: true,
    questions: [
      {
        id: '1',
        previewImage: '/quiz/occupation.png',
        gradientImage: '/gradient/gradient-1.png',
        question: 'How would you describe your personality?',
        options: [
          {
            id: '1',
            label: 'Adventurous/Brave',
            score: {
              [Character.WIZARD]: 1,
              [Character.KNIGHT]: 3,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 2,
            },
            icon: <Palette />,
          },
          {
            id: '2',
            label: 'Creative/Artful',
            score: {
              [Character.WIZARD]: 2,
              [Character.KNIGHT]: 1,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 2,
            },
            icon: <MountainSnow />,
          },
          {
            id: '3',
            label: 'Wise/Analytical',
            score: {
              [Character.WIZARD]: 3,
              [Character.KNIGHT]: 1,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 1,
            },
            icon: <Lightbulb />,
          },
        ],
      },
      {
        id: '2',
        previewImage: '/quiz/environment.png',
        gradientImage: '/gradient/gradient-2.png',
        question: 'Which type of environment resonates most with your soul?',
        options: [
          {
            id: '4',
            label: 'Forest',
            score: {
              [Character.WIZARD]: 1,
              [Character.KNIGHT]: 2,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 3,
            },
            icon: <TreePine />,
          },
          {
            id: '5',
            label: 'Mountains',
            score: {
              [Character.WIZARD]: 1,
              [Character.KNIGHT]: 3,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 2,
            },
            icon: <MountainSnow />,
          },
          {
            id: '6',
            label: 'Desert',
            score: {
              [Character.WIZARD]: 2,
              [Character.KNIGHT]: 1,
              [Character.ROGUE]: 3,
              [Character.RANGER]: 1,
            },
            icon: <Shell />,
          },
        ],
      },
      {
        id: '3',
        previewImage: '/quiz/role.png',
        gradientImage: '/gradient/gradient-3.png',
        question: 'What role do you often take in a group?',
        options: [
          {
            id: '7',
            label: 'Leader',
            score: {
              [Character.WIZARD]: 1,
              [Character.KNIGHT]: 3,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 2,
            },
            icon: <Crown />,
          },
          {
            id: '8',
            label: 'Strategist',
            score: {
              [Character.WIZARD]: 3,
              [Character.KNIGHT]: 2,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 2,
            },
            icon: <Glasses />,
          },
          {
            id: '9',
            label: 'Innovator',
            score: {
              [Character.WIZARD]: 2,
              [Character.KNIGHT]: 1,
              [Character.ROGUE]: 3,
              [Character.RANGER]: 1,
            },
            icon: <Rocket />,
          },
        ],
      },
      {
        id: '4',
        previewImage: '/quiz/spend-time.png',
        gradientImage: '/gradient/gradient-4.png',
        question: 'How do you prefer to spend your leisure time?',
        options: [
          {
            id: '10',
            label: 'Traveling',
            score: {
              [Character.WIZARD]: 1,
              [Character.KNIGHT]: 2,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 3,
            },
            icon: <TentTree />,
          },
          {
            id: '11',
            label: 'Relaxing with a book',
            score: {
              [Character.WIZARD]: 3,
              [Character.KNIGHT]: 1,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 1,
            },
            icon: <BookHeart />,
          },
          {
            id: '12',
            label: 'Working on a creative project/side-project',
            score: {
              [Character.WIZARD]: 1,
              [Character.KNIGHT]: 2,
              [Character.ROGUE]: 3,
              [Character.RANGER]: 1,
            },
            icon: <WandSparkles />,
          },
        ],
      },
      {
        id: '5',
        previewImage: '/quiz/goal.png',
        gradientImage: '/gradient/gradient-5.png',
        question: 'What is your ultimate goal in life?',
        options: [
          {
            id: '11',
            label: 'Adventure',
            score: {
              [Character.WIZARD]: 1,
              [Character.KNIGHT]: 3,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 3,
            },
            icon: <Zap />,
          },
          {
            id: '12',
            label: 'Knowledge',
            score: {
              [Character.WIZARD]: 3,
              [Character.KNIGHT]: 1,
              [Character.ROGUE]: 1,
              [Character.RANGER]: 1,
            },
            icon: <Search />,
          },
          {
            id: '13',
            label: 'Harmony',
            score: {
              [Character.WIZARD]: 2,
              [Character.KNIGHT]: 2,
              [Character.ROGUE]: 2,
              [Character.RANGER]: 2,
            },
            icon: <Sun />,
          },
        ],
      },
    ],
  },
];
