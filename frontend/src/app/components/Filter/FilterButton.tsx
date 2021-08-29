import React from 'react';
import { MenuAlt2Icon } from '@heroicons/react/outline';

const FilterButton: React.FC = () => {
  return (
    <button type="button"
            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 transition duration-150 shadow rounded-lg space-x-1"
            onClick={() => {
              console.log('open filter options');
            }}
    >
      <MenuAlt2Icon className="h-5 w-5"/>
      <span className="leading-none font-semibold">Filters</span>
    </button>
  );
};

export default FilterButton;