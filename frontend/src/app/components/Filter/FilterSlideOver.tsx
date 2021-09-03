import React, { Fragment } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import LayoutActions from '../../../actions/layout/LayoutActions';
import { RootState } from '../../../store/reducers/rootReducer';
import { Transition } from '@headlessui/react';

interface FilterSlideOverProps {
  title: string,
  subheading?: string,
  submitFilter: () => void,
}

const FilterSlideOver: React.FC<FilterSlideOverProps> = ({title, subheading, submitFilter, children}) => {

  const state = useSelector((state: RootState) => state.layoutState.filter);
  const dispatch = useDispatch();

  const closeFilter = () => {
    dispatch(LayoutActions.closeFilter());
  };

  return (
    <Transition
      as={Fragment}
      show={state.open}
      enter="transform transition duration-500"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition duration-500"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <aside className="fixed z-40 right-0 h-screen flex flex-col justify-between w-80 bg-white shadow-xl">
        <header className="bg-indigo-600 text-gray-100 px-5 py-3 md:py-5 space-y-2 shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-lg">{title}</h1>
            <button type="button"
                    onClick={closeFilter}
                    className="bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl p-2 rounded-lg transition duration-150">
              <XIcon className="h-5 w-5"/>
            </button>
          </div>
          {
            subheading &&
            <p className="leading-tight text-gray-200 hidden md:block">
              {subheading}
            </p>
          }
        </header>

        <section className="p-2 overflow-y-auto h-full">
          {children}
        </section>

        <footer className="flex justify-end bg-gray-200 shadow-inner p-2 space-x-3">
          <button
            onClick={closeFilter}
            className="px-3 py-2 border-2 border-indigo-600 bg-gray-200 hover:bg-gray-100 shadow-md  hover:shadow-xl font-semibold tracking-wide rounded-md">
            Cancel
          </button>
          <button
            onClick={submitFilter}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold tracking-wide shadow-md hover:shadow-xl text-gray-100 rounded-lg">
            Update
          </button>
        </footer>
      </aside>
    </Transition>
  );
};

export default FilterSlideOver;