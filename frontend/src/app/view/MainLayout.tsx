import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import ModelActions from '../../actions/model/ModelActions';
import ModelResultView from './ModelResult/ModelResultView';
import FilterSlideOver from '../components/Filter/FilterSlideOver';

const USER = {
  name: 'John Smith',
  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  info: 'user info',
};

const MainLayout: React.FC = () => {

  const modelState = useSelector((state: RootState) => state.modelState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ModelActions.load(modelState.curr, modelState.pageSize));
  }, []);

  return (
    <>
      <FilterSlideOver title={'Test Title'} subheading={'Some subheading'}>
        <p>
          test children
        </p>
      </FilterSlideOver>
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
    </>
  );
};

export default MainLayout;