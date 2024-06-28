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
import { RPGVocation } from '../models/gen-image.dto';

export const quizes: QuizType[] = [
  {
    id: '1',
    epochId: '1',
    title: "What's your fantasy world RPG Vocation?",
    gradientImage: '/gradient/home-gradient.webp',
    description:
      'In a realm where magic weaves through every corner and creatures lurk in the shadows, everyone dreams of their perfect role. Ever felt destined for something more than the ordinary? Maybe your true calling is to be a powerful mage, a brave ranger, or a cunning rogue. Or perhaps you have a more unique destiny? Take the test and discover your true fantasy vocation. Once revealed, mint your character and embark on your epic adventure!',
    previewImage: '/quiz/quiz-preview.webp',
    isLive: true,
    questions: [
      {
        id: '1',
        previewImage: '/quiz/occupation.webp',
        gradientImage: '/gradient/gradient-1.webp',
        question: 'How would you describe your personality?',
        options: [
          {
            id: '1',
            label: 'Adventurous/Brave',
            score: {
              [RPGVocation.WIZARD]: 1,
              [RPGVocation.KNIGHT]: 3,
              [RPGVocation.ROGUE]: 2,
              [RPGVocation.RANGER]: 2,
            },
            icon: <Palette />,
          },
          {
            id: '2',
            label: 'Creative/Artful',
            score: {
              [RPGVocation.WIZARD]: 2,
              [RPGVocation.KNIGHT]: 1,
              [RPGVocation.ROGUE]: 2,
              [RPGVocation.RANGER]: 2,
            },
            icon: <MountainSnow />,
          },
          {
            id: '3',
            label: 'Wise/Analytical',
            score: {
              [RPGVocation.WIZARD]: 3,
              [RPGVocation.KNIGHT]: 1,
              [RPGVocation.ROGUE]: 1,
              [RPGVocation.RANGER]: 1,
            },
            icon: <Lightbulb />,
          },
        ],
      },
      {
        id: '2',
        previewImage: '/quiz/environment.webp',
        gradientImage: '/gradient/gradient-2.webp',
        question: 'Which type of environment resonates most with your soul?',
        options: [
          {
            id: '4',
            label: 'Forest',
            score: {
              [RPGVocation.WIZARD]: 1,
              [RPGVocation.KNIGHT]: 2,
              [RPGVocation.ROGUE]: 2,
              [RPGVocation.RANGER]: 3,
            },
            icon: <TreePine />,
          },
          {
            id: '5',
            label: 'Mountains',
            score: {
              [RPGVocation.WIZARD]: 1,
              [RPGVocation.KNIGHT]: 3,
              [RPGVocation.ROGUE]: 1,
              [RPGVocation.RANGER]: 2,
            },
            icon: <MountainSnow />,
          },
          {
            id: '6',
            label: 'Desert',
            score: {
              [RPGVocation.WIZARD]: 2,
              [RPGVocation.KNIGHT]: 1,
              [RPGVocation.ROGUE]: 3,
              [RPGVocation.RANGER]: 1,
            },
            icon: <Shell />,
          },
        ],
      },
      {
        id: '3',
        previewImage: '/quiz/role.webp',
        gradientImage: '/gradient/gradient-3.webp',
        question: 'What role do you often take in a group?',
        options: [
          {
            id: '7',
            label: 'Leader',
            score: {
              [RPGVocation.WIZARD]: 1,
              [RPGVocation.KNIGHT]: 3,
              [RPGVocation.ROGUE]: 1,
              [RPGVocation.RANGER]: 2,
            },
            icon: <Crown />,
          },
          {
            id: '8',
            label: 'Strategist',
            score: {
              [RPGVocation.WIZARD]: 3,
              [RPGVocation.KNIGHT]: 2,
              [RPGVocation.ROGUE]: 1,
              [RPGVocation.RANGER]: 2,
            },
            icon: <Glasses />,
          },
          {
            id: '9',
            label: 'Innovator',
            score: {
              [RPGVocation.WIZARD]: 2,
              [RPGVocation.KNIGHT]: 1,
              [RPGVocation.ROGUE]: 3,
              [RPGVocation.RANGER]: 1,
            },
            icon: <Rocket />,
          },
        ],
      },
      {
        id: '4',
        previewImage: '/quiz/spend-time.webp',
        gradientImage: '/gradient/gradient-4.webp',
        question: 'How do you prefer to spend your leisure time?',
        options: [
          {
            id: '10',
            label: 'Traveling',
            score: {
              [RPGVocation.WIZARD]: 1,
              [RPGVocation.KNIGHT]: 2,
              [RPGVocation.ROGUE]: 2,
              [RPGVocation.RANGER]: 3,
            },
            icon: <TentTree />,
          },
          {
            id: '11',
            label: 'Relaxing with a book',
            score: {
              [RPGVocation.WIZARD]: 3,
              [RPGVocation.KNIGHT]: 1,
              [RPGVocation.ROGUE]: 1,
              [RPGVocation.RANGER]: 1,
            },
            icon: <BookHeart />,
          },
          {
            id: '12',
            label: 'Working on a creative project/side-project',
            score: {
              [RPGVocation.WIZARD]: 1,
              [RPGVocation.KNIGHT]: 2,
              [RPGVocation.ROGUE]: 3,
              [RPGVocation.RANGER]: 1,
            },
            icon: <WandSparkles />,
          },
        ],
      },
      {
        id: '5',
        previewImage: '/quiz/goal.webp',
        gradientImage: '/gradient/gradient-5.webp',
        question: 'What is your ultimate goal in life?',
        options: [
          {
            id: '13',
            label: 'Adventure',
            score: {
              [RPGVocation.WIZARD]: 1,
              [RPGVocation.KNIGHT]: 3,
              [RPGVocation.ROGUE]: 2,
              [RPGVocation.RANGER]: 3,
            },
            icon: <Zap />,
          },
          {
            id: '14',
            label: 'Knowledge',
            score: {
              [RPGVocation.WIZARD]: 3,
              [RPGVocation.KNIGHT]: 1,
              [RPGVocation.ROGUE]: 1,
              [RPGVocation.RANGER]: 1,
            },
            icon: <Search />,
          },
          {
            id: '15',
            label: 'Harmony',
            score: {
              [RPGVocation.WIZARD]: 2,
              [RPGVocation.KNIGHT]: 2,
              [RPGVocation.ROGUE]: 2,
              [RPGVocation.RANGER]: 2,
            },
            icon: <Sun />,
          },
        ],
      },
    ],
  },
];
