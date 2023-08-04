import { json, redirect } from '@remix-run/node';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { getThemeSession } from '~/theme/theme.server';
import { isTheme } from '~/theme';

export const loader: LoaderFunction = () => redirect('/', { status: 404 });

export const action: ActionFunction = async ({ request }) => {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme');

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    });
  }

  const themeSession = await getThemeSession(request);
  themeSession.setTheme(theme);
  return json({ success: true }, { headers: { 'Set-Cookie': await themeSession.commit() } });
};