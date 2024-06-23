import { RPGVocation } from '@/api/models/gen-image';
import {
  Sun,
  Leaf,
  Sword,
  Tent,
  BicepsFlexed,
  BookOpen,
  Sparkles,
  Map,
  Pyramid,
  Zap,
  Moon,
} from 'lucide-react';

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

export const CHARACTER_PROPERTIES: Record<RPGVocation, CharacterProperties> = {
  [RPGVocation.KNIGHT]: {
    title: 'Behold, the Knight Emerges!',
    description:
      'As a Knight, you embody the spirit of chivalry and honor, sworn to protect the realm and its people. Your strength and discipline are unparalleled, making you a stalwart defender in the face of danger. With your unwavering courage and mastery of combat, you stand as a beacon of justice, ready to confront any threat that dares to challenge the peace of the kingdom.',
    skills: [
      {
        label: 'Adventurousness',
        icon: <Tent />,
      },
      {
        label: 'Strength',
        icon: <BicepsFlexed />,
      },
      {
        label: 'Leadership',
        icon: <Sword />,
      },
    ],
  },
  [RPGVocation.WIZARD]: {
    title: 'Behold, the Wizard Emerges!',
    description:
      'As a Wizard, you are a master of the arcane arts, wielding powerful magic to shape the world around you. Your vast knowledge and wisdom set you apart, allowing you to unlock the secrets of the universe. With your spellbook in hand, you can summon elemental forces, conjure illusions, and bend reality to your will. Your intellect and mystical prowess make you a formidable force against any adversary.',
    skills: [
      {
        label: 'Knowledge',
        icon: <BookOpen />,
      },
      {
        label: 'Wisdom',
        icon: <Pyramid />,
      },
      {
        label: 'Strategy',
        icon: <Map />,
      },
    ],
  },
  [RPGVocation.ROGUE]: {
    title: 'Behold, the Rogue Emerges!',
    description:
      'As a Rogue, you are the shadow that moves unseen, a master of stealth and deception. Your agility and cunning allow you to navigate the darkest corners and uncover hidden truths. Whether you are gathering intelligence or striking from the shadows, your quick reflexes and sharp mind give you the upper hand. You thrive in the underworld, using your skills to outsmart and outmaneuver any opponent that stands in your way.',
    skills: [
      {
        label: 'Innovativeness',
        icon: <Sparkles />,
      },
      {
        label: 'Agility',
        icon: <Moon />,
      },
      {
        label: 'Swiftness',
        icon: <Zap />,
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
        icon: <Moon />,
      },
      {
        label: 'Resourcefulness',
        icon: <Leaf />,
      },
    ],
  },
};
