import Link from 'next/link';
import { MonoLogo } from '../ui/logo';
import { cn } from '@/lib/utils';
import { ThemeSelector } from '../theme/theme-selector';

export const Header = ({ className }: { className?: string }) => {
  return (
    <header className={cn('flex items-center justify-between md:px-4 px-2 py-6 pointer-events-none fixed inset-x-0 top-0 z-50', className)}>
      <Link href="/" className="pointer-events-auto">
        <MonoLogo className="h-6 w-16" />
      </Link>
      <ThemeSelector className="pointer-events-auto bg-popover/20" />
    </header>
  );
};
