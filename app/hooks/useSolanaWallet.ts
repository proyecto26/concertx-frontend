import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useRef, useState } from 'react';
import bs58 from 'bs58';

import { encodeSignatureMessage, verifySignature } from '~/utils/solana';
import { useUserWallet } from './useUserWallet';

export function useSolanaWallet() {
  const [showSignatureRequest, setShowSignatureRequest] = useState(false);
  const [error, setError] = useState<Error | null>();
  const { connection } = useConnection();
  const { publicKey, signMessage, connected, wallet } = useWallet();
  const loadingSignatureRef = useRef(false);

  const {
    nonce,
    publicKey: walletPublicKey,
    walletStatus,
    updateWallet,
    onLoadWallet,
  } = useUserWallet();

  useEffect(() => {
    if (publicKey && walletStatus !== 'pending' && publicKey.toBase58() !== walletPublicKey) {
      onLoadWallet()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, walletStatus]);

  useEffect(() => {
    if (connected && walletStatus === 'success' && publicKey) {
      setShowSignatureRequest(publicKey.toBase58() !== walletPublicKey);
    }
  }, [connected, walletPublicKey, publicKey, walletStatus]);

  const onSignMessage = async () => {
    if (loadingSignatureRef.current || !signMessage) return;
    loadingSignatureRef.current = true;
    try {
      setError(null);
      if (!publicKey) {
        throw new WalletNotConnectedError();
      }
      if (!nonce) {
        throw new Error('Please sign in again');
      }
      const encodedMessage = encodeSignatureMessage(publicKey.toBase58(), nonce);
      const signedMessage = await signMessage(encodedMessage);
      // Sign the bytes using the wallet
      const signature = bs58.encode(signedMessage);
      // Verify that the bytes were signed using the private key that matches the known public key
      if (!verifySignature(nonce, signature, publicKey)) {
        throw new Error('Invalid signature!');
      }
      // Update signature in the cookie
      await updateWallet(publicKey.toBase58(), signature);
      setShowSignatureRequest(false);
    } catch (error) {
      setError(error as Error);
    } finally {
      loadingSignatureRef.current = false;
    }
  };

  return {
    error,
    connected,
    connection,
    wallet,
    publicKey,
    onSignMessage,
    showSignatureRequest,
  };
}