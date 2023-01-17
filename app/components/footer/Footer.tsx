import { NavLink } from '@remix-run/react';
import React, { useState } from 'react';

import { GITHUB_URL } from '~/constants';
import FacebookIcon from '../icons/Facebook';
import InstagramIcon from '../icons/Instagram';
import GitHubIcon from '../icons/GitHub';

type FooterProps = {
};

const Footer: React.FC<FooterProps> = () => {
  const [currentYear] = useState(() => new Date().getFullYear());
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto px-6 flex items-center justify-between flex-wrap">
        <div className="w-full lg:w-auto lg:mr-6 flex items-center justify-between">
          <div className="text-gray-300 font-medium text-sm lg:text-base">
            Copyright &copy; {currentYear} ConcertsX
          </div>
        </div>
        <div className="w-full lg:w-auto lg:ml-6 flex items-center justify-between">
          <div className="text-gray-300 text-sm lg:text-base">
            <NavLink to="/privacy" className="hover:text-white navlink">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="hover:text-white ml-4 navlink">
              Terms of Use
            </NavLink>
          </div>
          <div className="ml-4 flex flex-row">
            <a
              href="#"
              className="text-gray-300 hover:text-white ml-4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none"
              aria-label="ConcertX on Facebook"
            >
              <FacebookIcon className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white ml-4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none"
              aria-label="ConcertX on Twitter"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a
              href={GITHUB_URL}
              className="text-gray-300 hover:text-white ml-4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none"
              aria-label="ConcertX on GitHub"
            >
              <GitHubIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;