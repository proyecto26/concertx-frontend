import { Dialog } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import { useSolanaWallet } from '~/hooks'
import { transitionVariants } from '~/utils/motion'

interface WalletDialogProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  className?: string
}

export default function WalletDialog({
  isOpen,
  onClose,
  onAccept,
  className = '',
}: WalletDialogProps) {
  const { connected, messageSignature, onSignMessage } = useSolanaWallet()

  useEffect(() => {
    console.log('SOLANA WALLET', connected, messageSignature)
    if (connected) {
      // setShowWalletDialog(!messageSignature)
    }
  }, [connected, messageSignature])

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
          onClose={onClose}
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
              `flex w-full max-w-[92rem] items-center justify-center`,
              className
            )}
          >
            <section>
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <img
                    alt="Logo"
                    src="/assets/logo_con.svg"
                    className="h-52 w-52 rounded-full fill-slate-700 dark:fill-sky-100"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Eius aliquam laudantium explicabo pariatur iste dolorem
                      animi vitae error totam. At sapiente aliquam accusamus
                      facere veritatis.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  onClick={() => onAccept()}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  onClick={() => onClose()}
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
