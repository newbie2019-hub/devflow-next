import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { Toaster } from '@/components/ui/toaster';
import ThemeProvider from '@/context/Theme';

const inter = localFont({
  src: './fonts/Inter.ttf',
  variable: '--font-inter',
  weight: '100 200 300 400 500 600 700',
});

const spaceGrotesk = localFont({
  src: './fonts/SpaceGrotesk.ttf',
  variable: '--font-space-grotesk',
  weight: '100 200 300 400 500 600 700',
});

export const metadata: Metadata = {
  title: 'Dev Overflow',
  description: `A community-driven platform for asking and answering programming questions.
    Get help, share knowledge, and collaborate with developers from around the world.
    Explore topics in web development, mobile app development, algorithms,
    data structures, and more.`,
  icons: {
    icon: '/images/site-logo.svg',
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
        <script
          src="https://accounts.google.com/gsi/client"
          async
        ></script>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
