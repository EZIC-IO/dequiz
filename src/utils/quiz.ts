import { QustionType } from '@/api/models/quiz';
import { RPGVocation } from '@/api/models/gen-image';

export const generateCharacter = (
  questions: QustionType[],
  answers: Record<string, string>
): RPGVocation => {
  const scores: Record<string, Record<RPGVocation, number>> = questions.reduce(
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

  const charactersScore = Object.keys(RPGVocation).reduce(
    (acc, character) => {
      acc[character as RPGVocation] = Object.values(scores).reduce(
        (total, score) => total + score[character as RPGVocation],
        0
      );
      return acc;
    },
    {} as Record<RPGVocation, number>
  );

  const maxScore = Math.max(...Object.values(charactersScore));

  return Object.keys(charactersScore).find(
    (character) => charactersScore[character as RPGVocation] === maxScore
  ) as RPGVocation;
};
