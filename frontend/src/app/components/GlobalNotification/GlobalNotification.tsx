import React, { Fragment } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import LayoutActions from '../../../actions/layout/LayoutActions';
import { Transition } from '@headlessui/react';

type ColorDictionary = {
  [index: string]: {
    prefix: string,
    bg: string,
    text: string
  }
};

export const NOTIFICATION_TYPE = {
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info',
};

const color: ColorDictionary = {
  ['warning']: {
    prefix: 'warning',
    bg: 'bg-red-200',
    text: 'text-red-500',
  },
  ['success']: {
    prefix: 'success',
    bg: 'bg-green-200',
    text: 'text-green-500',
  },
  ['info']: {
    prefix: 'info',
    bg: 'bg-yellow-200',
    text: 'text-yellow-500',
  },
};

const GlobalNotification: React.FC = () => {

  const state = useSelector((state: RootState) => state.layoutState.notification);
  const dispatch = useDispatch();

  const palette = state.type in color ? color[state.type] : color['info'];

  const closeNotification = () => {
    dispatch(LayoutActions.closeNotification());
  };

  return (
    <Transition
      show={state.open}
      as={Fragment}
      enter="transition duration-1000"
      enterFrom="opacity-0 -translate-y-full"
      enterTo="opacity-100 translate-y-0"
      leave="transition duration-1000"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-full"
    >
      <div className="fixed z-50 flex justify-center w-full p-5">
        <div
          className={`${palette.bg} flex max-w-5xl items-center rounded-lg backdrop-blur bg-opacity-60 space-x-2 px-5 py-4`}>
        <span className={`${palette.text} font-light leading-snug`}>
          <span className="font-semibold pr-2 leading-none tracking-wide uppercase">
            {state.type}
          </span>
          {state.message}
        </span>
          <button
            onClick={closeNotification}
            className={`${palette.bg} p-2 rounded-md hover:shadow-xl bg-opacity-0 hover:bg-opacity-20 transition duration-200`}>
            <XIcon className={`${palette.text} h-6 w-6`}/>
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default GlobalNotification;