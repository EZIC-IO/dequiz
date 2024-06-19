import { Character } from '@/api/models/character';

export const CHARACTERS_LABEL: Record<Character, string> = {
  [Character.WARRIOR]: 'Warrior',
  [Character.WIZARD]: 'Knight',
  [Character.ROGUE]: 'Rogue',
  [Character.RANGER]: 'Ranger',
};
