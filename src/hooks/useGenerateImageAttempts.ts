import { useEffect, useState } from 'react';

import { GENERATE_IMAGE_TOTAL_ATTEMPTS } from '@/constants/generage-image';
import { STORAGE_GENERATE_ATTEMPTS } from '@/constants/storage-keys';

export const useGenerateImageAttempts = () => {
  const [attemptsCount, setAttemptsCount] = useState(
    GENERATE_IMAGE_TOTAL_ATTEMPTS
  );
  const attemptsLeft = attemptsCount > 0 ? attemptsCount : 0;
  const hasAttempts = attemptsLeft > 0;

  useEffect(() => {
    try {
      const attemptsLeft = localStorage.getItem(STORAGE_GENERATE_ATTEMPTS);

      if (attemptsLeft) {
        setAttemptsCount(+attemptsLeft);
      }
    } catch (e) {
      setAttemptsCount(GENERATE_IMAGE_TOTAL_ATTEMPTS);
    }
  }, []);

  const increaseLeftAttempts = () => {
    setAttemptsCount((prev) => {
      const attemptsLeft = prev + 1;

      localStorage.setItem(STORAGE_GENERATE_ATTEMPTS, attemptsLeft.toString());

      return attemptsLeft;
    });
  };

  return {
    hasAttempts,
    attemptsLeft,
    increaseLeftAttempts,
  };
};
