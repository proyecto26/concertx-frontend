import clsx from 'clsx';
import React from 'react';
import { with3DHover } from '~/hocs';

type FigureProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  imgSrc: string;
  imgAlt?: string;
  link?: string;
};

const Figure: React.FC<FigureProps> = ({
  children,
  className,
  imgSrc,
  imgAlt = "image description",
  link = "#",
  ...rest
}) => {
  return (
    <figure
      className={clsx(
        "relative max-w-2xl cursor-pointer grayscale filter transition-all duration-300 hover:grayscale-0",
        className,
      )}
      {...rest}
    >
      <a href={link}>
        <img
          className="h-auto max-w-full min-w-[250px] rounded-2xl bg-indigo-50 object-cover md:min-w-[320px] lg:min-w-[460px]"
          src={imgSrc}
          alt={imgAlt}
        />
      </a>
      <figcaption className="absolute bottom-6 px-4 text-lg text-white pointer-events-none">
        <p>{imgAlt}</p>
      </figcaption>
    </figure>
  );
};

export default with3DHover(Figure);