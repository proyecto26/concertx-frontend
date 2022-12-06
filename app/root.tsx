import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';


import tailwindStyles from '~/styles/tailwind.css';
import vendorsStyles from '~/styles/vendors.css';

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
    { rel: 'stylesheet', href: vendorsStyles },
    { rel: 'stylesheet', href: tailwindStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'ConcertX',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
