'use client';
import { useEffect, useState } from 'react';
import NumberFlow from '@number-flow/react';

interface CodeTimerProps {
  expiresAt: string;
  isExpired: boolean;
}

export const CodeTimer = ({ expiresAt, isExpired }: CodeTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<{ minutes: number; seconds: number }>({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const expiry = new Date(expiresAt);
      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining({ minutes: 0, seconds: 0 });
        return;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ minutes, seconds });
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (isExpired) {
    return (
      <div className="flex items-center gap-2 text-sm text-destructive-primary group-hover:text-brand-flamingo-primary-foreground/80 group-data-[copied=true]:text-brand-flamingo-primary-foreground/80">
        <span>Expired</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-brand-flamingo-primary-foreground/80 group-data-[copied=true]:text-brand-flamingo-primary-foreground/80">
      <div className="flex items-center gap-1">
        <NumberFlow value={timeRemaining.minutes} format={{ useGrouping: false, minimumIntegerDigits: 1 }} className="font-mono" />
        <span>:</span>
        <NumberFlow value={timeRemaining.seconds} format={{ useGrouping: false, minimumIntegerDigits: 2 }} className="font-mono" />
      </div>
    </div>
  );
};
