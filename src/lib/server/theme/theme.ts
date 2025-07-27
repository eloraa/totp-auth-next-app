import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import type { SelectedTheme, Theme } from '@/store/theme';

export function getTheme({ cookies }: { cookies: ReadonlyRequestCookies }): {
  selectedTheme: SelectedTheme;
  theme: Theme;
} {
  const themeCookie = cookies.get('theme');
  const selectedThemeCookie = cookies.get('selectedTheme');

  const selectedTheme = (selectedThemeCookie?.value as SelectedTheme) || 'light';
  const theme = (themeCookie?.value as Theme) || 'light';

  return {
    selectedTheme,
    theme,
  };
}
