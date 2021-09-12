import React from 'react';

const LogoComponent: React.FC = () => {
  return (
    <div className="flex flex-row space-x-2">
      <img className="w-auto h-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
           alt="Header Image"/>
      <h1 className="block sm:hidden md:block leading-tight font-bold text-2xl">ml-marketplace</h1>
    </div>
  );
};

export default LogoComponent;