import React, { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid';

interface SelectedFilterOptionProps {
  value: string;
  onRemove: (value: string) => void;
}

const SelectedFilterOption: React.FC<SelectedFilterOptionProps> = ({value, onRemove}) => {
  return (
    <li
      className="inline-flex flex-row items-center pl-3 pr-2 py-1 rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-md space-x-1">
      <span>{value}</span>
      <span
        className="hover:bg-gray-200 hover:text-gray-900 rounded-full transition duration-150 cursor-pointer"
        onClick={() => onRemove(value)}>
        <XIcon className="h-4 w-4"/>
      </span>
    </li>
  );
};

interface OptionProps {
  value: string;
  onClick: (filter: string) => void;
}

const Option: React.FC<OptionProps> = ({value, onClick}) => {
  return (
    <li
      onClick={() => onClick(value)}
      className="cursor-pointer select-none relative py-2 pl-10 pr-4">
      <span className="font-normal block truncate">
       {value}
      </span>
    </li>
  );
};

const ActiveOption: React.FC<OptionProps> = ({value, onClick}) => {
  return (
    <li
      onClick={() => onClick(value)}
      className="bg-indigo-100 cursor-pointer select-none relative py-2 pl-10 pr-4">
      <span className="font-semibold block truncate">
       {value}
      </span>
      <span
        className="text-indigo-600 text-indigo-600 absolute inset-y-0 left-0 flex items-center pl-3">
        <CheckIcon className="w-5 h-5" aria-hidden="true"/>
      </span>
    </li>
  );
};

interface MultiSelectFilterProps {
  filters: string[];
  active: string[];
  onChange: (selectedFilters: string[]) => void;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({filters, active, onChange}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const escEventListener = (event: KeyboardEvent) => {
      if (event.key === 'esc' || event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', escEventListener);
    return () => {
      document.removeEventListener('keydown', escEventListener);
    };
  }, []);

  const addFilterOption = (filter: string) => {
    if (active.indexOf(filter) !== -1) return;
    const newActive = [...active, filter];
    setOpen(false);
    onChange(newActive);
  };

  const removeFilterOption = (filter: string) => {
    const index = active.indexOf(filter);
    const newActive = [...active];
    if (index > -1) {
      newActive.splice(index, 1);
    }
    setOpen(false);
    onChange(newActive);
  };

  return (
    <div className="inline-block w-72 text-black">
      <ul className={`${active.length > 0 ?
        'p-1' :
        'p-0'} bg-gray-200 rounded-lg shadow-md leading-none space-x-1 space-y-1`}>
        {
          active.map((filter, index) =>
            <SelectedFilterOption
              key={index}
              value={filter}
              onRemove={removeFilterOption}/>,
          )
        }
      </ul>
      <div className="relative mt-1">
        <button
          className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-indigo-600 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          onClick={() => setOpen(!open)}
        >
          <span className="block truncate">{active.length > 0 ? active[0] : 'Selected filters'}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"/>
            </span>
        </button>
        <Transition
          show={open}
          as={Fragment}
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <div
              className="fixed inset-0 z-50 w-screen h-screen bg-red-500 opacity-0"
              onClick={() => setOpen(false)}/>
            <ul
              className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {
                filters.map((filter, filterIndex) => (
                  active.indexOf(filter) == -1 ?
                    <Option key={filterIndex} value={filter} onClick={addFilterOption}/> :
                    <ActiveOption key={filterIndex} value={filter} onClick={removeFilterOption}/>
                ))
              }
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default MultiSelectFilter;