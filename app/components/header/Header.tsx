import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import useOnclickOutside from 'react-cool-onclickoutside'

import { useScroll } from '~/hooks'
import { useSolanaWallet } from '~/hooks/useSolanaWallet'
import { MobileNavigation } from '../mobile/Navigation'
import Search from '../search/Search'
import Button from '../ui/Button'
import ThemeButton from '../ui/ThemeButton'

type HeaderProps = {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title = 'ConcertX' }) => {
  const {
    error: walletError,
    connected,
    messageSignature,
    onClickConnect,
    onSignMessage,
    publicKey,
  } = useSolanaWallet()
  const { isScrolled } = useScroll()
  const [isSearchFocused, setSearchFocused] = useState(false)
  const [isMobileSearchFocused, setMobileSearchFocused] = useState(false)

  const onCloseSearch = () => {
    setSearchFocused(false)
    setMobileSearchFocused(false)
  }
  const openSearch = () => {
    setSearchFocused(true)
  }
  const openMobileSearch = () => {
    setMobileSearchFocused(true)
  }

  const headerRef = useOnclickOutside(onCloseSearch, {
    ignoreClass: 'ignore-onclickoutside',
  })

  return (
    <AnimatePresence initial={false}>
      <header
        ref={headerRef}
        className={clsx(
          'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-primary-contrast px-4 py-1 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-2xl sm:px-6 lg:px-8',
          isScrolled
            ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
            : 'dark:bg-transparent'
        )}
      >
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="mr-6 flex lg:hidden">
            <MobileNavigation />
          </div>
          <div className="relative flex flex-grow items-center md:flex-[0.2_0_auto]">
            <Link
              to="/"
              aria-label="Home page"
              className="flex flex-row items-center justify-center gap-x-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <h1 className="my-4 hidden text-center text-3xl font-bold text-dark-gray dark:text-dark lg:block">
                {title}
              </h1>
              <img
                alt="Logo"
                src="/assets/logo_con.svg"
                className="h-9 w-auto rounded-full fill-slate-700 dark:fill-sky-100"
              />
            </Link>
          </div>
          <div className="hidden flex-1 md:block">
            <Search onFocus={openSearch} onBlur={onCloseSearch} />
          </div>
          <div className="relative flex justify-end sm:gap-4 md:flex-[0.2_0_auto] md:gap-8">
            <ul className="list-reset hidden flex-1 items-center justify-end xl:flex">
              <li className="mr-3">
                <a
                  className="inline-block px-4 py-2 text-gray-800 no-underline dark:text-dark"
                  href="#"
                >
                  Artists
                </a>
              </li>
              <li className="mr-3">
                <a
                  className="inline-block px-4 py-2 text-gray-800 no-underline dark:text-dark"
                  href="#"
                >
                  Events
                </a>
              </li>
            </ul>
            {!isMobileSearchFocused && (
              <motion.button
                key="open_search"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
                onClick={openMobileSearch}
                type="button"
                className="inline-flex flex-shrink-0 items-center p-2.5 focus:outline-none md:hidden"
              >
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-black dark:text-dark"
                  aria-hidden="true"
                />
                <span className="sr-only">Open Search</span>
              </motion.button>
            )}
            <Button onClick={onClickConnect} className="hidden md:block">
              Connect Wallet
            </Button>
            <button
              type="button"
              className="inline-flex flex-shrink-0 items-center p-2.5 text-center text-sm font-medium focus:outline-none md:hidden"
              onClick={onClickConnect}
            >
              <img
                alt="Wallet"
                aria-hidden="true"
                src="/assets/wallet_icon.svg"
                className="h-7 w-7 fill-slate-700 dark:invert"
              />
              <span className="sr-only">Connect Wallet</span>
            </button>

            <ThemeButton />
          </div>
        </div>
        {isMobileSearchFocused && (
          <motion.div
            key="search"
            initial="collapsed"
            animate="open"
            className="flex flex-1 flex-row md:hidden"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Search
              autoFocus
              className="flex-1"
              onFocus={openMobileSearch}
              onBlur={onCloseSearch}
            />
            <button
              onClick={onCloseSearch}
              type="button"
              className="inline-flex flex-none flex-shrink-0 items-center p-2 focus:outline-none"
            >
              <XMarkIcon
                className="h-7 w-7 text-dark-gray dark:text-dark"
                aria-hidden="true"
              />
              <span className="sr-only">Close Search</span>
            </button>
          </motion.div>
        )}
      </header>
      {(isSearchFocused || isMobileSearchFocused) && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black bg-opacity-75 transition-opacity dark:bg-slate-900/95 dark:bg-opacity-40 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75"
        />
      )}
    </AnimatePresence>
  )
}

export default Header
