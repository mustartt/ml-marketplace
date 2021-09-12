import React from 'react';

const SidebarContainer: React.FC = ({children}) => {
  return (
    <div className="flex flex-col space-y-3">
      {children}
    </div>
  );
};

export default SidebarContainer;