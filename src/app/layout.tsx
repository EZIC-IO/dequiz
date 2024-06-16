import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@/providers/theme-provider';
import { TanstackProvider } from '@/providers/tanstck-query-provider';
import { TOASTER_CONFIG } from '@/config/toaster';
import { cn } from '@/lib/utils';

import 'react-toastify/dist/ReactToastify.css';
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
            'bg-background min-h-screen bg-zinc-950 font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <TanstackProvider>
              <ToastContainer {...TOASTER_CONFIG} />

              {children}
            </TanstackProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
