import React from 'react'

import { THEME, THEME_PREFERS_DARK_MQ } from '~/constants'

const clientScripts = `
  ;(() => {
    const theme = window.matchMedia(${JSON.stringify(
      THEME_PREFERS_DARK_MQ
    )}).matches
      ? 'dark'
      : 'light';
    const cl = document.documentElement.classList;
    const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
    if (themeAlreadyApplied) {
      // this script shouldn't exist if the theme is already applied!
      console.warn(
        "Hi there, could you let me know you're seeing this message? Thanks!",
      );
    } else {
      cl.add(theme);
    }
    const meta = document.querySelector('meta[name=color-scheme]');
    if (meta) {
      if (theme === 'dark') {
        meta.content = 'dark light';
      } else if (theme === 'light') {
        meta.content = 'light dark';
      }
    } else {
      console.warn(
        "Hey, could you let me know you're seeing this message? Thanks!",
      );
    }
  })();`

export type ThemeScriptProps = {
  theme: THEME;
}

const ThemeScript: React.FC<ThemeScriptProps> = ({ theme }) => {
  return theme && <script dangerouslySetInnerHTML={{ __html: clientScripts }} />
}

export default ThemeScript
