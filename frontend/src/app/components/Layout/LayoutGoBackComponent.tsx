import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/outline';

interface LayoutGoBackComponentProps {
  onBack: () => void;
}

const LayoutGoBackComponent: React.FC<LayoutGoBackComponentProps> = ({onBack, children}) => {
  return (
    <div className="bg-gray-100 p-2 shadow-md flex items-center justify-between">
      <button
        onClick={onBack}
        className="flex-shrink-0 inline-flex items-center p-2 pr-3.5 bg-gray-100 hover:bg-gray-200 transition hover:shadow-md rounded-md text-gray-700">
        <ChevronLeftIcon className="h-5 w-5"/>
        <span className="ml-1 text-lg font-semibold leading-none tracking-wide">
          Back
        </span>
      </button>
      <div>
        {children}
      </div>
    </div>
  );
};

export default LayoutGoBackComponent;