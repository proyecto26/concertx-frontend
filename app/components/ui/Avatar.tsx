import clsx from 'clsx'
import {
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from 'react'

import { useForwardedRef } from '~/hooks'

type AvatarProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  img: string
  name: string
  alt?: string
  details?: string
  href?: string
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, img, name, href, alt, details, className, ...rest }, ref) => {
    const innerRef = useForwardedRef<HTMLDivElement>(ref)
    const link = href ?? '#'
    return (
      <div
        className={clsx('flex items-start gap-3 pt-3', className)}
        ref={innerRef}
        {...rest}
      >
          <a href={link} className="flex-none hidden md:block">
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={img}
              alt={alt ?? 'Avatar'}
            />
          </a>
          <div className="flex-1">
            <a href={link} className="flex flex-row gap-3">
              <img
                className="inline-block h-9 w-9 rounded-full md:hidden"
                src={img}
                alt={alt ?? 'Avatar'}
              />
              <div>
              <p className="text-base font-semibold text-dark-gray dark:text-dark">{name}</p>
              {details && (
                <p className="text-xs font-medium text-gray-500 dark:text-medium group-hover:text-gray-700">
                  {details}
                </p>
              )}
              </div>
            </a>
            {children}
          </div>
      </div>
    )
  }
)

export default Avatar
