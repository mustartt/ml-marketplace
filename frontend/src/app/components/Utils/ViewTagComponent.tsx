import React from 'react';

const ViewTagComponent: React.FC = ({children}) => {
  return (
    <span
      className="bg-indigo-600 mr-0.5 py-1 px-2 leading-none text-gray-100 text-xs rounded-full shadow">
      {children}
    </span>
  );
};

export default ViewTagComponent;