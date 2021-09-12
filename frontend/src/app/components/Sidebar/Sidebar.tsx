import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import SidebarUserTab from './SidebarUserTab';
import { XIcon } from '@heroicons/react/outline';
import LayoutActions from '../../../actions/layout/LayoutActions';
import { Transition } from '@headlessui/react';
import useWindowDimensions from '../../../services/WindowDimensionUtils';
import { User } from '../../../store/reducers/UserReducer/userReducer';

interface SidebarProps {
  brand: string;
  logo: string;
}

const getDisplayName = (user: User) => {
  return `${user.userProfile.firstname} ${user.userProfile.lastname}`;
};

const Sidebar: React.FC<SidebarProps> = ({brand, logo, children}) => {

  const sidebarState = useSelector((state: RootState) => state.layoutState.sidebar);
  const userState = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch();

  const {width} = useWindowDimensions();
  const isDesktopBreakPoint = () => width > 768;

  useEffect(() => {
    if (width > 768 && sidebarState.open === false) {
      dispatch(LayoutActions.setSidebarState(true));
    }
  });

  const closeSidebar = () => {
    dispatch(LayoutActions.setSidebarState(false));
  };

  return (
    <>
      <Transition
        show={sidebarState.open}
        as={Fragment}
        leave="transform transition duration-500"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <section
          className="w-80 flex-shrink-0 absolute z-40 md:relative top-0 h-full bg-white shadow-xl">
          <div className="flex flex-col h-full justify-between p-5">
            <div>
              <header className="flex flex-row p-3 justify-between items-center border-0 border-b-2">
                <div className="flex flex-row space-x-2">
                  <img className="w-auto h-8" src={logo}
                       alt="Header Image"/>
                  <h1 className="leading-tight font-bold text-2xl">{brand}</h1>
                </div>
                {
                  !isDesktopBreakPoint() &&
                  <button
                    onClick={closeSidebar}
                    className="p-1 hover:bg-gray-200 rounded-full hover:shadow-lg transition duration-200">
                    <XIcon className="h-6 w-6"/>
                  </button>
                }
              </header>

              <nav className="mt-5 h-full">
                <ul className="flex flex-col space-y-1">
                  {children}
                </ul>
              </nav>

            </div>
            {
              userState.user &&
              <SidebarUserTab
                name={getDisplayName(userState.user)}
                info={userState.user.username}
                image={userState.user.userProfile.profileImage}
                profileLink="/profile"
              />
            }
          </div>
        </section>
      </Transition>
    </>
  );
};

export default Sidebar;