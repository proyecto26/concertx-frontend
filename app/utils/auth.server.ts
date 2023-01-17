import { redirect } from '@remix-run/node';

import { getAuthSession } from '~/cookies/auth.server';

export const logoutRedirect = async (request: Request) => {
  const { commitSession, clean, flashMessage } = await getAuthSession(request);
  clean();
  flashMessage('logout');
  return redirect('/login', {
    headers: {
      'Set-Cookie': await commitSession(),
    }
  });
};

// Logout the user if the token is empty
export const getAccessTokenOrRedirect = async (request: Request) => {
  const { getAuthAccessToken } = await getAuthSession(request);
  const accessToken = getAuthAccessToken();
  if (!accessToken) {
    throw await logoutRedirect(request);
  }
  return accessToken;
};
