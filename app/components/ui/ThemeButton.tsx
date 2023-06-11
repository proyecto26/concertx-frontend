
import { MoonIcon } from '@heroicons/react/20/solid'
import { SunIcon } from '@heroicons/react/24/outline'

import clsx from 'clsx'
import React, { ButtonHTMLAttributes } from 'react'

import { THEME } from '~/constants'
import { useTheme } from '~/theme'

type ThemeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const ThemeButton: React.FC<ThemeButtonProps> = ({ className, ...rest }) => {
  const [theme, setTheme] = useTheme()
  return (
    <button
      onClick={() =>
        setTheme((prev) => (prev === THEME.DARK ? THEME.LIGHT : THEME.DARK))
      }
      type="button"
      className={clsx(
        'inline-flex flex-none flex-shrink-0 items-center p-2 text-black',
        className
      )}
      {...rest}
    >
      {theme === THEME.DARK ? (
        <MoonIcon className="h-5 w-5 text-white" aria-hidden="true" />
      ) : (
        <SunIcon className="h-5 w-5 text-black" aria-hidden="true" />
      )}
      <span className="sr-only">Toggle Theme</span>
    </button>
  )
}

export default ThemeButton
