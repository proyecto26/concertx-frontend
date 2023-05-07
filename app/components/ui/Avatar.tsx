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
        className={clsx('group block pt-3', className)}
        ref={innerRef}
        {...rest}
      >
        <div className="flex items-start">
          <a href={link} className="flex-none">
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={img}
              alt={alt ?? 'Avatar'}
            />
          </a>
          <div className="ml-3 flex-1">
            <a href={link}>
              <p className="text-base font-semibold text-gray-900">{name}</p>
              {details && (
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {details}
                </p>
              )}
            </a>
            {children}
          </div>
        </div>
      </div>
    )
  }
)

export default Avatar
