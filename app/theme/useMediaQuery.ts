import { useEffect } from 'react'

import { THEME, THEME_PREFERS_DARK_MQ } from '~/constants'

export type UseThemeProps = {
  setTheme: (theme: THEME) => void
}

export function useMediaQuery({ setTheme }: UseThemeProps) {
  useEffect(() => {
    const mediaQuery = window.matchMedia(THEME_PREFERS_DARK_MQ)
    const handleChange = () => {
      setTheme(mediaQuery.matches ? THEME.DARK : THEME.LIGHT)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
}
