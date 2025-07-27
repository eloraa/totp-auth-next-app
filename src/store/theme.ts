import { create } from 'zustand';

export type SelectedTheme = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';
interface ThemeState {
  selectedTheme: SelectedTheme;
  theme: Theme;
  initialized: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setInitialized: (initialized: boolean) => void;
}

const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof window === 'undefined') return;
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  document.documentElement.style.colorScheme = theme;

  const color = theme === 'dark' ? '#1c1c1c' : '#fefafb';
  const colorScheme = theme;

  let themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeColorMeta) {
    themeColorMeta = document.createElement('meta');
    themeColorMeta.setAttribute('name', 'theme-color');
    document.head.appendChild(themeColorMeta);
  }
  themeColorMeta.setAttribute('content', color);

  let colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
  if (!colorSchemeMeta) {
    colorSchemeMeta = document.createElement('meta');
    colorSchemeMeta.setAttribute('name', 'color-scheme');
    document.head.appendChild(colorSchemeMeta);
  }
  colorSchemeMeta.setAttribute('content', colorScheme);
};

const setCookie = (name: string, value: string) => {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=${value};path=/;max-age=31536000`;
};


const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useTheme = create<ThemeState>(set => ({
  selectedTheme: 'light',
  theme: 'light',
  variant: 'default',
  initialized: false,
  setTheme: theme => {
    const newSelectedTheme = theme;
    const newTheme = theme === 'system' ? getSystemTheme() : theme;
    set(() => ({
      selectedTheme: newSelectedTheme,
      theme: newTheme,
    }));
    set(() => {
      applyTheme(newTheme);
      return {};
    });
    setCookie('selectedTheme', newSelectedTheme);
    setCookie('theme', newTheme);
  },
  setInitialized: (initialized: boolean) => {
    set({ initialized });
  },
}));

export const getTheme = useTheme;
