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
    <div className="inline-block p-2"
         onClick={toggleSidebar}>
      {
        !sidebarState.open ?
          <MenuIcon className="w-6 h-6"/> :
          <XIcon className="w-6 h-6"/>
      }
    </div>
  );
};

export default SidebarToggle;