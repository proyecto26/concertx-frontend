import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react'

type PaginationProps = PropsWithChildren & {
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ className }) => {
  return (
    <nav
      className={clsx('isolate -space-x-px', className)}
      aria-label="Pagination"
    >
      <a
        href="#"
        className="relative inline-flex items-center px-2 py-2 text-gray-400 hover:text-gray-900 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Previous</span>
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href="#"
        aria-current="page"
        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 focus:z-20 focus:outline-offset-0"
      >
        1
      </a>
      <a
        href="#"
        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 hover:text-gray-900 focus:z-20 focus:outline-offset-0"
      >
        2
      </a>
      <a
        href="#"
        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 hover:text-gray-900 focus:z-20 focus:outline-offset-0"
      >
        3
      </a>
      <a
        href="#"
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:text-gray-900 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Next</span>
        <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
      </a>
    </nav>
  )
}

export default Pagination
