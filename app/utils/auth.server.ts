import { redirect } from '@remix-run/node';

import { getAuthSession } from '~/cookies/auth.server';
import { verifySignature } from './solana';

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

// Redirect to the connect wallet page
export const connectWalletRedirect = async (request: Request) => {
  const { setSignature, commitSession } = await getAuthSession(request);
  setSignature('');
  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(),
    },
  });
};

// Validate Solana Wallet connection
export const validateWalletConnection = async (request: Request) => {
  const { getPublicKey } = await getAuthSession(request);
  const publicKey = getPublicKey();
  if (!publicKey) {
    throw await connectWalletRedirect(request);
  }
};

// Validate the current signature
export const validateSignature = async (request: Request) => {
  const { getPublicKey, getSignature, getNonce } = await getAuthSession(request);
  const nonce = getNonce();
  const publicKey = getPublicKey();
  if (!nonce || !publicKey) return;
  const signature = getSignature();
  if (!signature || !verifySignature(nonce, signature, publicKey)) {
    throw await connectWalletRedirect(request);
  }
};