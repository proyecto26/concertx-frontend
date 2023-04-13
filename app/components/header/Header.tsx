import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Link } from '@remix-run/react';
import clsx from 'clsx';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useScroll } from '~/hooks';
import { MobileNavigation } from '../mobile/Navigation';
import Search from '../search/Search';
import Button from '../ui/Button';

type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({
  title = 'ConcertX'
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const { isScrolled } = useScroll();
  return (
    <AnimatePresence initial={false}>
      <header
        className={clsx(
          'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-1 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
          isScrolled
            ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
            : 'dark:bg-transparent'
        )}
      >
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="mr-6 flex lg:hidden">
            <MobileNavigation />
          </div>
          <div className="relative flex items-center flex-grow md:flex-[0.2_0_auto]">
            <Link to="/" aria-label="Home page" className="flex flex-row items-center justify-center space-x-3">
              <h1 className="hidden lg:block text-3xl text-center font-bold my-4">
                ConcertX
              </h1>
              <img alt="Logo" src='/assets/logo_con.svg' className="h-9 w-auto fill-slate-700 dark:fill-sky-100 rounded-full" />
            </Link>
          </div>
          <div className="flex-1 hidden md:block">
            <Search />
          </div>
          <div className="relative flex justify-end gap-2 sm:gap-4 md:gap-8 md:flex-[0.2_0_auto]">
            <ul className="list-reset hidden xl:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <a className="inline-block py-2 px-4 text-gray-800 no-underline" href="#">Artists</a>
              </li>
              <li className="mr-3">
                <a className="inline-block py-2 px-4 text-gray-800 no-underline" href="#">Events</a>
              </li>
            </ul>
            {!isExpanded && (
              <motion.button
                key="open_search"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
                onClick={() => setExpanded(true)}
                type="button"
                className="md:hidden flex-shrink-0 inline-flex items-center rounded-full border border-transparent p-2.5 text-black shadow-sm focus:outline-none"
              >
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Open Search</span>
              </motion.button>
            )}
            <Button>
              Connect Wallet
            </Button>
            <button type="button" className="md:hidden flex-shrink-0 focus:outline-none font-medium text-sm p-2.5 text-center inline-flex items-center">
              <img aria-hidden="true" src='/assets/wallet_icon.svg' className="w-9 h-9 fill-slate-700" />
              <span className="sr-only">Connect Wallet</span>
            </button>
          </div>
        </div>
        {isExpanded && (
          <motion.div
            className="md:hidden flex-1 flex flex-row"
            key="search"
            initial="collapsed"
            animate="open"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Search className="flex-1" />
            <button
              onClick={() => setExpanded(false)}
              type="button"
              className="flex-none flex-shrink-0 inline-flex items-center rounded-full border border-transparent p-2.5 text-black shadow-sm focus:outline-none"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Close Search</span>
            </button>
          </motion.div>
        )}
      </header>
    </AnimatePresence>
  );
};

export default Header;