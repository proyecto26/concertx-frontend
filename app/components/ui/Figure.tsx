import clsx from 'clsx'
import React from 'react'

import { with3DHover } from '~/hocs'

type FigureProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  imgSrc: string
  imgAlt?: string
  imgClass?: string
  link?: string
}

const Figure: React.FC<FigureProps> = ({
  children,
  className,
  imgSrc,
  imgClass,
  imgAlt = 'image description',
  link = '#',
  ...rest
}) => {
  return (
    <figure
      className={clsx(
        'relative max-w-2xl cursor-pointer grayscale filter transition-all duration-300 hover:grayscale-0',
        className
      )}
      {...rest}
    >
      <a href={link}>
        <img
          className={clsx('rounded-2xl bg-indigo-50 object-cover', imgClass)}
          src={imgSrc}
          alt={imgAlt}
        />
      </a>
      <figcaption className="pointer-events-none absolute bottom-6 px-4 text-lg text-white">
        <p>{imgAlt}</p>
      </figcaption>
    </figure>
  )
}

const HoverFigure = with3DHover(Figure)

export default HoverFigure
