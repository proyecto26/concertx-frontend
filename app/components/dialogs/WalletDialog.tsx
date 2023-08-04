import { Dialog } from '@headlessui/react'
import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { useSolanaWallet } from '~/hooks'
import { transitionVariants } from '~/utils/motion'

interface WalletDialogProps {
  className?: string
}

export default function WalletDialog({
  className,
}: WalletDialogProps) {
  const [isOpen, setShowWalletDialog] = useState(false)
  const { error, connected, showSignatureRequest, onSignMessage } = useSolanaWallet()

  useEffect(() => {
    if (connected) {
      setShowWalletDialog(showSignatureRequest)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, showSignatureRequest])

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          variants={transitionVariants}
          initial="fadeOut"
          animate="fadeIn"
          exit="fadeOut"
          open={isOpen}
          onClose={() => setShowWalletDialog(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12"
        >
          <Dialog.Backdrop
            as={motion.div}
            variants={transitionVariants}
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />
          <Dialog.Panel
            as={motion.div}
            variants={transitionVariants}
            initial="growOut"
            animate="growIn"
            exit="growOut"
            className={clsx(
              `flex w-full max-w-2xl items-center justify-center bg-light p-5 rounded-3xl`,
              className
            )}
          >
            <section>
              <div>
                <div className="mx-auto flex h-52 w-52 items-center justify-center">
                  <img
                    alt="Logo"
                    src="/assets/logo_con.svg"
                    className="w-full h-full fill-slate-700 dark:fill-sky-100 rounded-full"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Welcome to ConcertX
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 max-w-md">
                      By connecting your wallet and using ConcertX, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
                    </p>
                    {error && (
                      <div className="flex flex-col mt-5 mb-5">
                        <motion.p
                          variants={transitionVariants}
                          initial="fadeOut"
                          animate="fadeIn"
                          exit="fadeOut"
                          className="text-base lg:text-lg xl:text-xl text-left text-danger"
                        >
                          {error.message}
                        </motion.p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  onClick={onSignMessage}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  onClick={() => setShowWalletDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </section>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
