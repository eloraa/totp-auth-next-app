import { getTheme } from '@/lib/server/theme';
import type { MetadataRoute } from 'next';
import { cookies } from 'next/headers';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const cookieStore = await cookies();
  const { theme } = getTheme({ cookies: cookieStore });
  const color = theme === 'dark' ? '#000000' : '#ffffff';

  return {
    name: 'Authenticator',
    short_name: 'Authenticator',
    description: 'TOTP Authenticator',
    start_url: '/',
    display: 'standalone',
    background_color: color,
    theme_color: color,
    protocol_handlers: [
      {
        protocol: 'web+authenticator',
        url: '/?__url_scheme=%s',
      },
    ],
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
