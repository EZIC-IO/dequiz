import { useEffect, useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';

import { StorageData } from '@/constants/storage';

export const useStorageData = () => {
  const [storageData, setStorageData] = useState<StorageData>(null);
  const account = useActiveAccount();
  const address = account?.address;

  useEffect(() => {
    try {
      const storageData = localStorage.getItem(address ?? '');
      const data: StorageData = storageData ? JSON.parse(storageData) : null;

      setStorageData(data);
    } catch {
      setStorageData(null);
    }
  }, [address]);

  const updateStorageData = (data: StorageData) => {
    try {
      if (!address) return;

      const storageData = localStorage.getItem(address);
      const parsedData: StorageData = storageData
        ? JSON.parse(storageData)
        : null;

      const updatedStorageData = {
        ...parsedData,
        ...data,
      };

      localStorage.setItem(address, JSON.stringify(updatedStorageData));
    } catch {}
  };

  return { storageData, updateStorageData };
};
