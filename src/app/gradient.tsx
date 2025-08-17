'use client';
import * as React from 'react';
import { MeshGradient } from '@/components/shaders/mesh-gradient';
import { type Theme, useTheme } from '@/store/theme';

export const Gradient = ({ theme: initialTheme }: { theme: Theme }) => {
  const { theme, initialized } = useTheme();
  const currentTheme = initialized ? theme : initialTheme;
  const bg = currentTheme === 'dark' ? '#000' : '#fff';
  const color = currentTheme === 'dark' ? '#010d17' : '#327330';

  return (
    <MeshGradient
      className="fixed inset-0 -z-1 pointer-events-none bg-gradient-to-r from-[#ffffff] via-[#ffffff] dark:from-[#000] dark:via-[#000] to-[#327330] dark:to-[#010d17]"
      colors={[bg, bg, bg, bg, color]}
      distortion={0.35}
      swirl={0.1}
      speed={1}
      quality={0.1}
      scale={currentTheme === 'dark' ? 2 : 1}
    />
  );
};
