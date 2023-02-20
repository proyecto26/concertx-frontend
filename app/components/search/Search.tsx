import React, { useId } from 'react';

import SearchIcon from '../icons/Search';
import MicIcon from '../icons/Mic';
import clsx from 'clsx';

type SearchProps = {
  className?: string;
};

const Search: React.FC<SearchProps> = ({ className }) => {
  const voiceSearchId = useId();
  return (
    <form className={clsx('flex items-center', className)}>
      <label htmlFor={voiceSearchId} className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id={voiceSearchId}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Artists, Events, Concerts..."
          required
        />
          <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
            <MicIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
          </button>
      </div>
    </form>
  );
};

export default Search;