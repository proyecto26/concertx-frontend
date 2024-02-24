import { useQuery } from '@tanstack/react-query'
import { useAuthenticityToken } from 'remix-utils/csrf/react'

type WalletResponse = {
  nonce: string
  publicKey: string
  signature: string
}

export function useUserWallet() {
  const csrf = useAuthenticityToken();
  const { data, refetch, status } = useQuery({
    queryKey: ['user-wallet'],
    queryFn: async () => {
      const response = await fetch(`/api/wallet`)
      if (!response.ok) {
        throw new Error('Server is busy')
      }
      const data: WalletResponse = await response.json()
      if (!data) {
        throw new Error('Response is invalid')
      }
      return data
    },
    retry: true,
  })

  const updateWallet = async (publicKey: string, signature: string) => {
    const formData = new FormData();
    formData.append('csrf', csrf);
    formData.append('walletPublicKey', publicKey);
    formData.append('signature', signature);
    const response = await fetch(`/api/wallet`, {
      method: 'post',
      body: formData,
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  };

  return {
    nonce: data?.nonce,
    publicKey: data?.publicKey,
    signature: data?.signature,
    updateWallet,
    onLoadWallet: refetch,
    walletStatus: status,
  }
}
