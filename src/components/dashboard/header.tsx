import Link from 'next/link';
import { Logo } from '../ui/logo';
import { cn } from '@/lib/utils';
import { ThemeSelector } from '../theme/theme-selector';
import { Button } from '../ui/button';
import { LogOutIcon } from 'lucide-react';

export const Header = ({ className }: { className?: string }) => {
  return (
    <header className={cn('flex items-center justify-between md:px-4 px-2 py-6 pointer-events-none fixed inset-x-0 top-0 z-50', className)}>
      <Link href="/" className="pointer-events-auto">
        <Logo className="h-6 w-16" />
      </Link>
      <div className="flex items-center gap-4">
        <ThemeSelector className="pointer-events-auto bg-popover/20" />
        <Button variant="ghost" className="cursor-pointer pointer-events-auto rounded-full" asChild>
          <Link href="/signout">
            <span className="sr-only">Signout</span>
            <LogOutIcon />
          </Link>
        </Button>
      </div>
    </header>
  );
};
