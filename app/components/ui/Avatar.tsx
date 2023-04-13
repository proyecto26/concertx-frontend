import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'

type AvatarProps = PropsWithChildren & {
  img: string
  name: string
  href?: string
  alt?: string
  details?: string
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({
  children,
  img,
  name,
  href,
  alt,
  details,
  className,
}) => {
  return (
    <a href={href ?? '#'} className={clsx('group block pt-3', className)}>
      <div className="flex items-start">
        <div className="flex-none">
          <img
            className="inline-block h-9 w-9 rounded-full"
            src={img}
            alt={alt ?? 'Avatar'}
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-base font-semibold text-gray-900">{name}</p>
          {details && (
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              {details}
            </p>
          )}
          {children}
        </div>
      </div>
    </a>
  )
}

export default Avatar
