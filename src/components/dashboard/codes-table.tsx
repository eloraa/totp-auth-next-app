'use client';
import * as React from 'react';
import NumberFlow from '@number-flow/react';
import { Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CodeTimer } from '@/components/dashboard/code-timer';

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
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Time Remaining</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((code) => (
            <TableRow
              key={code.id}
              className={isExpired(code.expires_at) ? 'opacity-50 bg-muted/30' : ''}
            >
              <TableCell className="font-medium">{code.name}</TableCell>
              <TableCell>
                <div 
                  className="cursor-pointer inline-block"
                  onClick={() => !isExpired(code.expires_at) && onCopy(code.code, code.id)}
                >
                  <NumberFlow
                    value={parseInt(code.code)}
                    format={{ useGrouping: false, maximumFractionDigits: 2 }}
                    className={`font-mono font-bold tracking-wider ${
                      isExpired(code.expires_at) 
                        ? 'text-muted-foreground/50' 
                        : 'text-foreground hover:text-primary transition-colors'
                    }`}
                  />
                </div>
              </TableCell>
              <TableCell>
                <CodeTimer expiresAt={code.expires_at} isExpired={isExpired(code.expires_at)} />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopy(code.code, code.id)}
                  disabled={isExpired(code.expires_at)}
                  className="h-8 w-8 p-0"
                >
                  {copiedId === code.id ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
