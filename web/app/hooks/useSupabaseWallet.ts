import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

import { supabase } from '~/utils/supabase'

console.log('supabase**********', supabase)

export type WalletUser = {
  id: string
  username: string
  email?: string
  avatar_url?: string
  solana_wallet_address: string
}

export const useSupabaseWallet = () => {
  const { publicKey } = useWallet()
  const [user, setUser] = useState<WalletUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (!publicKey) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('solana_wallet_address', publicKey.toBase58())
          .single()

        if (error) throw error
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [publicKey])

  return { user, loading }
} 