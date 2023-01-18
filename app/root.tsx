import { json, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import { useEffect } from 'react';
import { AuthenticityTokenProvider } from 'remix-utils';

import tailwindStyles from '~/styles/tailwind.css';
import vendorsStyles from '~/styles/vendors.css';
import { getGlobalSession } from '~/cookies/session.server';
import { getAuthSession } from '~/cookies/auth.server';
import { getEnv } from '~/env.server';
import { getGlobalMetaTags } from '~/utils/seo';

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
    { rel: 'stylesheet', href: vendorsStyles },
    { rel: 'stylesheet', href: tailwindStyles },
  ];
};

export type LoaderData = {
  url: string;
  userId: string;
  requestData?: {
    title?: string;
    description?: string;
  };
  ENV: ReturnType<typeof getEnv>;
  csrf: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { createAuthenticityToken, commitSession } = await getGlobalSession(request);
  const { getUserId } = await getAuthSession(request);
  const token = createAuthenticityToken();
  const userId = getUserId();

  return json<LoaderData>({
    url: request.url,
    userId,
    ENV: getEnv(),
    csrf: token,
  }, {
    headers: {
      'Set-Cookie': await commitSession(),
    }
  });
};

export const meta: MetaFunction = ({ data }) => {
  const requestData = (data as LoaderData | undefined)?.requestData;
  return {
    ...getGlobalMetaTags({
      url: data?.url,
      title: requestData?.title,
      description: requestData?.description,
    }),
  };
};
export default function App() {
  const { csrf } = useLoaderData<LoaderData>();
  const location = useLocation();

  useEffect(() => {
    // TODO: Add Google track view metric
    console.log(location.pathname);
  }, [location]);
  
  return (
    <AuthenticityTokenProvider token={csrf}>
      <html lang="en" className="h-full">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="h-full bg-gray-100 font-sans leading-normal tracking-normal">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </AuthenticityTokenProvider>
  );
}
