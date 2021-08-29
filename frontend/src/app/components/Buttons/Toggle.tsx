import React from 'react';
import { Switch } from '@headlessui/react';

interface ToggleProps {
  enabled: boolean;
  onChange: (newVal: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({enabled, onChange}) => {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={`${enabled ? 'bg-gray-400' : 'bg-gray-300'}
          relative inline-flex flex-shrink-0 h-[28px] w-[64px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Toggle</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] bg-white rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
};

export default Toggle;