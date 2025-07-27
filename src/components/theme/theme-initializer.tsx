'use client';

import { useEffect } from 'react';
import { useTheme } from '@/store/theme';
import type { SelectedTheme } from '@/store/theme';

interface ThemeInitializerProps {
  selectedTheme: SelectedTheme;
}

export const ThemeInitializer = ({ selectedTheme }: ThemeInitializerProps) => {
  const { setTheme, setInitialized } = useTheme();

  useEffect(() => {
    setTheme(selectedTheme);
    setInitialized(true);
  }, [selectedTheme, setTheme, setInitialized]);

  return null;
};
