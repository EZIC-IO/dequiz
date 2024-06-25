'use client';

import React from 'react';
import { WagmiProvider as WProvider } from 'wagmi';

import { wagmiConfig } from '../config/wagmi';

export function WagmiProvider({ children }: React.PropsWithChildren) {
  return <WProvider config={wagmiConfig}>{children}</WProvider>;
}
