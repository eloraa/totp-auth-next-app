'use client';
import { useCode } from '@/lib/client/data/code';
import * as React from 'react';
import NumberFlow from '@number-flow/react';
import { SquareAsteriskIcon, CheckIcon, CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CodesToolbar } from '@/components/dashboard/codes-toolbar';
import { CodesTable } from '@/app/(dashboard)/dashboard/codes-table';
import { CodeTimer } from '@/components/dashboard/code-timer';
import { useWebSocket } from '@/lib/client/data/websocket';
import { useWebSocketStore } from '@/store/websocket';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { WSStatus } from '@/components/dashboard/ws-status';

export const Codes = () => {
  const { data, refetch, isLoading } = useCode();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<'card' | 'table'>('card');
  const { isConnected } = useWebSocketStore();

  useWebSocket();

  React.useEffect(() => {
    if (isConnected || !data || data.length === 0) return;

    const checkAndRefetch = () => {
      const now = new Date();
      const hasExpiredCode = data.some(code => new Date(code.expires_at) <= now);

      if (hasExpiredCode) {
        refetch();
      }
    };

    checkAndRefetch();

    const now = new Date();
    const nextExpiry = Math.min(...data.map(code => new Date(code.expires_at).getTime()));
    const timeUntilNextExpiry = Math.max(0, nextExpiry - now.getTime());

    const timeout = setTimeout(() => {
      checkAndRefetch();
    }, timeUntilNextExpiry);

    return () => clearTimeout(timeout);
  }, [data, refetch, isConnected]);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (_) {
      toast.error('Failed to copy code');
    }
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) <= new Date();
  };

  if (!data && isLoading) {
    return (
      <div className="flex items-center justify-center h-full flex-col">
        <div className="flex items-center justify-center">
          <Spinner className="size-8 text-brand-magenta-primary" />
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full flex-col">
        <div className="flex items-center justify-center">
          <SquareAsteriskIcon className="size-6 text-[#dd4425]" />
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">No codes available</p>
        </div>
        <div className="flex items-center justify-center mt-4">
          <WSStatus />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CodesToolbar viewMode={viewMode} onViewModeChange={setViewMode} />

      {viewMode === 'table' ? (
        <CodesTable data={data} copiedId={copiedId} onCopy={copyToClipboard} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map(code => (
            <div
              key={code.id}
              className={cn(
                'p-3 border cursor-pointer transition-colors group',
                copiedId === code.id ? 'bg-brand-ocean-primary text-brand-flamingo-primary-foreground' : ' hover:bg-brand-magenta-primary hover:text-brand-flamingo-primary-foreground'
              )}
              onClick={() => !isExpired(code.expires_at) && copyToClipboard(code.code, code.id)}
              data-copied={copiedId === code.id}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="truncate text-sm min-w-0">{code.name}</h3>
                <CodeTimer expiresAt={code.expires_at} isExpired={isExpired(code.expires_at)} />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 cursor-pointer">
                    <NumberFlow
                      value={parseInt(code.code)}
                      format={{ useGrouping: false, maximumFractionDigits: 2 }}
                      className={cn('text-3xl font-mono font-medium tracking-wider', isExpired(code.expires_at) && 'text-destructive-primary')}
                    />
                  </div>
                  <Button variant="link" size="sm" onClick={() => copyToClipboard(code.code, code.id)} disabled={isExpired(code.expires_at)} className="ml-2 cursor-pointer">
                    {copiedId === code.id ? <CheckIcon className="size-4 text-brand-flamingo-primary-foreground" /> : <CopyIcon className="size-4" />}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
