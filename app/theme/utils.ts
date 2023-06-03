import { THEME } from '~/constants';

const themes: Array<THEME> = Object.values(THEME);

export function isTheme(value: unknown): value is THEME {
  return typeof value === 'string' && themes.includes(value as THEME);
}