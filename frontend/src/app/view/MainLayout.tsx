import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ModelResultView from './ModelResult/ModelResultView';

const USER = {
  name: 'John Smith',
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  info: 'user info',
};

const MainLayout: React.FC = () => {
  return (
    <div className="relative block md:flex bg-gray-900 w-screen h-screen overflow-hidden">
      <Sidebar brand="ml-marketplace"
               user={USER}
               logo="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg">
      </Sidebar>

      <div className="w-full h-full bg-gray-700 text-white overflow-y-auto">

        {/* result view */}
        <ModelResultView/>

      </div>
    </div>

  );
};

export default MainLayout;