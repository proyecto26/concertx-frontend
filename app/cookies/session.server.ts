import { createCookieSessionStorage } from '@remix-run/node';
import { createAuthenticityToken, verifyAuthenticityToken } from 'remix-utils';

import { sessionSecret } from '../config/env.server';

const globalSession = createCookieSessionStorage({
  cookie: {
    name: '__session',
    secrets: [sessionSecret],
    sameSite: 'lax',
  },
});

const ERROR_KEY = 'error';
const MESSAGE_KEY = 'message';

export async function getGlobalSession(request: Request) {
  const session = await globalSession.getSession(
    request.headers.get('Cookie')
  );
  return {
    createAuthenticityToken: () => createAuthenticityToken(session),
    verifyAuthenticityToken: (sessionKey?: string) => verifyAuthenticityToken(request, session, sessionKey),
    getError: () => session.get(ERROR_KEY) as string | undefined,
    flashError: (error: string) => session.flash(ERROR_KEY, error),
    getMessage: () => session.get(MESSAGE_KEY) as string | undefined,
    flashMessage: (message: string) => session.flash(MESSAGE_KEY, message),
    commitSession: () => globalSession.commitSession(session),
    destroySession: () => globalSession.destroySession(session),
  };
}
