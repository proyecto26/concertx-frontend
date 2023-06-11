import { json, redirect } from '@remix-run/node'
import type { ActionArgs, LoaderFunction } from '@remix-run/node'

import { getAuthSession } from '~/cookies/auth.server'
import { getGlobalSession } from '~/cookies/session.server'
import { verifySignature } from '~/utils/solana'

export const loader: LoaderFunction = () => redirect('/', { status: 404 })

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
