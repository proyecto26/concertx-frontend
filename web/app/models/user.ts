export type UserRole = 'user' | 'admin'

export interface User {
  id: string
  username: string
  email: string
  display_name: string
  bio?: string
  avatar_url?: string
  solana_wallet_address: string
  role: UserRole
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface UserStats {
  id: string
  username: string
  display_name: string
  avatar_url?: string
  is_verified: boolean
  followers_count: number
  following_count: number
}

export interface UserSettings {
  user_id: string
  email_notifications: boolean
  marketing_emails: boolean
  theme: 'system' | 'light' | 'dark'
  language: string
  updated_at: string
}

// Form data type for profile updates
export interface ProfileFormData {
  username: string
  email: string
  display_name: string
  bio?: string
  avatar_url?: string
} 