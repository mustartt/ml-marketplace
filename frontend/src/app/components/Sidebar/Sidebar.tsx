import React from 'react';
import { UserInfo } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import SidebarUserTab from './SidebarUserTab';
import { XIcon } from '@heroicons/react/outline';
import LayoutActions from '../../../actions/layout/LayoutActions';

interface SidebarProps {
  brand: string;
  logo: string;
  user: UserInfo;
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = (props) => {

  const sidebarState = useSelector((state: RootState) => state.layoutState.sidebar);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(LayoutActions.setSidebarState(false));
  };

  return (
    <section
      className={'w-80 flex-shrink-0 absolute z-40 md:relative top-0 h-full bg-gray-100 ' +
      (sidebarState.open ? '' : '-ml-80')}>
      <div className="flex flex-col h-full justify-between p-5">
        <div>
          <header className="flex flex-row p-3 justify-between items-center border-0 border-b-2">
            <div className="flex flex-row space-x-2">
              <img className="w-auto h-8" src={props.logo}
                   alt="Header Image"/>
              <h1 className="leading-tight font-bold text-2xl">{props.brand}</h1>
            </div>
            <button
              onClick={closeSidebar}
              className="p-1 hover:bg-gray-200 rounded-full hover:shadow-lg transition duration-200">
              <XIcon className="h-6 w-6"/>
            </button>
          </header>

          <nav className="mt-5 h-full">
            <ul className="flex flex-col space-y-1">
              {props.children}
            </ul>
          </nav>

        </div>
        <SidebarUserTab name={props.user.name}
                        image={props.user.img || ''}
                        info={props.user.info}/>
      </div>
    </section>
  );
};

export default Sidebar;