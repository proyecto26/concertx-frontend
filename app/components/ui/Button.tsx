import clsx from 'clsx'
import React, { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        'text-sm text-white md:text-base flex-shrink-0 rounded-md border-4 border-dark-gray bg-dark-gray py-2 px-5 hover:border-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
        className
      )}
      type={type ?? 'button'}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
