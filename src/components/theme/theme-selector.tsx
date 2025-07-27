'use client';

import { Button } from '@/components/ui/button';
import * as React from 'react';
import { ContrastIcon, EclipseIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/store/theme';
import { Spinner } from '@/components/ui/spinner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const ThemeSelector = ({ className }: { className?: string }) => {
  const { initialized, selectedTheme, setTheme } = useTheme();

  return (
    <div className={cn('flex items-center gap-0.5 p-0.5 rounded-full bg-accent dark:bg-muted/30 relative', !initialized && 'cursor-wait', className)}>
      {!initialized && (
        <div className="absolute z-10 rounded-full size-full inset-0 p-0.5 flex items-center">
          <div className="size-9 flex items-center justify-center">
            <Spinner className="size-4" />
          </div>
        </div>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button disabled={!initialized} variant={selectedTheme === 'light' ? 'secondary' : 'ghost'} size="icon" className="rounded-full cursor-pointer" onClick={() => setTheme('light')}>
            <SunIcon />
            <span className="sr-only">Light theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Light</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button disabled={!initialized} variant={selectedTheme === 'dark' ? 'secondary' : 'ghost'} size="icon" className="rounded-full cursor-pointer" onClick={() => setTheme('dark')}>
            <EclipseIcon />
            <span className="sr-only">Dark theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Dark</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button disabled={!initialized} variant={selectedTheme === 'system' ? 'secondary' : 'ghost'} size="icon" className="rounded-full cursor-pointer" onClick={() => setTheme('system')}>
            <ContrastIcon />
            <span className="sr-only">System theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>System</TooltipContent>
      </Tooltip>
    </div>
  );
};
