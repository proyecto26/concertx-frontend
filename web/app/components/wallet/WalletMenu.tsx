import { Menu } from '@headlessui/react'
import { Link } from '@remix-run/react'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  ArrowTopRightOnSquareIcon,
  UserCircleIcon,
  BellIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  PowerIcon
} from '@heroicons/react/24/outline'

import { cn } from '~/utils/styles'
import { useSupabaseWallet } from '~/hooks/useSupabaseWallet'

const menuItems = [
  {
    title: 'Profile',
    href: '/profile',
    icon: UserCircleIcon
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: BellIcon
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon
  },
  {
    title: 'Help',
    href: '/help',
    icon: QuestionMarkCircleIcon
  }
]

const DEFAULT_AVATAR = '/assets/default-avatar.png'

const WalletMenu = () => {
  const { publicKey, disconnect } = useWallet()
  const { user } = useSupabaseWallet()
  const walletAddress = publicKey?.toBase58() || ''
  const shortAddress = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center rounded-full bg-gray-100 p-1 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={user?.avatar_url || DEFAULT_AVATAR}
          alt={user?.username || 'Profile'}
        />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-700 dark:bg-gray-800">
        <div className="px-4 py-3">
          <p className="text-sm text-gray-900 dark:text-white">
            {user?.username || 'Connected Wallet'}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>{shortAddress}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(walletAddress)
              }}
              className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="py-1">
          {menuItems.map(({ title, href, icon: Icon }) => (
            <Menu.Item key={title}>
              {({ active }) => (
                <Link
                  to={href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                    active && 'bg-gray-100 dark:bg-gray-700'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {title}
                </Link>
              )}
            </Menu.Item>
          ))}
        </div>

        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => disconnect()}
                className={cn(
                  'flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                  active && 'bg-gray-100 dark:bg-gray-700'
                )}
              >
                <PowerIcon className="h-5 w-5" />
                Disconnect
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  )
}

export default WalletMenu 