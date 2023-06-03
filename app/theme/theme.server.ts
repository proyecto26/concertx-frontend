import { createCookieSessionStorage } from '@remix-run/node'

import { sessionSecret } from '~/config/env.server'
import { THEME } from '~/constants'
import { isTheme } from './utils'

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'my_remix_theme',
    secure: true,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
})

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'))
  return {
    getTheme: () => {
      const themeValue = session.get('theme')
      return isTheme(themeValue) ? themeValue : null
    },
    setTheme: (theme: THEME) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  }
}

export { getThemeSession }
