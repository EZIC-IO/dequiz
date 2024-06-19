import { QustionType } from '@/api/models/quiz';
import { Character } from '@/api/models/character';

export const generateCharacter = (
  questions: QustionType[],
  answers: Record<string, string>
): Character => {
  const scores: Record<string, Record<Character, number>> = questions.reduce(
    (acc, question) => {
      const selectedOption = question.options.find(
        (option) => option.id === answers[question.id]
      );

      if (!selectedOption) return acc;

      return {
        ...acc,
        [question.id]: selectedOption.score,
      };
    },
    {}
  );

  const charactersScore = Object.keys(Character).reduce(
    (acc, character) => {
      acc[character as Character] = Object.values(scores).reduce(
        (total, score) => total + score[character as Character],
        0
      );
      return acc;
    },
    {} as Record<Character, number>
  );

  const maxScore = Math.max(...Object.values(charactersScore));

  return Object.keys(charactersScore).find(
    (character) => charactersScore[character as Character] === maxScore
  ) as Character;
};
