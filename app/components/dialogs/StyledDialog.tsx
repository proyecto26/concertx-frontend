import { Dialog } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

import { transitionVariants } from '../../utils/motion';

interface StyledDialogProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function StyledDialog({
  isOpen,
  onClose,
  className = '',
  children,
}: StyledDialogProps) {
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
            {children}
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
