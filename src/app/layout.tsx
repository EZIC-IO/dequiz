import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ThirdwebProvider } from 'thirdweb/react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@/providers/theme-provider';
import { TanstackProvider } from '@/providers/tanstck-query-provider';
import { WagmiProvider } from '@/providers/wagmi-provider';
import AppLayout from '@/components/layout/app-layout';
import { TOASTER_CONFIG } from '@/config/toaster';
import { cn } from '@/lib/utils';
import { mainMeta } from '@/constants/meta';

import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css';
import 'swiper/css';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = mainMeta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen font-sans', fontSans.variable)}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ThirdwebProvider>
              <WagmiProvider>
                <TanstackProvider>
                  <ToastContainer {...TOASTER_CONFIG} />

                  <AppLayout>{children}</AppLayout>
                </TanstackProvider>
              </WagmiProvider>
            </ThirdwebProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
