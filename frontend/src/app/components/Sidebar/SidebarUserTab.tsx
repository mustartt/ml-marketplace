import React, { useState } from 'react';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { Redirect } from 'react-router';

interface SidebarUserTabProps {
  name: string;
  info?: string;
  image: string;
  profileLink?: string;
}

const SidebarUserTab: React.FC<SidebarUserTabProps> = ({name, info, image, profileLink}) => {

  const [redirect, setRedirect] = useState(false);

  return (
    <>
      {
        redirect && <Redirect to={profileLink || '/profile'}/>
      }
      <div className="flex flex-row justify-between items-center w-full p-2 border-0 border-t-2">
        <div className="flex flex-row">
          <img className="h-10 w-10 border-2 border-indigo-600 rounded-full shadow-xl"
               src={image}
               alt="User Icon"/>
          <div className="flex flex-col px-3">
            <span className="text-base font-semibold text-gray-700">{name}</span>
            {info && <span className="text-xs font-light leading-none text-gray-500">{info}</span>}
          </div>
        </div>
        <div
          id="sidebar-user-profile"
          className="cursor-pointer p-1 hover:bg-gray-200 hover:shadow-md rounded-md text-gray-700"
          onClick={() => setRedirect(true)}>
          <AdjustmentsIcon className="w-6 h-6"/>
        </div>
      </div>
    </>
  );
};

export default SidebarUserTab;