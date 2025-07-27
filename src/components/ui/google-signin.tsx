'use client';

import { Button } from './button';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './spinner';
import { useAuthStore } from '@/store/auth';

export {};

declare global {
  interface Window {
    onLoginSuccess?: () => void;
  }
}

type GoogleSigninProps = React.ComponentPropsWithoutRef<'button'> & {
  onClick?: () => void;
  className?: string;
};

export const GoogleSignin = forwardRef<HTMLButtonElement, GoogleSigninProps>(({ className, onClick, ...props }, ref) => {
  const { isGoogleSignInLoading, setGoogleSignInLoading } = useAuthStore();

  const popupCenter = (url: string, title: string) => {
    if (onClick) return onClick();
    setGoogleSignInLoading(true);
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 400) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 650) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(url, title, `width=${400 / systemZoom},height=${650 / systemZoom},top=${top},left=${left}`);

    window.onLoginSuccess = () => {
      window.location.href = '/';
      setGoogleSignInLoading(false);
      newWindow?.close();
    };

    window.addEventListener('unload', () => newWindow?.close());

    if (newWindow) {
      newWindow.focus();

      const checkWindowClosed = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkWindowClosed);
          setGoogleSignInLoading(false);
        }
      }, 500);
    }
  };
  return (
    <div className="relative overflow-hidden p-1">
      <div
        className={cn('absolute inset-0 z-10 flex -translate-y-full items-center justify-center transition-transform text-primary-foreground cursor-wait', isGoogleSignInLoading && 'translate-y-0')}
      >
        <Spinner className="size-6" />
      </div>
      <Button
        ref={ref}
        size="lg"
        onClick={() => popupCenter('/google-signin', 'Google Sign In')}
        className={cn(
          'relative flex items-center gap-2 transition-transform w-full md:mx-auto md:px-16',
          isGoogleSignInLoading && 'translate-y-[calc(100%+4px)]',
          className
        )}
        disabled={isGoogleSignInLoading}
        {...props}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="size-5">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.12112 7.14231V9.20025H11.5931C11.4521 10.0836 10.5431 11.7877 8.12112 11.7877C6.03125 11.7877 4.3262 10.0912 4.3262 8.00022C4.3262 5.90951 6.03125 4.21296 8.12112 4.21296C9.30964 4.21296 10.1061 4.71012 10.5607 5.13841L12.2229 3.57031C11.1564 2.59105 9.77419 2 8.12202 2C4.73812 2 2 4.68355 2 8C2 11.3164 4.73812 14 8.12202 14C11.6544 14 14 11.5649 14 8.13798C14 7.74424 13.9571 7.44438 13.9042 7.14432L8.12202 7.14188L8.12112 7.14233V7.14231Z"
            fill="currentColor"
          ></path>
        </svg>
        Sign In with Google
      </Button>
    </div>
  );
});

GoogleSignin.displayName = 'GoogleSignin';
