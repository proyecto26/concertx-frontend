import { NavLink } from '@remix-run/react';
import React, { useState } from 'react';

import { FACEBOOK_URL, GITHUB_URL, INSTAGRAM_URL } from '~/constants';
import FacebookIcon from '../icons/Facebook';
import InstagramIcon from '../icons/Instagram';
import GitHubIcon from '../icons/GitHub';

type FooterProps = {
};

const navigation = [
  {
    label: 'ConcertX on Facebook',
    href: FACEBOOK_URL,
    icon: FacebookIcon,
  },
  {
    label: 'ConcertX on Instagram',
    href: INSTAGRAM_URL,
    icon: InstagramIcon,
  },
  {
    label: 'ConcertX on GitHub',
    href: GITHUB_URL,
    icon: GitHubIcon,
  }
];

const Footer: React.FC<FooterProps> = () => {
  const [currentYear] = useState(() => new Date().getFullYear());
  return (
    <footer className="bg-gray-800 py-6">
      <div className="mx-auto container py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="space-x-6 md:order-2 flex items-center justify-between">
          <div className="text-gray-300 text-sm lg:text-base">
            <NavLink to="/privacy" className="hover:text-white navlink">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="hover:text-white ml-4 navlink">
              Terms of Use
            </NavLink>
          </div>
          <div className="ml-4 flex flex-row">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white ml-4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none"
                aria-label={item.label}
              >
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="text-center text-gray-500 font-medium text-sm lg:text-base">
            Copyright &copy; {currentYear} ConcertX, All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;