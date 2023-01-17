import React from 'react';

type IconProps = {
  className?: string;
  color?: string;
};

const Icon: React.FC<IconProps> = ({
  className,
  color = 'currentColor'
}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill={color}
    >
      <path fill="#FFD24D" d="M88.8,64c0,17.3-14.1,31.4-31.4,31.4S25.9,81.3,25.9,64S47,32.6,64,32.6S88.8,46.7,88.8,64z" />
      <path fill="#E05243" d="M79.2,78.4H48.8c-5.5,0-10-4.5-10-10V48.8c0-5.5,4.5-10,10-10h30.4c5.5,0,10,4.5,10,10v19.6
        C89.2,73.9,84.7,78.4,79.2,78.4z"/>
      <path fill="#3E606F" d="M64,40.6c-5.5,0-10,4.5-10,10v19.6c0,5.5,4.5,10,10,10s10-4.5,10-10V50.6C74,45.1,69.5,40.6,64,40.6z" />
      <path fill="#EBEBEB" d="M77.9,58.2l-10,6.1c-0.5,0.3-1.1,0.4-1.6,0.4c-1.3,0-2.5-0.7-3.2-1.9l-4.4-7.4c-1.1-1.8-0.4-4.3,1.4-5.4
        c1.8-1.1,4.3-0.4,5.4,1.4l3.3,5.5l8.2-5L77.9,58.2z"/>
    </svg>
  );
};

export default Icon;

