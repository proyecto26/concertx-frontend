import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from '~/constants'

// Initialize Supabase client with error handling
let supabaseInstance: SupabaseClient | null = null

try {
  supabaseInstance = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: true // Enable session persistence
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'x-application-name': 'concertx'
      }
    }
  })
} catch (error) {
  console.error('Error initializing Supabase client:', error)
  throw new Error('Failed to initialize Supabase client')
}

export const supabase = supabaseInstance!

// Storage configuration
export const STORAGE_CONFIG = {
  AVATARS_BUCKET: 'avatars',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'] as const,
  AVATAR_DIMENSION_LIMIT: 2048, // Max width/height in pixels
} as const

// Helper function to validate file size and type
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (file.size > STORAGE_CONFIG.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size must be less than 10MB'
    }
  }

  if (!STORAGE_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'File must be JPEG, PNG, or GIF'
    }
  }

  return { valid: true }
}

// Helper function to generate avatar path
export const getAvatarPath = (walletAddress: string, fileExtension: string): string => {
  return `${walletAddress}/avatar.${fileExtension}`
}

// Helper function to handle storage errors
export const handleStorageError = (error: any): string => {
  console.error('Storage error:', error)
  
  if (error?.statusCode === '413') {
    return 'File size too large. Please upload a smaller file.'
  }
  
  if (error?.statusCode === '415') {
    return 'Unsupported file type. Please upload a JPEG, PNG, or GIF.'
  }
  
  return 'Failed to upload file. Please try again.'
}

