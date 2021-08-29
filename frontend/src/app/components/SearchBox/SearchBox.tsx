import React, { useRef, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

interface SearchBoxProps {
  search: (search: string) => void;
  isImmediate?: boolean;
  delay?: number;
}

const SearchBox: React.FC<SearchBoxProps> = (props) => {

  const {search, isImmediate, delay} = props;
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const callSearch = () => {
    search(searchRef.current?.value || '');
  };

  const searchHandler = (event: any) => {
    if (event.key === 'Enter') {
      callSearch();
    } else if (isImmediate) {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      setSearchTimeout(setTimeout(callSearch, delay || 250));
    }
  };

  return (
    <div className="flex-grow relative text-gray-800 focus-within:text-gray-900">
      <span className="absolute z-10 inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <SearchIcon className="w-6 h-6"/>
        </button>
      </span>
      <input type="search"
             className="w-full py-2 text-sm text-white bg-gray-100 rounded-lg pl-10 pr-3 focus:outline-none focus:bg-gray-200 focus:text-gray-900 shadow focus:shadow-xl transition duration-150"
             placeholder="Search..."
             ref={searchRef}
             onKeyUp={searchHandler}/>
    </div>
  );
};

export default SearchBox;
