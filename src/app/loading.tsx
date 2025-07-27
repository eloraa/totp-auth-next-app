import { Spinner } from '@/components/ui/spinner';
import { getTheme } from '@/lib/server/theme';
import { type Viewport } from 'next';
import { cookies } from 'next/headers';

export async function generateViewport(): Promise<Viewport> {
  const cookieStore = await cookies();
  const { theme } = getTheme({ cookies: cookieStore });
  return {
    themeColor: theme === 'dark' ? '#1c1c1c' : '#fefafb',
    colorScheme: theme,
  };
}
export default function Loading() {
  return (
    <main className="h-full flex items-center justify-center container fixed inset-0">
      <div className="flex items-center justify-center flex-col gap-4 w-full">
        <Spinner className="size-8" />
      </div>
    </main>
  );
}
