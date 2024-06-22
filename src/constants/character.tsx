import { RPGVocation } from '@/api/models/gen-image';
import { Sun, Heart, Leaf } from 'lucide-react';

export const CHARACTERS_LABEL: Record<RPGVocation, string> = {
  [RPGVocation.KNIGHT]: 'Knight',
  [RPGVocation.WIZARD]: 'Wizard',
  [RPGVocation.ROGUE]: 'Rogue',
  [RPGVocation.RANGER]: 'Ranger',
};

interface Skill {
  label: string;
  icon: React.ReactNode;
}

interface CharacterProperties {
  title: string;
  description: string;
  skills: Skill[];
}

// TODO: update the descriptions & skill icons
export const CHARACTER_PROPERTIES: Record<RPGVocation, CharacterProperties> = {
  [RPGVocation.KNIGHT]: {
    title: 'Behold, the Knight Emerges!',
    description:
      'As a Knight, you are a guardian of the wild, always seeking harmony between nature and civilization. Your keen senses and unmatched agility make you a formidable protector of the forest. You thrive on adventure, using your resourcefulness and bravery to overcome any challenge.',
    skills: [
      {
        label: 'Adventourus',
        icon: <Sun />,
      },
      {
        label: 'Wisdom',
        icon: <Heart />,
      },
      {
        label: 'Strategy',
        icon: <Leaf />,
      },
    ],
  },
  [RPGVocation.WIZARD]: {
    title: 'Behold, the Wizard Emerges!',
    description:
      'As a Wizard, you are a guardian of the wild, always seeking harmony between nature and civilization. Your keen senses and unmatched agility make you a formidable protector of the forest. You thrive on adventure, using your resourcefulness and bravery to overcome any challenge.',
    skills: [
      {
        label: 'Knowledge',
        icon: <Sun />,
      },
      {
        label: 'Wizdom',
        icon: <Heart />,
      },
      {
        label: 'Strategy',
        icon: <Leaf />,
      },
    ],
  },
  [RPGVocation.ROGUE]: {
    title: 'Behold, the Rogue Emerges!',
    description:
      'As a Rogue, you are a guardian of the wild, always seeking harmony between nature and civilization. Your keen senses and unmatched agility make you a formidable protector of the forest. You thrive on adventure, using your resourcefulness and bravery to overcome any challenge.',
    skills: [
      {
        label: 'Innovativeness',
        icon: <Sun />,
      },
      {
        label: 'Agility',
        icon: <Heart />,
      },
      {
        label: 'Swiftness',
        icon: <Leaf />,
      },
    ],
  },
  [RPGVocation.RANGER]: {
    title: 'Behold, the Ranger Emerges!',
    description:
      'As a Ranger, you are a guardian of the wild, always seeking harmony between nature and civilization. Your keen senses and unmatched agility make you a formidable protector of the forest. You thrive on adventure, using your resourcefulness and bravery to overcome any challenge.',
    skills: [
      {
        label: 'Harmony',
        icon: <Sun />,
      },
      {
        label: 'Agility',
        icon: <Heart />,
      },
      {
        label: 'Resourcefulness',
        icon: <Leaf />,
      },
    ],
  },
};
