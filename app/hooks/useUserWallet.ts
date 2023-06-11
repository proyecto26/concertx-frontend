import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

type WalletResponse = {
  nonce: string
  publicKey: string
  signature: string
}

export function useUserWallet() {
  const [enabledQuery, setEnabledQuery] = useState(true)
  const { data } = useQuery({
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
    enabled: enabledQuery,
    retry: true,
    useErrorBoundary: false,
    onSuccess: () => setEnabledQuery(false),
  })

  return {
    nonce: data?.nonce,
    publicKey: data?.publicKey,
    signature: data?.signature,
  }
}
