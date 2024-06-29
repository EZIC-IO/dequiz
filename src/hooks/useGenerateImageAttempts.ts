import { useEffect, useState } from 'react';

import { GENERATE_IMAGE_TOTAL_ATTEMPTS } from '@/constants/generage-image';
import { useStorageData } from './useStorageData';

export const useGenerateImageAttempts = () => {
  const [attemptsCount, setAttemptsCount] = useState(
    GENERATE_IMAGE_TOTAL_ATTEMPTS
  );
  const attemptsLeft = attemptsCount > 0 ? attemptsCount : 0;
  const hasAttempts = attemptsLeft > 0;
  const { storageData, updateStorageData } = useStorageData();

  useEffect(() => {
    if (!storageData) {
      setAttemptsCount(GENERATE_IMAGE_TOTAL_ATTEMPTS);
      return;
    }

    const attemptsLeft = storageData.attemptsLeft;

    setAttemptsCount(
      Number.isNaN(+attemptsLeft)
        ? GENERATE_IMAGE_TOTAL_ATTEMPTS
        : +attemptsLeft
    );
  }, [storageData]);

  const decreaseLeftAttempts = () => {
    setAttemptsCount((prev) => {
      const attemptsLeft = prev - 1;

      updateStorageData({ attemptsLeft });

      return attemptsLeft;
    });
  };

  return {
    hasAttempts,
    attemptsLeft,
    decreaseLeftAttempts,
  };
};
