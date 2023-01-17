import React from 'react';

import Logo from '../icons/Logo';

type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({
  title = 'ConcertX'
}) => {
  return (
    <header className="bg-white shadow-md fixed top-0 right-0 left-0 z-10">
      <div className="flex flex-wrap items-center justify-between">
        <a aria-label={title} className="w-8" href="/">
          <Logo />
        </a>
        <div className="relative w-full hidden lg:w-auto flex-shrink-0 lg:flex lg:items-center">
          <div className="w-full lg:w-auto lg:ml-4 flex items-center justify-center lg:justify-end">
            <form className="w-full max-w-xl">
              <div className="flex items-center border-b-2 border-teal-500 py-2">
                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search..." />
                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="block lg:hidden pr-4">
          <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div className="w-full lg:flex lg:items-center basis-0 hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a className="inline-block py-2 px-4 text-gray-800 no-underline" href="#">Artists</a>
            </li>
            <li className="mr-3">
              <a className="inline-block py-2 px-4 text-gray-800 no-underline" href="#">Events</a>
            </li>
          </ul>
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;