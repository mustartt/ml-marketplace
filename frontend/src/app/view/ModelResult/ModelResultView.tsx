import React from 'react';
import Pagination from '../../components/Pagination/Pagination';
import ModelPageView from './ModelPageView';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import SearchBox from '../../components/SearchBox/SearchBox';
import FilterButton from '../../components/Filter/FilterButton';

const ModelResultView = () => {

  const modelState = useSelector((state: RootState) => state.modelState);

  return (
    <div className="bg-gray-100 h-full">
      <header className="flex items-center justify-between space-x-2 bg-white p-3 shadow-md">
        <SearchBox search={search => {
          console.log(search);
        }}/>
        <FilterButton/>
      </header>

      <section className="flex justify-between items-center p-2">
        <h2 className="font-semibold text-lg text-gray-900">Showing Results: x/y</h2>
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