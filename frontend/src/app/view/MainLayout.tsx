import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ModelResultView from './ModelResult/ModelResultView';

const MainLayout: React.FC = () => {
  return (
    <div className="relative block md:flex bg-gray-900 w-screen h-screen overflow-hidden">
      <Sidebar brand="ml-marketplace"
               logo="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg">
      </Sidebar>

      <div className="w-full h-full bg-gray-700 overflow-y-auto">

        {/* result view */}
        <ModelResultView/>

      </div>
    </div>

  );
};

export default MainLayout;