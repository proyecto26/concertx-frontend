import { PublicKey } from '@solana/web3.js'
import { sign } from 'tweetnacl'
import { decode } from 'bs58'

export const getSignatureRequestMsg = (walletPublicKey: string, nonce: string) => {
  return `Welcome to ConcertX!
  Click to sign in and accept the ConcertX Terms of Service and Privacy Policy.  
  This request will not trigger a blockchain transaction or cost any gas fees.
  Wallet address: ${walletPublicKey}
  Nonce: ${nonce}
  `.replace(/^\s*/gm, "\n").trim();
}

export const encodeSignatureMessage = (walletPublicKey: string, nonce: string) => {
  const message = getSignatureRequestMsg(walletPublicKey, nonce);
  // Encode anything as bytes
  return new TextEncoder().encode(message)
}

export const verifySignature = (
  nonce: string,
  signature: string,
  walletPublicKey: string | PublicKey
) => {
  const publicKey = new PublicKey(walletPublicKey)
  const encodedMessage = encodeSignatureMessage(publicKey.toString(), nonce)
  const decodedSignature = decode(signature)
  const decodedPublicKeyBytes = publicKey.toBytes()
  return sign.detached.verify(
    encodedMessage,
    decodedSignature,
    decodedPublicKeyBytes
  )
}
