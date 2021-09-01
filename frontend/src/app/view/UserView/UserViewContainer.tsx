import React from 'react';

const UserViewContainer: React.FC = ({children}) => {
  return (
    <div className="flex justify-center bg-gray-900 w-screen h-screen overflow-hidden">
      <div className="h-full max-w-screen-lg p-10">
        {children}
      </div>
    </div>
  );
}

export default UserViewContainer;