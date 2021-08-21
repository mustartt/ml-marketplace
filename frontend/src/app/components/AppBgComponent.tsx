import React from 'react';

interface AppBgProps {
  children: JSX.Element;
}

const AppBgComponent: React.FC<AppBgProps> = ({children}) => {
  return (
    <div className="w-screen h-screen bg-gray-900">
      {children}
    </div>
  );
};

export default AppBgComponent;

