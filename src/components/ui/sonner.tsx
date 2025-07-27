'use client';

import { CircleAlertIcon, CircleCheckIcon, TriangleAlertIcon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { Spinner } from './spinner';
import { cn } from '@/lib/utils';
import { useTheme } from '@/store/theme';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="bottom-center"
      icons={{
        success: <CircleCheckIcon className="size-5 text-success-primary" />,
        loading: <Spinner className="size-5" />,
        error: <TriangleAlertIcon className="size-5 text-destructive-primary" />,
        info: <CircleAlertIcon className="size-5 text-brand-sapphire-primary" />,
      }}
      toastOptions={{
        className: cn('!text-sm backdrop-blur-2xl'),
        actionButtonStyle: { color: 'var(--muted-foreground)', background: 'var(--muted)' },
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': '12px',
          '--font-size': '14px',
          fontSize: '14px',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
