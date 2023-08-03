/* eslint-disable react/display-name */
import { useFetcher } from '@remix-run/react'
import {
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type {
  Dispatch,
  SetStateAction,
  ComponentType,
  PropsWithChildren
} from 'react'

import { THEME, THEME_PREFERS_DARK_MQ } from '~/constants'
import { useMediaQuery } from './useMediaQuery'

const themes: Array<THEME> = Object.values(THEME)
type ThemeContextType = [THEME | null, Dispatch<SetStateAction<THEME | null>>]

type ThemeProviderProps = PropsWithChildren<{
  specifiedTheme?: THEME | null
}>

const getPreferredTheme = () =>
  window.matchMedia(THEME_PREFERS_DARK_MQ).matches ? THEME.DARK : THEME.LIGHT

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

function ThemeProvider({ children, specifiedTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState<THEME | null>(() => {
    // On the server, if we don't have a specified theme then we should
    // return null and the clientThemeCode will set the theme for us
    // before hydration. Then (during hydration), this code will get the same
    // value that clientThemeCode got so hydration is happy.
    if (specifiedTheme) {
      return themes.includes(specifiedTheme) ? specifiedTheme : null
    }

    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof document === 'undefined') {
      return null
    }

    return getPreferredTheme()
  })

  const persistTheme = useFetcher()
  const persistThemeRef = useRef(persistTheme)
  useEffect(() => {
    persistThemeRef.current = persistTheme
  }, [persistTheme])

  const mountRun = useRef(false)

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true
      return
    }
    if (!theme) {
      return
    }

    persistThemeRef.current.submit(
      { theme },
      { action: 'api/theme', method: 'post' }
    )
  }, [theme])

  useMediaQuery({ setTheme })

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export function withThemeProvider<T>(
  WrappedComponent: ComponentType<T>
): ComponentType<T & ThemeProviderProps> {
  return function (props: T & ThemeProviderProps) {
    return (
      <ThemeProvider specifiedTheme={props.specifiedTheme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    )
  }
}
