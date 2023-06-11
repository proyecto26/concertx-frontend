import { MagnifyingGlassIcon, MicrophoneIcon } from '@heroicons/react/20/solid';
import React, { useId } from 'react';
import clsx from 'clsx';

type SearchProps = {
  className?: string;
  autoFocus?: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

const Search: React.FC<SearchProps> = ({ className, autoFocus, onFocus, onBlur }) => {
  const searchId = useId();
  return (
    <form className={clsx('flex items-center', className)}>
      <label htmlFor={searchId} className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-dark-gray dark:text-dark" />
        </div>
        <input
          type="text"
          id={searchId}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full px-10 py-2.5 dark:border-gray-700 dark:bg-slate-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300"
          placeholder="Search artists, music broadcasts, live streaming concerts, etc"
          required
          autoFocus={autoFocus}
          onFocus={onFocus}
          onBlur={onBlur}
        />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 focus:ring-offset-2"
            aria-label="Click to speak your search terms"
          >
            <MicrophoneIcon className="w-4 h-4 text-gray-500 dark:text-dark hover:text-gray-900 dark:hover:text-white" />
          </button>
      </div>
    </form>
  );
};

export default Search;