import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useNavigation, Link } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';

import CloseIcon from '../icons/Close';
import MenuIcon from '../icons/Menu';
import { Navigation } from '../Navigation';

export function MobileNavigation() {
  let { location } = useNavigation()
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return;

    setIsOpen(false);
  }, [location])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-6 w-6 stroke-slate-500" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            as={motion.div}
            open={isOpen}
            initial={false}
            onClose={setIsOpen}
            className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
            aria-label="Navigation"
          >
            <Dialog.Panel
              as={motion.div}
              variants={{
                open: (height = 1000) => ({
                  clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
                  transition: {
                    type: "spring",
                    stiffness: 20,
                    restDelta: 2
                  }
                }),
                closed: {
                  clipPath: "circle(30px at 40px 40px)",
                  transition: {
                    delay: 0.5,
                    type: "spring",
                    stiffness: 400,
                    damping: 40
                  }
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="min-h-full w-full max-w-xs bg-white px-4 pt-5 pb-12 dark:bg-slate-900 sm:px-6"
            >
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                >
                  <CloseIcon className="h-6 w-6 stroke-slate-500" />
                </button>
                <Link to="/" className="ml-6" aria-label="Home page">
                  <img src='/assets/logo_con.svg' className="h-9 w-9 fill-slate-700 dark:fill-sky-100 rounded-full" />
                </Link>
              </div>
              <Navigation className="mt-5 px-1" />
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
