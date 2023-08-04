import type { ActionArgs } from '@remix-run/node';
import { type LoaderArgs, json } from '@remix-run/node'

import { getAuthSession } from '~/cookies/auth.server'
import { getGlobalSession } from '~/cookies/session.server'
import { randomString } from '~/utils/crypto'
import { verifySignature } from '~/utils/solana'

export const action = async ({ request }: ActionArgs) => {
  const { verifyAuthenticityToken } = await getGlobalSession(request)
  await verifyAuthenticityToken()
  try {
    const { getNonce, setPublicKey, setSignature, commitSession } =
      await getAuthSession(request)
    const formData = await request.clone().formData()
    const walletPublicKey = formData.get('walletPublicKey')?.toString()
    const signature = formData.get('signature')?.toString()
    if (!walletPublicKey) {
      throw new Error('Sorry, the public key is required')
    }
    if (!signature) {
      throw new Error('Sorry, the signature is required')
    }
    if (!verifySignature(getNonce(), signature, walletPublicKey)) {
      throw new Error('Sorry, the signature request is not valid')
    }
    setSignature(signature)
    setPublicKey(walletPublicKey)
    return json(
      { ok: true },
      { headers: { 'Set-Cookie': await commitSession() } }
    )
  } catch (error) {
    return json({
      error: (error as Error).message || error,
      ok: false,
    })
  }
}

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
