import { LoaderArgs, json } from '@remix-run/node'

import { getAuthSession } from '~/cookies/auth.server'
import { randomString } from '~/utils/crypto'

export const loader = async ({ request }: LoaderArgs) => {
  const { commitSession, getNonce, getPublicKey, getSignature, setNonce } = await getAuthSession(request)
  const headers = new Headers();
  let nonce = getNonce()
  if (!nonce) {
    nonce = randomString(8);
    setNonce(nonce)
    headers.set('Set-Cookie', await commitSession());
  }
  return json({
    nonce,
    publicKey: getPublicKey(),
    signature: getSignature(),
  }, {
    headers,
  })
}
