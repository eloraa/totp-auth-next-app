'use client';
import { Button } from '@/components/ui/button';
import { Grid2X2Icon, TablePropertiesIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WSStatus } from './ws-status';

interface CodesToolbarProps {
  viewMode: 'card' | 'table';
  onViewModeChange: (mode: 'card' | 'table') => void;
}

export const CodesToolbar = ({ viewMode, onViewModeChange }: CodesToolbarProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-sm">Codes</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <WSStatus />
          <div className="flex items-center">
            <Button variant="link" size="icon" onClick={() => onViewModeChange('card')} className={cn('cursor-pointer', viewMode !== 'card' && 'text-muted-foreground hover:text-foreground')}>
              <Grid2X2Icon className="size-4" />
              <span className="sr-only">Grid</span>
            </Button>
            <Button variant="link" size="icon" onClick={() => onViewModeChange('table')} className={cn('cursor-pointer', viewMode !== 'table' && 'text-muted-foreground hover:text-foreground')}>
              <TablePropertiesIcon className="size-4" />
              <span className="sr-only">Table</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
