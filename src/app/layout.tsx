import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cookies, headers } from 'next/headers';
import { getTheme } from '@/lib/server/theme';
import { OneTapPrompt } from '@/components/auth/onetap-prompt';
import { auth } from '@/lib/server/auth';
import { ThemeInitializer } from '@/components/theme/theme-initializer';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Authenticator',
  description: 'TOTP Authenticator',
};

export async function generateViewport(): Promise<Viewport> {
  const cookieStore = await cookies();
  const { theme } = getTheme({ cookies: cookieStore });
  const color = theme === 'dark' ? '#000' : '#fff';
  return {
    themeColor: color,
    colorScheme: theme,
    interactiveWidget: 'resizes-content',
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });

  const cookieStore = await cookies();
  const { theme } = getTheme({ cookies: cookieStore });
  console.log(theme);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${theme} antialiased`}
      style={{
        colorScheme: theme === 'dark' ? 'dark' : 'light',
      }}
    >
      <body>
        <div style={{ display: 'contents', height: '100%' }}>
          {children}
          {!session && <OneTapPrompt />}
          <ThemeInitializer selectedTheme={theme} />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
