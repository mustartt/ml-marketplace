import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ModelResultView from './ModelResult/ModelResultView';
import SidebarContainer from '../components/Sidebar/SidebarContainer';
import SidebarItem from '../components/Sidebar/SidebarItem';
import { CubeIcon, DatabaseIcon } from '@heroicons/react/outline';

const MainLayout: React.FC = () => {
  return (
    <div className="relative block md:flex bg-gray-900 w-screen h-screen overflow-hidden">
      <Sidebar brand="ml-marketplace"
               logo="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg">
        <SidebarContainer>
          <SidebarItem redirect="/models">
            <CubeIcon className="h-6 w-6"/>
            <span>Models</span>
          </SidebarItem>
          <SidebarItem redirect="/datasets">
            <DatabaseIcon className="h-6 w-6"/>
            <span>Datasets</span>
          </SidebarItem>
        </SidebarContainer>
      </Sidebar>

      <div className="w-full h-full bg-gray-700 overflow-y-auto">

        {/* result view */}
        <ModelResultView/>

      </div>
    </div>

  );
};

export default MainLayout;