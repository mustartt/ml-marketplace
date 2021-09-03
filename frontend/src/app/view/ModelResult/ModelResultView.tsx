import React, { useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import ModelPageView from './ModelPageView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import SearchBox from '../../components/SearchBox/SearchBox';
import FilterButton from '../../components/Filter/FilterButton';
import SidebarToggle from '../../components/Sidebar/SidebarToggle';
import useWindowDimensions from '../../../services/WindowDimensionUtils';
import ModelActions from '../../../actions/model/ModelActions';

const ModelResultView = () => {

  const {width} = useWindowDimensions();
  const isDesktopBreakPoint = () => width > 768;

  const modelState = useSelector((state: RootState) => state.modelState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ModelActions.load(''));
  }, []);

  const onSearch = (search: string) => {
    dispatch(ModelActions.load(search));
  };

  return (
    <div className="bg-gray-100 h-full">
      <header className="flex items-center justify-between space-x-2 bg-white p-3 shadow-md">
        {
          !isDesktopBreakPoint() &&
          <SidebarToggle/>
        }

        <SearchBox search={onSearch}/>

        <FilterButton/>

      </header>

      <section className="flex justify-between items-center p-2">
        <h2 className="font-semibold text-lg text-gray-900"
            onClick={() => {
              console.log('a');
            }}
        >
          Showing Results: x/y
        </h2>
        <Pagination curr={modelState.curr}
                    totalPage={modelState.totalPage}
                    onChange={(newPage) => console.log(newPage)}
        />
      </section>

      {/* model page view */}
      <ModelPageView/>

    </div>
  );
};

export default ModelResultView;