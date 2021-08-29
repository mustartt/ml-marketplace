import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import LayoutActions from '../../../actions/layout/LayoutActions';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const SidebarToggle: React.FC = () => {

  const sidebarState = useSelector((state: RootState) => state.layoutState.sidebar);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    if (sidebarState.open) {
      dispatch(LayoutActions.setSidebarState(false));
    } else {
      dispatch(LayoutActions.setSidebarState(true));
    }
  };

  return (
    <button
      type="button"
      className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 transition duration-150 shadow rounded-lg space-x-1"
      onClick={toggleSidebar}
    >
      {
        !sidebarState.open ?
          <MenuIcon className="w-5 h-5"/> :
          <XIcon className="w-5 h-5"/>
      }
    </button>
  );
};

export default SidebarToggle;