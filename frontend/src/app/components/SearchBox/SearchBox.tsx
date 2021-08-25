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
    }
    if (isImmediate) {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      setSearchTimeout(setTimeout(callSearch, delay || 250));
    }
  };

  return (
    <div
      className="flex-shrink-0 flex flex-row w-full px-3 py-2 space-x-1 items-center bg-white rounded-t-2xl shadow-xl">
      <button type="button" className="bg-white hover:bg-gray-200 p-2 rounded-full">
        <SearchIcon className="h-6 w-6"/>
      </button>
      <input type="text"
             ref={searchRef}
             onKeyUp={searchHandler}
             className="outline-none w-full"
             placeholder="Search..."/>
    </div>
  );
};

export default SearchBox;
