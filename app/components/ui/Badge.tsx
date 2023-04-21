import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'

type BadgeProps = HTMLAttributes<HTMLSpanElement>

const Badge: React.FC<BadgeProps> = ({ children, className, ...rest }) => {
  return (
    <span
      className={clsx(
        'mr-2 rounded bg-gray-200 px-2.5 py-2 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}

export default Badge
