import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ThirdwebProvider } from 'thirdweb/react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@/providers/theme-provider';
import { TanstackProvider } from '@/providers/tanstck-query-provider';
import AppLayout from '@/components/layout/app-layout';
import { TOASTER_CONFIG } from '@/config/toaster';
import { cn } from '@/lib/utils';

import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'DeQuiz',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background bg-zinc-950 font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ThirdwebProvider>
              <TanstackProvider>
                <ToastContainer {...TOASTER_CONFIG} />

                <AppLayout>{children}</AppLayout>
              </TanstackProvider>
            </ThirdwebProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
