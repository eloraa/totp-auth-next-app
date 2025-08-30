'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const errorMessages = {
  signup_disabled: {
    title: 'Sign up is currently disabled',
    description: 'New user registrations are not available at this time. If you already have an account, you can sign in instead.',
    icon: AlertTriangle,
  },
  default: {
    title: 'Authentication error',
    description: 'Something went wrong during authentication. Please try again.',
    icon: AlertTriangle,
  },
};

export function ErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasOpener, setHasOpener] = useState(false);
  const errorCode = searchParams.get('code') || 'default';

  const errorInfo = errorMessages[errorCode as keyof typeof errorMessages] || errorMessages.default;
  const IconComponent = errorInfo.icon;

  useEffect(() => {
    setHasOpener(window.opener && window.opener !== window);
  }, []);

  const handleCloseWindow = () => {
    if (window.opener) {
      window.close();
    }
  };

  return (
    <div className={cn('rounded-lg p-4 transition-colors w-full md:max-w-md')}>
      <div className="flex flex-col items-center justify-center space-y-4 p-6">
        <div className="rounded-full bg-destructive/20 p-3">
          <IconComponent className="h-8 w-8 text-white" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold text-white">{errorInfo.title}</h1>
          <p className="text-sm text-white/70 max-w-sm">{errorInfo.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full pt-4 items-center justify-center">
          {hasOpener ? (
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-white/90 hover:bg-white/10 cursor-pointer" onClick={handleCloseWindow}>
              <X className="h-4 w-4" />
              Close Window
            </Button>
          ) : (
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-white/90 hover:bg-white/10 cursor-pointer" onClick={() => router.push('/signin')}>
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
