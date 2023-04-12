import clsx from 'clsx';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "hidden md:block flex-shrink-0 bg-dark-gray border-dark-gray hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 hover:border-gray-800 text-sm md:text-base border-4 text-white py-2 px-5 rounded-md",
        className,
      )}
      type={type ?? "button"}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;