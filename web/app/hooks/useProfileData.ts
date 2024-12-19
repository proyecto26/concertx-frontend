import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

import { supabase, validateFile, getAvatarPath, handleStorageError, STORAGE_CONFIG } from '~/utils/supabase'
import type { User, UserStats } from '~/models'

export const useProfileData = () => {
  const { connected, publicKey } = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)

  const fetchProfile = async () => {
    if (!connected || !publicKey) return null

    try {
      setLoading(true)
      setError(null)

      // Fetch user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('solana_wallet_address', publicKey.toBase58())
        .single()

      // If no user found, return null without setting an error
      if (userError?.code === 'PGRST116') {
        setUser(null)
        setUserStats(null)
        return null
      }

      // For other errors, throw them
      if (userError) throw userError

      // Only fetch stats if we have a user
      if (userData) {
        const { data: statsData, error: statsError } = await supabase
          .from('user_stats')
          .select('*')
          .eq('id', userData.id)
          .single()

        if (statsError && statsError.code !== 'PGRST116') throw statsError

        setUser(userData)
        setUserStats(statsData)
        return userData
      }

      return null
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError(err instanceof Error ? err.message : 'Error fetching profile')
      return null
    } finally {
      setLoading(false)
    }
  }

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!connected || !publicKey) {
      setError('No wallet connected')
      return null
    }

    try {
      setLoading(true)
      setError(null)

      // Validate file
      const validation = validateFile(file)
      if (!validation.valid) {
        setError(validation.error!)
        return null
      }

      const fileExt = file.name.split('.').pop()
      const filePath = getAvatarPath(publicKey.toBase58(), fileExt!)

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_CONFIG.AVATARS_BUCKET)
        .upload(filePath, file, { 
          upsert: true,
          cacheControl: '3600',
          contentType: file.type
        })

      if (uploadError) {
        setError(handleStorageError(uploadError))
        return null
      }

      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_CONFIG.AVATARS_BUCKET)
        .getPublicUrl(filePath)

      return publicUrl
    } catch (err) {
      console.error('Error uploading avatar:', err)
      setError(err instanceof Error ? err.message : 'Error uploading avatar')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    userStats,
    loading,
    error,
    fetchProfile,
    uploadAvatar
  }
} 