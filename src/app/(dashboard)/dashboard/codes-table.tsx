'use client';
import * as React from 'react';
import NumberFlow from '@number-flow/react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { CodeTimer } from '@/components/dashboard/code-timer';
import { cn } from '@/lib/utils';

interface Code {
  code: string;
  expires_at: string;
  id: string;
  name: string;
}

interface CodesTableProps {
  data: Code[];
  copiedId: string | null;
  onCopy: (code: string, id: string) => void;
}

export const CodesTable = ({ data, copiedId, onCopy }: CodesTableProps) => {
  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) <= new Date();
  };

  return (
    <div className="border overflow-hidden">
      <Table>
        <TableBody>
          {data.map(code => (
            <TableRow
              key={code.id}
              onClick={() => onCopy(code.code, code.id)}
              className={cn(
                'cursor-pointer group',
                copiedId === code.id
                  ? '!bg-brand-ocean-primary !text-brand-flamingo-primary-foreground ring ring-offset-0 ring-brand-ocean-primary ring-offset-brand-ocean-primary'
                  : ' hover:bg-brand-magenta-primary hover:text-brand-flamingo-primary-foreground'
              )}
              data-copied={copiedId === code.id}
            >
              <TableCell>
                <div className="cursor-pointer inline-block" onClick={() => onCopy(code.code, code.id)}>
                  <NumberFlow
                    value={parseInt(code.code)}
                    format={{ useGrouping: false, maximumFractionDigits: 2 }}
                    className={cn('font-mono font-medium', isExpired(code.expires_at) && 'text-destructive-primary')}
                  />
                </div>
              </TableCell>
              <TableCell>{code.name}</TableCell>
              <TableCell>
                <CodeTimer expiresAt={code.expires_at} isExpired={isExpired(code.expires_at)} />
              </TableCell>
              <TableCell className="justify-end flex items-center text-right">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => onCopy(code.code, code.id)}
                  disabled={isExpired(code.expires_at)}
                  className={cn('text-muted-foreground group-hover:text-brand-flamingo-primary-foreground/80', copiedId === code.id && 'text-brand-flamingo-primary-foreground/80')}
                >
                  {copiedId === code.id ? <CheckIcon className="size-4 text-brand-flamingo-primary-foreground" /> : <CopyIcon className="size-4" />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
