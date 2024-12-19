import { useState, useEffect } from 'react'
import { useNavigate } from '@remix-run/react'
import { ArrowTopRightOnSquareIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useFetcher } from '@remix-run/react'
import { useAuthenticityToken } from 'remix-utils/csrf/react'
import Button from '~/components/ui/Button'
import { useProfileData } from '~/hooks/useProfileData'
import { useWallet } from '@solana/wallet-adapter-react'
import type { ProfileFormData } from '~/models'

interface ProfilePageProps {
  address?: string
}

type SubmitResponse = {
  ok: boolean
  error?: string
}

const ProfileSkeleton = () => (
  <div className="container mx-auto px-4 py-8 lg:px-8">
    <div className="mx-auto max-w-3xl">
      {/* Header Skeleton */}
      <div className="mb-8 flex items-center justify-between">
        <div className="h-9 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-4">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {/* Basic Details Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="mb-6 h-7 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-6">
            {/* Display Name */}
            <div>
              <div className="mb-2 h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
            </div>
            {/* Username */}
            <div>
              <div className="mb-2 h-5 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
            </div>
            {/* Email */}
            <div>
              <div className="mb-2 h-5 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
            </div>
            {/* Bio */}
            <div>
              <div className="mb-2 h-5 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-24 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="mb-6 h-7 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1">
              <div className="h-8 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Wallet Address Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="mb-6 h-7 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  </div>
)

const ProfilePage = ({ address }: ProfilePageProps) => {
  const navigate = useNavigate()
  const { connected, connecting } = useWallet()
  const csrf = useAuthenticityToken()
  const fetcher = useFetcher<SubmitResponse>()
  const { user, userStats, loading, error: profileError, fetchProfile, uploadAvatar } = useProfileData()
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    email: '',
    display_name: '',
    bio: '',
    avatar_url: '',
  })

  useEffect(() => {
    if (connected) {
      fetchProfile()
    }
  }, [connected])

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        display_name: user.display_name,
        bio: user.bio || '',
        avatar_url: user.avatar_url,
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Upload to Supabase
      const publicUrl = await uploadAvatar(file)
      if (publicUrl) {
        setFormData(prev => ({ ...prev, avatar_url: publicUrl }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected || !address) {
      alert('Please connect your wallet first')
      return
    }

    fetcher.submit(
      {
        ...formData,
        solana_wallet_address: address,
        csrf
      },
      { method: 'post' }
    )
  }

  // Show success message and navigate back
  useEffect(() => {
    if (fetcher.data?.ok) {
      navigate(-1)
    }
  }, [fetcher.data, navigate])

  if (!connected && !connecting) {
    return (
      <div className="container mx-auto px-4 py-8">
        Please connect your wallet to edit your profile.
      </div>
    )
  }

  if (loading) {
    return <ProfileSkeleton />
  }

  const error = profileError || fetcher.data?.error

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit your profile</h1>
          {userStats && (
            <div className="flex gap-4 text-sm text-gray-500">
              <span>{userStats.followers_count} followers</span>
              <span>{userStats.following_count} following</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/50 dark:text-red-200">
            {error}
          </div>
        )}

        <fetcher.Form onSubmit={handleSubmit} className="space-y-8">
          <input type="hidden" name="csrf" value={csrf} />
          <input type="hidden" name="solana_wallet_address" value={address} />

          {/* Basic Details Section */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Enter your details</h2>
            
            <div className="space-y-6">
              {/* Display Name */}
              <div>
                <label htmlFor="display_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Display Name
                </label>
                <input
                  type="text"
                  id="display_name"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                  placeholder="Enter your display name"
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-600 dark:bg-gray-700 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-none rounded-r-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                    placeholder="username"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bio
                  <span className="ml-1 text-xs text-gray-500">(Optional)</span>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                  placeholder="Tell us about yourself..."
                />
                <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
              </div>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Profile Image</h2>
            
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 flex-shrink-0">
                {formData.avatar_url ? (
                  <img
                    src={formData.avatar_url}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <PhotoIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                  />
                </label>
                <p className="mt-2 text-xs text-gray-500">JPG, PNG or GIF. 10MB max.</p>
              </div>
            </div>
            <input type="hidden" name="avatar_url" value={formData.avatar_url || ''} />
          </div>

          {/* Wallet Address Display */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Wallet Address</h2>
            
            <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {address || 'No wallet connected'}
              </span>
              {address && (
                <button
                  type="button"
                  className="ml-auto text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={() => window.open(`https://explorer.solana.com/address/${address}`, '_blank')}
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => navigate(-1)}
              type="button"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={fetcher.state !== 'idle'}
            >
              {fetcher.state !== 'idle' ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  )
}

export default ProfilePage 