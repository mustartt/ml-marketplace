import React from 'react';
import exp from 'constants';

interface StyledButtonProps {
  primary?: true;
  onClick: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({onClick, children}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold tracking-wide shadow-md hover:shadow-xl text-gray-100 rounded-lg">
      {children}
    </button>
  );
};

export default StyledButton;