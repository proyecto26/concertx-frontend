import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import bs58 from 'bs58';

import { encodeSignatureMessage, verifySignature } from '~/utils/solana';
import { useUserWallet } from './useUserWallet';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

export function useSolanaWallet() {
  const [messageSignature, setMessageSignature] = useState<string>('');
  const [error, setError] = useState<Error | null>();
  const { visible, setVisible } = useWalletModal();
  const { connection } = useConnection();
  const { publicKey, signMessage, connected, connect, wallet } = useWallet();
  const loadingSignatureRef = useRef(false);

  const {
    nonce,
    publicKey: walletPublicKey,
    signature
  } = useUserWallet();

  useEffect(() => {
    if (connected && ((walletPublicKey || publicKey) && publicKey?.toBase58() !== walletPublicKey)) {
      setError(new Error ('Selecting another wallet, sign in again to use the new one'));
    }
  }, [walletPublicKey, signature, connected, messageSignature]);

  const onClickConnect = useCallback(async () => {
    setVisible(true);
    if (!publicKey) {
      connect();
    }
  }, [publicKey]);

  const onSignMessage = async () => {
    if (loadingSignatureRef.current || !signMessage) return;
    loadingSignatureRef.current = true;
    try {
      setError(null); 
      setMessageSignature('');
      if (!publicKey) {
        throw new WalletNotConnectedError();
      }
      if (!nonce) {
        throw new Error('Please sign in again');
      }
      const encodedMessage = encodeSignatureMessage(publicKey.toString(), nonce);
      const signedMessage = await signMessage(encodedMessage);
      // Sign the bytes using the wallet
      const signature = bs58.encode(signedMessage);
      // Verify that the bytes were signed using the private key that matches the known public key
      if (!verifySignature(nonce, signature, publicKey)) {
        throw new Error('Invalid signature!');
      }
      setMessageSignature(signature);
    } catch (error) {
      setError(error as Error);
    } finally {
      loadingSignatureRef.current = false;
    }
  };

  return {
    error,
    isModalVisible: visible,
    connected,
    connection,
    wallet,
    publicKey,
    onClickConnect,
    onSignMessage,
    messageSignature,
  };
}