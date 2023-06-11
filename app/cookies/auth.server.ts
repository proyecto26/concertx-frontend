import { createCookieSessionStorage } from '@remix-run/node';

import { sessionSecret } from '~/config/env.server';

const authStorage = createCookieSessionStorage({
  cookie: {
    name: '__login',
    secure: process.env.NODE_ENV !== 'development',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 26, // 26 days
    httpOnly: true,
  },
});

const USER_ID_KEY = 'userId';
const EMAIL_KEY = 'email';
const ACCESS_TOKEN_KEY = 'accessToken';
const NONCE = 'nonce';
const PUBLIC_KEY = 'publicKey';
const SIGNATURE = 'signature';
const ERROR_KEY = 'error';
const MESSAGE_KEY = 'message';

export async function getAuthSession(request: Request) {
  const session = await authStorage.getSession(
    request.headers.get('Cookie')
  );
  return {
    getUserId: () => session.get(USER_ID_KEY),
    setUserId: (userId: string) => session.set(USER_ID_KEY, userId),
    getAuthEmail: () => session.get(EMAIL_KEY) as string,
    setAuthEmail: (email: string) => session.set(EMAIL_KEY, email),
    getAuthAccessToken: () => session.get(ACCESS_TOKEN_KEY) as string,
    setAuthAccessToken: (accessToken: string) =>
      session.set(ACCESS_TOKEN_KEY, accessToken),
    getError: () => session.get(ERROR_KEY) as string | undefined,
    flashError: (error: string) => session.flash(ERROR_KEY, error),
    getMessage: () => session.get(MESSAGE_KEY) as string | undefined,
    flashMessage: (message: string) => session.flash(MESSAGE_KEY, message),
    clean: () => {
      session.unset(USER_ID_KEY);
      session.unset(EMAIL_KEY);
      session.unset(ACCESS_TOKEN_KEY);
      session.unset(PUBLIC_KEY);
      session.unset(SIGNATURE);
      session.unset(ERROR_KEY);
      session.unset(MESSAGE_KEY);
    },
    getNonce: () => session.get(NONCE) as string,
    setNonce: (nonce: string) => session.set(NONCE, nonce),
    getPublicKey: () => session.get(PUBLIC_KEY) as string,
    setPublicKey: (publicKey: string) => session.set(PUBLIC_KEY, publicKey),
    cleanPublicKey: () => session.unset(PUBLIC_KEY),
    // Signature request created when the user is connected using the wallet
    getSignature: () => session.get(SIGNATURE) as string,
    setSignature: (signature: string) => session.set(SIGNATURE, signature),
    commitSession: () => authStorage.commitSession(session),
    destroySession: () => authStorage.destroySession(session)
  };
}

