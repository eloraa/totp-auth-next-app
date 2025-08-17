'use client';
import { useWebSocketStore } from '@/store/websocket';
import * as React from 'react';
import { Spinner } from '../ui/spinner';
import { ServerCrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const WSStatus = () => {
  const { isConnected, isConnecting } = useWebSocketStore();

  const getConnectionStatus = () => {
    if (isConnecting) {
      return {
        icon: <Spinner className="size-3" />,
        text: 'Connecting...',
        color: 'text-[#3358d4]',
        bgColor: 'bg-[#edf2fe]',
      };
    }

    if (isConnected) {
      return {
        icon: <span className="size-2 rounded-full bg-current" />,
        text: 'Warm',
        color: 'text-[#2b9a66]',
        bgColor: 'bg-[#e6f6eb]',
      };
    }

    return {
      icon: <ServerCrashIcon className="size-3" />,
      text: 'Cold',
      color: 'text-[#dd4425]',
      bgColor: 'bg-[#feebe7]',
    };
  };

  const status = getConnectionStatus();
  return (
    <div className={cn('flex items-center gap-1 px-1 py-0.5 text-xs font-semibold', status.bgColor, status.color)}>
      {status.icon}
      <span>{status.text}</span>
    </div>
  );
};
