import React, { PropsWithChildren } from 'react'

type AvatarProps = PropsWithChildren & {
  img: string
  name: string
  href?: string
  alt?: string
  details?: string
}

const Avatar: React.FC<AvatarProps> = ({
  children,
  img,
  name,
  href,
  alt,
  details,
}) => {
  return (
    <a href={href ?? '#'} className="group block flex-shrink-0 p-3">
      <div className="flex items-start justify-start">
        <div className="flex-none">
          <img
            className="inline-block h-9 w-9 rounded-full"
            src={img}
            alt={alt ?? 'Avatar'}
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {name}
          </p>
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
