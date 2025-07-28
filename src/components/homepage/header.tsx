import Link from 'next/link';
import { Logo } from '../ui/logo';
import { cn } from '@/lib/utils';
import { ThemeSelector } from '../theme/theme-selector';
import { Button } from '../ui/button';
import { auth } from '@/lib/server/auth';
import { headers } from 'next/headers';

export const Header = async ({ className }: { className?: string }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className={cn('flex items-center justify-between md:px-4 px-2 py-6 pointer-events-none fixed inset-x-0 top-0 z-50', className)}>
      <Link href="/" className="pointer-events-auto">
        <Logo className="h-6 w-16" />
      </Link>
      <div className="flex items-center gap-2 pointer-events-auto">
        <ThemeSelector className="bg-foreground/15 h-10" />
        <Button variant="secondary" className="bg-foreground/15 h-10 rounded-full" asChild>
          <Link href={session ? '/dashboard' : '/signin'}>{session ? 'Dashboard' : 'Sign In'}</Link>
        </Button>
      </div>
    </header>
  );
};
