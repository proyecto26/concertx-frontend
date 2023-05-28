import { json, LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import clsx from 'clsx'
import { useEffect } from 'react'
import { AuthenticityTokenProvider } from 'remix-utils'

import { THEME } from '~/constants'
import tailwindStyles from '~/tailwind.css'
import vendorsStyles from '~/styles/vendors.css'
import mainStyles from '~/styles/main.css'
import darkStyles from '~/styles/dark.css'
import { getGlobalSession } from '~/cookies/session.server'
import { getAuthSession } from '~/cookies/auth.server'
import { getEnv } from '~/env.server'
import { getGlobalMetaTags } from '~/config/seo'
import { ThemeScript, useTheme, withThemeProvider } from '~/theme'
import { getThemeSession } from './theme/theme.server'

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: vendorsStyles },
    { rel: 'stylesheet', href: tailwindStyles },
    {
      rel: 'stylesheet',
      href: mainStyles,
    },
    {
      rel: 'stylesheet',
      href: darkStyles,
      // media: '(prefers-color-scheme: dark)',
    },
  ]
}

export type LoaderData = {
  url: string
  userId: string
  requestData?: {
    title?: string
    description?: string
  }
  ENV: ReturnType<typeof getEnv>
  csrf: string
  theme: THEME | null
}

export const loader = async ({ request }: LoaderArgs) => {
  const { createAuthenticityToken, commitSession } = await getGlobalSession(
    request
  )
  const themeSession = await getThemeSession(request)
  const { getUserId } = await getAuthSession(request)
  const token = createAuthenticityToken()
  const userId = getUserId()

  return json<LoaderData>(
    {
      url: request.url,
      userId,
      ENV: getEnv(),
      csrf: token,
      theme: themeSession.getTheme(),
    },
    {
      headers: {
        'Set-Cookie': await commitSession(),
      },
    }
  )
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const requestData = data?.requestData
  return {
    ...getGlobalMetaTags({
      url: data?.url,
      title: requestData?.title,
      description: requestData?.description,
    }),
  }
}

type AppProps = {
  csrf: string
}

function App({ csrf }: AppProps) {
  const location = useLocation()
  const [theme] = useTheme()

  useEffect(() => {
    // TODO: Add Google track view metric
    console.log(location.pathname)
  }, [location])

  return (
    <AuthenticityTokenProvider token={csrf}>
      <html lang="en" className={clsx('h-full', theme)}>
        <head>
          <Meta />
          <meta
            name="color-scheme"
            content={theme === 'dark' ? 'dark light' : 'light dark'}
          />
          <Links />
          <ThemeScript theme={theme as THEME} />
        </head>
        <body className="h-full bg-light font-sans leading-normal tracking-normal">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </AuthenticityTokenProvider>
  )
}

const AppWithTheme = withThemeProvider(App)

export default function () {
  const { csrf, theme } = useLoaderData<LoaderData>()
  return <AppWithTheme specifiedTheme={theme as THEME} csrf={csrf} />
}
