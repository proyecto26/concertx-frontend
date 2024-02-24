import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useRouteError,
} from '@remix-run/react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import clsx from 'clsx'
import { useEffect } from 'react'
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react'

import type { THEME } from '~/constants'
import tailwindStyles from '~/tailwind.css'
import vendorsStyles from '~/styles/vendors.css'
import mainStyles from '~/styles/main.css'
import darkStyles from '~/styles/dark.css'
import { csrf } from '~/cookies/session.server'
import { getAuthSession } from '~/cookies/auth.server'
import { getEnv } from '~/env.server'
import { getGlobalMetaTags } from '~/config/seo'
import { ThemeScript, useTheme, withThemeProvider } from '~/theme'
import { getThemeSession } from '~/theme/theme.server'
import { withSolanaWalletConnection } from '~/hocs'
import { withQueryClientProvider } from '~/utils/query'
import WalletDialog from './components/dialogs/WalletDialog';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: vendorsStyles },
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let [token, cookieHeader] = await csrf.commitToken();
  const themeSession = await getThemeSession(request)
  const { getUserId } = await getAuthSession(request)
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
        'Set-Cookie': cookieHeader as string,
      },
    }
  )
}

export function meta() {
  return getGlobalMetaTags({
    title: 'ConcertX',
  });
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
          <WalletDialog />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </AuthenticityTokenProvider>
  )
}

const AppWithProviders = withQueryClientProvider(
  withSolanaWalletConnection(
    withThemeProvider(App)
  )
)

export default function () {
  const { csrf, theme } = useLoaderData<LoaderData>()
  return (
    <AppWithProviders
      solanaNetwork={WalletAdapterNetwork.Devnet}
      specifiedTheme={theme as THEME}
      csrf={csrf}
    />
  )
}

export const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div>
        {isRouteErrorResponse(error) ? (
          <div>
            <h1>
              {error.status} {error.statusText}
            </h1>
            <p>{error.data}</p>
          </div>
        ) : error instanceof Error ? (
          <div>
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
          </div>
        ) : (
          <h1>Unknown Error</h1>
        )}
      </div>
  );
};
