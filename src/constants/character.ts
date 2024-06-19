import { Character } from '@/api/models/character';

export const CHARACTERS_LABEL: Record<Character, string> = {
  [Character.KNIGHT]: 'Knight',
  [Character.WIZARD]: 'Wizard',
  [Character.ROGUE]: 'Rogue',
  [Character.RANGER]: 'Ranger',
};

interface CharacterProperties {
  title: string;
  description: string;
  skills: string[];
}

export const CHARACTER_PROPERTIES: Record<Character, CharacterProperties> = {
  [Character.KNIGHT]: {
    title: 'Behold, the Ranger Emerges!',
    description:
      'As a Ranger, you are a guardian of the wild, always seeking harmony between nature and civilization. Your keen senses and unmatched agility make you a formidable protector of the forest. You thrive on adventure, using your resourcefulness and bravery to overcome any challenge.',
    skills: ['Adventourus', 'Wisdom', 'Strategy'],
  },
  [Character.WIZARD]: {
    title: 'Behold, the Ranger Emerges!',
    description:
      'As a Ranger, you are a guardian of the wild, always seeking harmony between nature and civilization. Your keen senses and unmatched agility make you a formidable protector of the forest. You thrive on adventure, using your resourcefulness and bravery to overcome any challenge.',
    skills: ['Kmowledge', 'Wizdom', 'Strategy'],
  },
  [Character.ROGUE]: {
    title: 'Behold, the Ranger Emerges!',
    description:
      'As a Ranger, you are a guardian of the wild, always seeking harmony between nature and civilization. Your keen senses and unmatched agility make you a formidable protector of the forest. You thrive on adventure, using your resourcefulness and bravery to overcome any challenge.',
    skills: ['Innovativeness', 'Agility', 'Swiftness'],
  },
  [Character.RANGER]: {
    title: 'Behold, the Ranger Emerges!',
    description:
      'As a Ranger, you are a guardian of the wild, always seeking harmony between nature and civilization. Your keen senses and unmatched agility make you a formidable protector of the forest. You thrive on adventure, using your resourcefulness and bravery to overcome any challenge.',
    skills: ['Harmony', 'Agility', 'Resourcefulness'],
  },
};
