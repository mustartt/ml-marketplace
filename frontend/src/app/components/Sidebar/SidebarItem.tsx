import React from 'react';
import { matchPath, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

interface SidebarItemProps {
  redirect?: string;
}

const SidebarItem: React.FC<SidebarItemProps & RouteComponentProps> = (props) => {

  const {location, history, redirect, children} = props;

  const isActive = matchPath(location.pathname, {
    path: redirect,
    exact: true,
    strict: false,
  });

  const redirectTo = () => {
    history.push(redirect || '/');
  };

  return (
    <div
      onClick={redirectTo}
      className={`${isActive &&
      'bg-gray-200 text-indigo-700 hover:text-indigo-700'} 
      flex items-center space-x-2 text-gray-700 
      ${!isActive && 'hover:text-gray-800'} 
      font-semibold text-lg rounded-lg hover:bg-gray-200 p-2 cursor-pointer`}>
      {children}
    </div>
  );
};

export default withRouter(SidebarItem);